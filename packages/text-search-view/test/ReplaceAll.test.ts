import type { AsyncCommandContext } from '@lvce-editor/viewlet-registry'
import { expect, test } from '@jest/globals'
import { DialogWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { replaceAll, replaceAllWithProgress } from '../src/parts/ReplaceAll/ReplaceAll.ts'
import * as SearchViewStates from '../src/parts/SearchViewStates/SearchViewStates.ts'
import * as TextMeasurementWorker from '../src/parts/TextMeasurementWorker/TextMeasurementWorker.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('replaceAll - replaces all matches and updates state', async () => {
  using _mockTextMeasurementRpc = TextMeasurementWorker.registerMockRpc({
    'TextMeasurement.measureTextBlockHeight': () => 13,
  })
  using mockRpc = RendererWorker.registerMockRpc({
    'BulkReplacement.applyBulkReplacement'() {},
    'Layout.handleWorkspaceRefresh'() {},
  })
  using mockDialogRpc = DialogWorker.registerMockRpc({
    'ConfirmPrompt.prompt': () => true,
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    items: [
      { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
      { end: 0, lineNumber: 1, start: 0, text: 'match1', type: TextSearchResultType.Match },
      { end: 0, lineNumber: 2, start: 0, text: 'file2.txt', type: TextSearchResultType.File },
      { end: 0, lineNumber: 3, start: 0, text: 'match2', type: TextSearchResultType.Match },
    ],
    matchCount: 2,
    replacement: 'new-text',
    workspacePath: '/test',
  }

  const result = await replaceAll(state)

  expect(result).toEqual({
    ...state,
    items: [],
    listItems: [],
    maxLineY: 0,
    message: "Replaced 2 occurrences across 2 files with 'new-text'",
    minLineY: 0,
  })
  expect(mockDialogRpc.invocations).toEqual([
    [
      'ConfirmPrompt.prompt',
      "Replace 2 occurrences across 2 files with 'new-text'",
      {
        confirmMessage: 'Replace',
        title: 'Replace All',
      },
    ],
  ])
  expect(mockRpc.invocations).toEqual([
    [
      'BulkReplacement.applyBulkReplacement',
      [
        {
          changes: [
            {
              endColumnIndex: 0,
              endRowIndex: 1,
              startColumnIndex: 0,
              startRowIndex: 0,
              text: 'new-text',
            },
          ],
          uri: '/test/file1.txt',
        },
        {
          changes: [
            {
              endColumnIndex: 0,
              endRowIndex: 3,
              startColumnIndex: 0,
              startRowIndex: 2,
              text: 'new-text',
            },
          ],
          uri: '/test/file2.txt',
        },
      ],
    ],
    ['Layout.handleWorkspaceRefresh'],
  ])
})

test('replaceAll - user cancels replacement', async () => {
  using mockRpc = DialogWorker.registerMockRpc({
    'ConfirmPrompt.prompt'() {
      return false
    },
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    fileCount: 2,
    items: [
      { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
      { end: 0, lineNumber: 1, start: 0, text: 'match1', type: TextSearchResultType.Match },
      { end: 0, lineNumber: 2, start: 0, text: 'file2.txt', type: TextSearchResultType.File },
      { end: 0, lineNumber: 3, start: 0, text: 'match2', type: TextSearchResultType.Match },
    ],
    matchCount: 2,
    replacement: 'new-text',
    workspacePath: '/test',
  }

  const result = await replaceAll(state)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([
    [
      'ConfirmPrompt.prompt',
      "Replace 2 occurrences across 2 files with 'new-text'",
      {
        confirmMessage: 'Replace',
        title: 'Replace All',
      },
    ],
  ])
})

test('replaceAllWithProgress - invalidates the active search before applying replacements', async () => {
  using _mockTextMeasurementRpc = TextMeasurementWorker.registerMockRpc({
    'TextMeasurement.measureTextBlockHeight': () => 13,
  })
  const { promise: replacementStarted, resolve: notifyReplacementStarted } = Promise.withResolvers<void>()
  const { promise: continueReplacement, resolve: finishReplacement } = Promise.withResolvers<void>()
  using mockRpc = RendererWorker.registerMockRpc({
    async 'BulkReplacement.applyBulkReplacement'() {
      notifyReplacementStarted()
      await continueReplacement
    },
    'Layout.handleWorkspaceRefresh'() {},
    'Search.rerender'() {},
  })
  using mockDialogRpc = DialogWorker.registerMockRpc({
    'ConfirmPrompt.prompt': () => true,
  })

  let currentState: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    fileCount: 2,
    items: [
      { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
      { end: 0, lineNumber: 1, start: 0, text: 'match1', type: TextSearchResultType.Match },
      { end: 0, lineNumber: 2, start: 0, text: 'file2.txt', type: TextSearchResultType.File },
      { end: 0, lineNumber: 3, start: 0, text: 'match2', type: TextSearchResultType.Match },
    ],
    matchCount: 2,
    replacement: 'new-text',
    searchId: 'active-search',
    uid: 500,
    workspacePath: '/test',
  }
  SearchViewStates.set(currentState.uid, currentState, currentState)
  const context: AsyncCommandContext<SearchState> = {
    getState() {
      return currentState
    },
    async updateState(updater) {
      currentState = updater(currentState)
      return currentState
    },
  }

  const pendingReplacement = replaceAllWithProgress(context)
  await replacementStarted

  expect(currentState.message).toBe('Replacing 2 occurrences across 2 files…')
  expect(currentState.searchId).not.toBe('active-search')
  expect(currentState.searchId).not.toBe('')
  expect(mockDialogRpc.invocations).toEqual([
    [
      'ConfirmPrompt.prompt',
      "Replace 2 occurrences across 2 files with 'new-text'",
      {
        confirmMessage: 'Replace',
        title: 'Replace All',
      },
    ],
  ])
  expect(mockRpc.invocations[0]).toEqual([
    'BulkReplacement.applyBulkReplacement',
    [
      {
        changes: [
          {
            endColumnIndex: 0,
            endRowIndex: 1,
            startColumnIndex: 0,
            startRowIndex: 0,
            text: 'new-text',
          },
        ],
        uri: '/test/file1.txt',
      },
      {
        changes: [
          {
            endColumnIndex: 0,
            endRowIndex: 3,
            startColumnIndex: 0,
            startRowIndex: 2,
            text: 'new-text',
          },
        ],
        uri: '/test/file2.txt',
      },
    ],
  ])

  finishReplacement()
  await pendingReplacement

  expect(currentState.message).toBe('Replacing 2 occurrences across 2 files…')
  expect(SearchViewStates.get(currentState.uid).newState.message).toBe("Replaced 2 occurrences across 2 files with 'new-text'")
  expect(mockRpc.invocations.at(-1)).toEqual(['Search.rerender'])
})

test('replaceAllWithProgress - reports progress for the focused file', async () => {
  using _mockTextMeasurementRpc = TextMeasurementWorker.registerMockRpc({
    'TextMeasurement.measureTextBlockHeight': () => 13,
  })
  let currentState: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    fileCount: 2,
    focusedIndex: 0,
    items: [
      { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
      { end: 2, lineNumber: 1, start: 0, text: 'match1', type: TextSearchResultType.Match },
      { end: 0, lineNumber: 0, start: 0, text: 'file2.txt', type: TextSearchResultType.File },
      { end: 2, lineNumber: 1, start: 0, text: 'match2', type: TextSearchResultType.Match },
    ],
    listItems: [
      { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
      { end: 2, lineNumber: 1, start: 0, text: 'match1', type: TextSearchResultType.Match },
      { end: 0, lineNumber: 0, start: 0, text: 'file2.txt', type: TextSearchResultType.File },
      { end: 2, lineNumber: 1, start: 0, text: 'match2', type: TextSearchResultType.Match },
    ],
    matchCount: 2,
    replacement: 'new-text',
    searchId: 'active-search',
    workspacePath: '/test',
  }
  using mockRpc = RendererWorker.registerMockRpc({
    'BulkReplacement.applyBulkReplacement'() {},
    'Layout.handleWorkspaceRefresh'() {},
    'Search.rerender'() {},
  })
  using mockDialogRpc = DialogWorker.registerMockRpc({
    'ConfirmPrompt.prompt': () => true,
  })
  const context: AsyncCommandContext<SearchState> = {
    getState() {
      return currentState
    },
    async updateState(updater) {
      currentState = updater(currentState)
      return currentState
    },
  }

  await replaceAllWithProgress(context)

  expect(SearchViewStates.get(currentState.uid).newState.message).toBe("Replaced 1 occurrence across 1 file with 'new-text'")
  expect(mockRpc.invocations.length).toBeGreaterThan(0)
  expect(mockDialogRpc.invocations[0]).toEqual([
    'ConfirmPrompt.prompt',
    "Replace 1 occurrence across 1 file with 'new-text'",
    {
      confirmMessage: 'Replace',
      title: 'Replace All',
    },
  ])
})

test('replaceAllWithProgress - renders completion directly when there are no matches', async () => {
  using _mockTextMeasurementRpc = TextMeasurementWorker.registerMockRpc({
    'TextMeasurement.measureTextBlockHeight': () => 13,
  })
  using mockRpc = RendererWorker.registerMockRpc({
    'BulkReplacement.applyBulkReplacement'() {},
    'Layout.handleWorkspaceRefresh'() {},
    'Search.rerender'() {},
  })
  let currentState: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    message: 'No results found',
    replacement: 'new-text',
    searchId: 'active-search',
    uid: 600,
  }
  SearchViewStates.set(currentState.uid, currentState, currentState)
  const context: AsyncCommandContext<SearchState> = {
    getState() {
      return currentState
    },
    async updateState(updater) {
      currentState = updater(currentState)
      return currentState
    },
  }

  await replaceAllWithProgress(context)

  expect(SearchViewStates.get(currentState.uid).newState.message).toBe("Replaced 0 occurrences across 0 files with 'new-text'")
  expect(SearchViewStates.get(currentState.uid).newState.searchId).toBe('')
  expect(mockRpc.invocations).toEqual([['BulkReplacement.applyBulkReplacement', []], ['Layout.handleWorkspaceRefresh'], ['Search.rerender']])
})

test('replaceAllWithProgress - stops when the active search changes while confirming', async () => {
  using _mockTextMeasurementRpc = TextMeasurementWorker.registerMockRpc({
    'TextMeasurement.measureTextBlockHeight': () => 13,
  })
  using mockDialogRpc = DialogWorker.registerMockRpc({
    'ConfirmPrompt.prompt': () => true,
  })
  let currentState: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    fileCount: 1,
    items: [
      { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
      { end: 1, lineNumber: 1, start: 0, text: 'match1', type: TextSearchResultType.Match },
    ],
    matchCount: 1,
    replacement: 'new-text',
    searchId: 'active-search',
    uid: 601,
    workspacePath: '/test',
  }
  const newerState = { ...currentState, searchId: 'new-search' }
  SearchViewStates.set(currentState.uid, currentState, newerState)
  const context: AsyncCommandContext<SearchState> = {
    getState() {
      return currentState
    },
    async updateState(updater) {
      currentState = updater(currentState)
      return currentState
    },
  }

  await replaceAllWithProgress(context)

  expect(SearchViewStates.get(currentState.uid).newState).toBe(newerState)
  expect(mockDialogRpc.invocations).toHaveLength(1)
})

test('replaceAllWithProgress - user cancels before progress is rendered', async () => {
  using mockRpc = DialogWorker.registerMockRpc({
    'ConfirmPrompt.prompt'() {
      return false
    },
  })

  let currentState: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    fileCount: 1,
    items: [
      { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
      { end: 0, lineNumber: 1, start: 0, text: 'match1', type: TextSearchResultType.Match },
    ],
    matchCount: 1,
    message: '1 result in 1 file',
    replacement: 'new-text',
    workspacePath: '/test',
  }
  const context: AsyncCommandContext<SearchState> = {
    getState() {
      return currentState
    },
    async updateState(updater) {
      currentState = updater(currentState)
      return currentState
    },
  }

  await replaceAllWithProgress(context)

  expect(currentState.message).toBe('1 result in 1 file')
  expect(mockRpc.invocations).toEqual([
    [
      'ConfirmPrompt.prompt',
      "Replace 1 occurrence across 1 file with 'new-text'",
      {
        confirmMessage: 'Replace',
        title: 'Replace All',
      },
    ],
  ])
})

test('replaceAll - replaces all matches in focused file only and updates state', async () => {
  using _mockTextMeasurementRpc = TextMeasurementWorker.registerMockRpc({
    'TextMeasurement.measureTextBlockHeight': () => 13,
  })
  using mockRpc = RendererWorker.registerMockRpc({
    'BulkReplacement.applyBulkReplacement'() {},
    'Layout.handleWorkspaceRefresh'() {},
  })
  using mockDialogRpc = DialogWorker.registerMockRpc({
    'ConfirmPrompt.prompt': () => true,
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    fileCount: 2,
    focusedIndex: 0,
    items: [
      { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
      { end: 2, lineNumber: 1, start: 0, text: 'match1', type: TextSearchResultType.Match },
      { end: 0, lineNumber: 0, start: 0, text: 'file2.txt', type: TextSearchResultType.File },
      { end: 2, lineNumber: 1, start: 0, text: 'match2', type: TextSearchResultType.Match },
    ],
    listItems: [
      { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
      { end: 2, lineNumber: 1, start: 0, text: 'match1', type: TextSearchResultType.Match },
      { end: 0, lineNumber: 0, start: 0, text: 'file2.txt', type: TextSearchResultType.File },
      { end: 2, lineNumber: 1, start: 0, text: 'match2', type: TextSearchResultType.Match },
    ],
    matchCount: 2,
    replacement: 'new-text',
    workspacePath: '/test',
  }

  const result = await replaceAll(state)

  expect(result).toEqual({
    ...state,
    fileCount: 1,
    finalDeltaY: 105,
    icons: [],
    items: [
      { end: 0, lineNumber: 0, start: 0, text: 'file2.txt', type: TextSearchResultType.File },
      { end: 2, lineNumber: 1, start: 0, text: 'match2', type: TextSearchResultType.Match },
    ],
    listFocusedIndex: 0,
    listItems: [
      { end: 0, lineNumber: 0, start: 0, text: 'file2.txt', type: TextSearchResultType.File },
      { end: 2, lineNumber: 1, start: 0, text: 'match2', type: TextSearchResultType.Match },
    ],
    matchCount: 1,
    message: "Replaced 1 occurrence across 1 file with 'new-text'",
    scrollBarHeight: 20,
  })
  expect(mockDialogRpc.invocations).toEqual([
    [
      'ConfirmPrompt.prompt',
      "Replace 1 occurrence across 1 file with 'new-text'",
      {
        confirmMessage: 'Replace',
        title: 'Replace All',
      },
    ],
  ])
  expect(mockRpc.invocations).toEqual([
    [
      'BulkReplacement.applyBulkReplacement',
      [
        {
          changes: [
            {
              endColumnIndex: 2,
              endRowIndex: 1,
              startColumnIndex: 0,
              startRowIndex: 0,
              text: 'new-text',
            },
          ],
          uri: '/test/file1.txt',
        },
      ],
    ],
    ['Layout.handleWorkspaceRefresh'],
  ])
})
