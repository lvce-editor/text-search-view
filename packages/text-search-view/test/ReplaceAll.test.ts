import type { AsyncCommandContext } from '@lvce-editor/viewlet-registry'
import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { replaceAll, replaceAllWithProgress } from '../src/parts/ReplaceAll/ReplaceAll.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('replaceAll - replaces all matches and updates state', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'BulkReplacement.applyBulkReplacement'() {},
    'ConfirmPrompt.prompt'() {
      return true
    },
    'Layout.handleWorkspaceRefresh'() {},
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
  expect(mockRpc.invocations).toEqual([
    [
      'ConfirmPrompt.prompt',
      "Replace 2 occurrences across 2 files with 'new-text'",
      {
        confirmMessage: 'Replace',
        title: 'Replace All',
      },
    ],
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
  using mockRpc = RendererWorker.registerMockRpc({
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

test('replaceAllWithProgress - renders progress before applying replacements', async () => {
  const { promise: replacementStarted, resolve: notifyReplacementStarted } = Promise.withResolvers<void>()
  const { promise: continueReplacement, resolve: finishReplacement } = Promise.withResolvers<void>()
  using mockRpc = RendererWorker.registerMockRpc({
    async 'BulkReplacement.applyBulkReplacement'() {
      notifyReplacementStarted()
      await continueReplacement
    },
    'ConfirmPrompt.prompt'() {
      return true
    },
    'Layout.handleWorkspaceRefresh'() {},
    'Search.rerender'() {},
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

  const pendingReplacement = replaceAllWithProgress(context)
  await replacementStarted

  expect(currentState.message).toBe('Replacing 2 occurrences across 2 files…')
  expect(mockRpc.invocations.slice(0, 3)).toEqual([
    [
      'ConfirmPrompt.prompt',
      "Replace 2 occurrences across 2 files with 'new-text'",
      {
        confirmMessage: 'Replace',
        title: 'Replace All',
      },
    ],
    ['Search.rerender'],
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
  ])

  finishReplacement()
  await pendingReplacement

  expect(currentState.message).toBe("Replaced 2 occurrences across 2 files with 'new-text'")
})

test('replaceAllWithProgress - reports progress for the focused file', async () => {
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
    workspacePath: '/test',
  }
  using mockRpc = RendererWorker.registerMockRpc({
    'BulkReplacement.applyBulkReplacement'() {},
    'ConfirmPrompt.prompt'() {
      return true
    },
    'Layout.handleWorkspaceRefresh'() {},
    'Search.rerender'() {
      expect(currentState.message).toBe('Replacing 1 occurrence across 1 file…')
    },
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

  expect(currentState.message).toBe("Replaced 1 occurrence across 1 file with 'new-text'")
  expect(mockRpc.invocations[0]).toEqual([
    'ConfirmPrompt.prompt',
    "Replace 1 occurrence across 1 file with 'new-text'",
    {
      confirmMessage: 'Replace',
      title: 'Replace All',
    },
  ])
})

test('replaceAllWithProgress - user cancels before progress is rendered', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
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
  using mockRpc = RendererWorker.registerMockRpc({
    'BulkReplacement.applyBulkReplacement'() {},
    'ConfirmPrompt.prompt'() {
      return true
    },
    'Layout.handleWorkspaceRefresh'() {},
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
  expect(mockRpc.invocations).toEqual([
    [
      'ConfirmPrompt.prompt',
      "Replace 1 occurrence across 1 file with 'new-text'",
      {
        confirmMessage: 'Replace',
        title: 'Replace All',
      },
    ],
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
