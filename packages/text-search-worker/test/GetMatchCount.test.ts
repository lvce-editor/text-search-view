import { expect, test } from '@jest/globals'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import * as GetMatchCount from '../src/parts/GetMatchCount/GetMatchCount.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test.skip('getMatchCount - empty results', () => {
  const results: readonly SearchResult[] = []
  expect(GetMatchCount.getMatchCount(results, 0)).toBe(0)
})

test('getMatchCount - only file results', () => {
  const results: readonly SearchResult[] = [
    { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
    { end: 0, lineNumber: 1, start: 0, text: 'file2.txt', type: TextSearchResultType.File },
  ]
  expect(GetMatchCount.getMatchCount(results, 0)).toBe(0)
})

test('getMatchCount - matches between two files', () => {
  const results: readonly SearchResult[] = [
    { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
    { end: 6, lineNumber: 1, start: 0, text: 'match1', type: TextSearchResultType.Match },
    { end: 6, lineNumber: 2, start: 0, text: 'match2', type: TextSearchResultType.Match },
    { end: 0, lineNumber: 3, start: 0, text: 'file2.txt', type: TextSearchResultType.File },
  ]
  expect(GetMatchCount.getMatchCount(results, 0)).toBe(2)
})

test('getMatchCount - matches after last file', () => {
  const results: readonly SearchResult[] = [
    { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
    { end: 6, lineNumber: 1, start: 0, text: 'match1', type: TextSearchResultType.Match },
    { end: 6, lineNumber: 2, start: 0, text: 'match2', type: TextSearchResultType.Match },
  ]
  expect(GetMatchCount.getMatchCount(results, 0)).toBe(2)
})

test('getMatchCount - matches between multiple files', () => {
  const results: readonly SearchResult[] = [
    { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
    { end: 6, lineNumber: 1, start: 0, text: 'match1', type: TextSearchResultType.Match },
    { end: 0, lineNumber: 2, start: 0, text: 'file2.txt', type: TextSearchResultType.File },
    { end: 6, lineNumber: 3, start: 0, text: 'match2', type: TextSearchResultType.Match },
    { end: 6, lineNumber: 4, start: 0, text: 'match3', type: TextSearchResultType.Match },
    { end: 0, lineNumber: 5, start: 0, text: 'file3.txt', type: TextSearchResultType.File },
  ]
  expect(GetMatchCount.getMatchCount(results, 2)).toBe(2)
})
