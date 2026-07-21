import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as Dismiss from '../src/parts/Dismiss/Dismiss.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('dismissItem - no focused item', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    listFocusedIndex: -1,
  }

  const result = await Dismiss.dismissItem(state)
  expect(result).toBe(state)
})

test('dismissItem - dismiss file item', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    fileCount: 2,
    items: [
      { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
      { end: 0, lineNumber: 0, start: 0, text: 'match1', type: TextSearchResultType.Match },
      { end: 0, lineNumber: 0, start: 0, text: 'file2.txt', type: TextSearchResultType.File },
    ],
    listFocusedIndex: 0,
    matchCount: 1,
  }

  const result = await Dismiss.dismissItem(state)
  expect(result.items).toHaveLength(1)
  expect(result.fileCount).toBe(1)
  expect(result.matchCount).toBe(0)
  expect(result.listFocusedIndex).toBe(0)
})

test('dismissItem - dismiss match item', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    fileCount: 1,
    items: [
      { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
      { end: 0, lineNumber: 0, start: 0, text: 'match1', type: TextSearchResultType.Match },
      { end: 0, lineNumber: 0, start: 0, text: 'match2', type: TextSearchResultType.Match },
    ],
    listFocusedIndex: 1,
    matchCount: 2,
  }

  const result = await Dismiss.dismissItem(state)
  expect(result.items).toHaveLength(2)
  expect(result.fileCount).toBe(1)
  expect(result.matchCount).toBe(1)
  expect(result.listFocusedIndex).toBe(1)
})
