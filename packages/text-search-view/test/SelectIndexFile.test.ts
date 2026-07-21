import { expect, test } from '@jest/globals'
import { IconThemeWorker } from '@lvce-editor/rpc-registry'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { selectIndexFile } from '../src/parts/SelectIndexFile/SelectIndexFile.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

const mockIcon = 'file-icon'

test('selectIndexFile - toggles collapsed path and updates state', async () => {
  using mockRpc = IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': () => [mockIcon, mockIcon],
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    collapsedPaths: [],
    headerHeight: 40,
    height: 500,
    itemHeight: 22,
    items: [
      { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
      { end: 0, lineNumber: 1, start: 0, text: 'match1', type: TextSearchResultType.Match },
      { end: 0, lineNumber: 2, start: 0, text: 'file2.txt', type: TextSearchResultType.File },
    ],
  }

  const result = await selectIndexFile(state, state.items[0], 0)

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

test('selectIndexFile - uncollapse path when already collapsed', async () => {
  using mockRpc = IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': () => [mockIcon, mockIcon, mockIcon],
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    collapsedPaths: ['file1.txt'],
    headerHeight: 40,
    height: 500,
    itemHeight: 22,
    items: [
      { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
      { end: 0, lineNumber: 1, start: 0, text: 'match1', type: TextSearchResultType.Match },
      { end: 0, lineNumber: 2, start: 0, text: 'file2.txt', type: TextSearchResultType.File },
    ],
  }

  const result = await selectIndexFile(state, state.items[0], 0)

  expect(result).toMatchObject({
    ...state,
    collapsedPaths: [],
    focus: 22,
    focusSource: 2,
    icons: ['file-icon', '', 'file-icon'],
    listFocused: true,
    listFocusedIndex: 0,
    listItems: state.items,
    maxLineY: 3,
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
