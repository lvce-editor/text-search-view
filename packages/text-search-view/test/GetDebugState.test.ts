import { expect, test } from '@jest/globals'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as GetDebugState from '../src/parts/GetDebugState/GetDebugState.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

const createItem = (text: string): SearchResult => ({
  end: 0,
  lineNumber: 0,
  start: 0,
  text,
  type: TextSearchResultType.File,
})

test('assertReplacementCompleted accepts the completed state', () => {
  const state = {
    ...CreateDefaultState.createDefaultState(),
    message: "Replaced 1 occurrence across 1 file with 'd'",
  }

  expect(GetDebugState.assertReplacementCompleted(state)).toBe(state)
})

test('assertReplacementCompleted reports state before and after replacement', () => {
  const before = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 0,
    items: [createItem('before')],
    searchId: 'before-search',
  }
  const after = {
    ...CreateDefaultState.createDefaultState(),
    listFocusedIndex: 0,
    listItems: [createItem('after')],
    searchId: 'after-search',
  }
  GetDebugState.captureBeforeReplacement(before)

  expect(() => GetDebugState.assertReplacementCompleted(after)).toThrow(
    /Before: .*"actualItem":.*"text":"before".*"searchId":"before-search".*After: .*"actualItem":.*"text":"after".*"searchId":"after-search"/,
  )
})
