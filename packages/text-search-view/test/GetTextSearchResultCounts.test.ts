import { expect, test } from '@jest/globals'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import { getTextSearchResultCounts } from '../src/parts/GetTextSearchResultCounts/GetTextSearchResultCounts.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('getTextSearchResultCounts returns correct counts for mixed results', () => {
  const results: readonly SearchResult[] = [
    { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
    { end: 6, lineNumber: 0, start: 0, text: 'match1', type: TextSearchResultType.Match },
    { end: 0, lineNumber: 1, start: 0, text: 'file2.txt', type: TextSearchResultType.File },
    { end: 6, lineNumber: 1, start: 0, text: 'match2', type: TextSearchResultType.Match },
  ]

  const resultCounts = getTextSearchResultCounts(results)
  expect(resultCounts).toEqual({ fileCount: 2, resultCount: 2 })
})

test('getTextSearchResultCounts returns zero counts for empty results', () => {
  const results: readonly SearchResult[] = []

  const resultCounts = getTextSearchResultCounts(results)
  expect(resultCounts).toEqual({ fileCount: 0, resultCount: 0 })
})

test('getTextSearchResultCounts counts only files', () => {
  const results: readonly SearchResult[] = [
    { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
    { end: 0, lineNumber: 1, start: 0, text: 'file2.txt', type: TextSearchResultType.File },
  ]

  const resultCounts = getTextSearchResultCounts(results)
  expect(resultCounts).toEqual({ fileCount: 2, resultCount: 0 })
})

test('getTextSearchResultCounts counts only matches', () => {
  const results: readonly SearchResult[] = [
    { end: 6, lineNumber: 0, start: 0, text: 'match1', type: TextSearchResultType.Match },
    { end: 6, lineNumber: 1, start: 0, text: 'match2', type: TextSearchResultType.Match },
  ]

  const resultCounts = getTextSearchResultCounts(results)
  expect(resultCounts).toEqual({ fileCount: 0, resultCount: 2 })
})
