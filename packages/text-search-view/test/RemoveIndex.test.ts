import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as RemoveIndex from '../src/parts/RemoveIndex/RemoveIndex.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test.skip('removeIndex - returns state unchanged', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    fileCount: 1,
    items: [
      { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
      { end: 0, lineNumber: 0, start: 0, text: 'match1', type: TextSearchResultType.Match },
    ],
    matchCount: 1,
  }

  const result = await RemoveIndex.removeIndex(state, 0)
  expect(result).toEqual({
    ...state,
  })
})

test.skip('removeIndex - with empty state', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    fileCount: 0,
    items: [],
    matchCount: 0,
  }

  const result = await RemoveIndex.removeIndex(state, 0)
  expect(result).toEqual({
    ...state,
  })
})

test.skip('removeIndex - with file item', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    fileCount: 2,
    items: [
      { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
      { end: 0, lineNumber: 0, start: 0, text: 'match1', type: TextSearchResultType.Match },
      { end: 0, lineNumber: 0, start: 0, text: 'file2.txt', type: TextSearchResultType.File },
    ],
    matchCount: 1,
  }

  const result = await RemoveIndex.removeIndex(state, 0)
  expect(result).toEqual({
    ...state,
  })
})

test.skip('removeIndex - with match item', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    fileCount: 1,
    items: [
      { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
      { end: 0, lineNumber: 0, start: 0, text: 'match1', type: TextSearchResultType.Match },
      { end: 0, lineNumber: 0, start: 0, text: 'match2', type: TextSearchResultType.Match },
    ],
    matchCount: 2,
  }

  const result = await RemoveIndex.removeIndex(state, 1)
  expect(result).toEqual({
    ...state,
  })
})

test.skip('removeIndex - with invalid index', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    fileCount: 1,
    items: [{ end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File }],
    matchCount: 0,
  }

  const result = await RemoveIndex.removeIndex(state, 10)
  expect(result).toEqual({
    ...state,
  })
})
