import { expect, test } from '@jest/globals'
import { IconThemeWorker } from '@lvce-editor/rpc-registry'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { expandCurrent } from '../src/parts/ExpandCurrent/ExpandCurrent.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

const mockIcon = 'file-icon'

test('expandCurrent expands the focused file result', async () => {
  using mockRpc = IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': () => [mockIcon, mockIcon, mockIcon],
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    collapsedPaths: ['file1.txt'],
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
      { end: 0, lineNumber: 2, start: 0, text: 'file2.txt', type: TextSearchResultType.File },
    ],
  }

  const result = await expandCurrent(state)

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

test('expandCurrent does nothing for non-expandable items', async () => {
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

  const result = await expandCurrent(state)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([])
})

test('expandCurrent does nothing without a focused item', async () => {
  const state = CreateDefaultState.createDefaultState()
  expect(await expandCurrent(state)).toBe(state)
})

test('expandCurrent does nothing when the focused item is missing', async () => {
  const state = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 0,
  }
  expect(await expandCurrent(state)).toBe(state)
})

test('expandCurrent does nothing when the focused file is not collapsed', async () => {
  const item = { end: 0, lineNumber: 0, start: 0, text: 'file.txt', type: TextSearchResultType.File }
  const state = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 0,
    listItems: [item],
  }
  expect(await expandCurrent(state)).toBe(state)
})
