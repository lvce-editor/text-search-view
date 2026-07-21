import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as RemoveCurrent from '../src/parts/RemoveCurrent/RemoveCurrent.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test.skip('removeCurrent - no focused item returns state', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: -1,
    items: [],
  }

  const result = await RemoveCurrent.removeCurrent(state)
  expect(result).toEqual({
    ...state,
  })
})

test.skip('removeCurrent - with focused item returns state', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 0,
    items: [{ end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File }],
  }

  const result = await RemoveCurrent.removeCurrent(state)
  expect(result).toEqual({
    ...state,
  })
})

test.skip('removeCurrent - with focused match item returns state', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 1,
    items: [
      { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
      { end: 5, lineNumber: 1, start: 0, text: 'match1', type: TextSearchResultType.Match },
    ],
  }

  const result = await RemoveCurrent.removeCurrent(state)
  expect(result).toEqual({
    ...state,
  })
})
