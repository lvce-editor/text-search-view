import { expect, test } from '@jest/globals'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import { removeItemFromItems } from '../src/parts/RemoveItemFromItems/RemoveItemFromItems.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

const item = (type: number, text: string): SearchResult => ({
  end: 0,
  lineNumber: 0,
  start: 0,
  text,
  type,
})

test('removeItemFromItems - removes a context result', () => {
  const items = [
    item(TextSearchResultType.File, 'file.txt'),
    item(TextSearchResultType.Context, 'context'),
    item(TextSearchResultType.Match, 'match'),
  ]

  expect(removeItemFromItems(items, 1, 1, 1)).toEqual({
    newFileCount: 1,
    newFocusedIndex: 1,
    newItems: [items[0], items[2]],
    newMatchCount: 1,
  })
})

test('removeItemFromItems - ignores context results when counting matches in a file', () => {
  const items = [
    item(TextSearchResultType.File, 'file.txt'),
    item(TextSearchResultType.Context, 'context'),
    item(TextSearchResultType.Match, 'match'),
  ]

  expect(removeItemFromItems(items, 0, 1, 1)).toEqual({
    newFileCount: 0,
    newFocusedIndex: -1,
    newItems: [],
    newMatchCount: 0,
  })
})

test('removeItemFromItems - removes the file when its only match is removed', () => {
  const items = [item(TextSearchResultType.File, 'file.txt'), item(TextSearchResultType.Match, 'match')]

  expect(removeItemFromItems(items, 1, 1, 1)).toEqual({
    newFileCount: 0,
    newFocusedIndex: -1,
    newItems: [],
    newMatchCount: 0,
  })
})

test('removeItemFromItems - rejects an unknown result type', () => {
  const items = [item(99, 'unknown')]

  expect(() => removeItemFromItems(items, 0, 0, 0)).toThrow('unknown search result type')
})
