import { expect, test } from '@jest/globals'
import { IconThemeWorker } from '@lvce-editor/rpc-registry'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import { collapseCurrent } from '../src/parts/CollapseCurrent/CollapseCurrent.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

const mockIcon = 'file-icon'

test('collapseCurrent collapses the focused file result', async () => {
  using mockRpc = IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': () => [mockIcon, mockIcon],
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 0,
    headerHeight: 40,
    height: 500,
    itemHeight: 22,
    items: [
      { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
      { end: 0, lineNumber: 1, start: 0, text: 'match1', type: TextSearchResultType.Match },
      { end: 0, lineNumber: 2, start: 0, text: 'file2.txt', type: TextSearchResultType.File },
    ],
    listItems: [
      { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
      { end: 0, lineNumber: 1, start: 0, text: 'match1', type: TextSearchResultType.Match },
      { end: 0, lineNumber: 2, start: 0, text: 'file2.txt', type: TextSearchResultType.File },
    ],
  }

  const result = await collapseCurrent(state)

  expect(result).toMatchObject({
    ...state,
    collapsedPaths: ['file1.txt'],
    focus: 22,
    focusSource: 2,
    icons: ['file-icon', 'file-icon'],
    listFocused: true,
    listFocusedIndex: 0,
    listItems: [
      { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
      { end: 0, lineNumber: 2, start: 0, text: 'file2.txt', type: TextSearchResultType.File },
    ],
    maxLineY: 2,
  })
  expect(mockRpc.invocations).toEqual([
    [
      'IconTheme.getIcons',
      [
        { name: 'file1.txt', type: 1 },
        { name: 'file2.txt', type: 1 },
      ],
    ],
  ])
})

test('collapseCurrent does nothing for non-expandable items', async () => {
  using mockRpc = IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': () => [mockIcon],
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 1,
    items: [
      { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
      { end: 0, lineNumber: 1, start: 0, text: 'match1', type: TextSearchResultType.Match },
    ],
    listItems: [
      { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
      { end: 0, lineNumber: 1, start: 0, text: 'match1', type: TextSearchResultType.Match },
    ],
  }

  const result = await collapseCurrent(state)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([])
})

test('collapseCurrent does nothing without a focused item', async () => {
  const state = CreateDefaultState.createDefaultState()
  expect(await collapseCurrent(state)).toBe(state)
})

test('collapseCurrent does nothing when the focused item is missing', async () => {
  const state = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 0,
  }
  expect(await collapseCurrent(state)).toBe(state)
})

test('collapseCurrent does nothing when the focused file is already collapsed', async () => {
  const item = { end: 0, lineNumber: 0, start: 0, text: 'file.txt', type: TextSearchResultType.File }
  const state = {
    ...CreateDefaultState.createDefaultState(),
    collapsedPaths: ['file.txt'],
    focusedIndex: 0,
    listItems: [item],
  }
  expect(await collapseCurrent(state)).toBe(state)
})
