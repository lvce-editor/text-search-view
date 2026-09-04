import { expect, test } from '@jest/globals'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import * as GetFilteredResults from '../src/parts/GetFilteredResults/GetFilteredResults.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('getFilteredResults - returns all results when no filters', () => {
  const results: SearchResult[] = [
    { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
    { end: 6, lineNumber: 1, start: 0, text: 'match1', type: TextSearchResultType.Match },
    { end: 0, lineNumber: 2, start: 0, text: 'file2.txt', type: TextSearchResultType.File },
    { end: 6, lineNumber: 3, start: 0, text: 'match2', type: TextSearchResultType.Match },
  ]

  const filteredResults = GetFilteredResults.getFilteredResults(results, [])
  expect(filteredResults).toEqual(results)
})

test('getFilteredResults - filters matches under collapsed file', () => {
  const results: SearchResult[] = [
    { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
    { end: 6, lineNumber: 1, start: 0, text: 'match1', type: TextSearchResultType.Match },
    { end: 0, lineNumber: 2, start: 0, text: 'file2.txt', type: TextSearchResultType.File },
    { end: 6, lineNumber: 3, start: 0, text: 'match2', type: TextSearchResultType.Match },
  ]

  const filteredResults = GetFilteredResults.getFilteredResults(results, ['file1.txt'])
  expect(filteredResults).toEqual([
    { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
    { end: 0, lineNumber: 2, start: 0, text: 'file2.txt', type: TextSearchResultType.File },
    { end: 6, lineNumber: 3, start: 0, text: 'match2', type: TextSearchResultType.Match },
  ])
})

test('getFilteredResults - filters context under collapsed file', () => {
  const results: SearchResult[] = [
    { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
    { end: 0, lineNumber: 1, start: 0, text: 'context before', type: TextSearchResultType.Context },
    { end: 6, lineNumber: 2, start: 0, text: 'match1', type: TextSearchResultType.Match },
    { end: 0, lineNumber: 3, start: 0, text: 'context after', type: TextSearchResultType.Context },
    { end: 0, lineNumber: 0, start: 0, text: 'file2.txt', type: TextSearchResultType.File },
    { end: 6, lineNumber: 1, start: 0, text: 'match2', type: TextSearchResultType.Match },
  ]

  expect(GetFilteredResults.getFilteredResults(results, ['file1.txt'])).toEqual([
    { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
    { end: 0, lineNumber: 0, start: 0, text: 'file2.txt', type: TextSearchResultType.File },
    { end: 6, lineNumber: 1, start: 0, text: 'match2', type: TextSearchResultType.Match },
  ])
})

test('getFilteredResults - handles multiple collapsed files', () => {
  const results: SearchResult[] = [
    { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
    { end: 6, lineNumber: 1, start: 0, text: 'match1', type: TextSearchResultType.Match },
    { end: 0, lineNumber: 2, start: 0, text: 'file2.txt', type: TextSearchResultType.File },
    { end: 6, lineNumber: 3, start: 0, text: 'match2', type: TextSearchResultType.Match },
    { end: 0, lineNumber: 4, start: 0, text: 'file3.txt', type: TextSearchResultType.File },
    { end: 6, lineNumber: 5, start: 0, text: 'match3', type: TextSearchResultType.Match },
  ]

  const filteredResults = GetFilteredResults.getFilteredResults(results, ['file1.txt', 'file3.txt'])
  expect(filteredResults).toEqual([
    { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
    { end: 0, lineNumber: 2, start: 0, text: 'file2.txt', type: TextSearchResultType.File },
    { end: 6, lineNumber: 3, start: 0, text: 'match2', type: TextSearchResultType.Match },
    { end: 0, lineNumber: 4, start: 0, text: 'file3.txt', type: TextSearchResultType.File },
  ])
})

test('getFilteredResults - handles consecutive collapsed files', () => {
  const results: SearchResult[] = [
    { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
    { end: 6, lineNumber: 1, start: 0, text: 'match1', type: TextSearchResultType.Match },
    { end: 0, lineNumber: 2, start: 0, text: 'file2.txt', type: TextSearchResultType.File },
    { end: 6, lineNumber: 3, start: 0, text: 'match2', type: TextSearchResultType.Match },
  ]

  const filteredResults = GetFilteredResults.getFilteredResults(results, ['file1.txt', 'file2.txt'])
  expect(filteredResults).toEqual([
    { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
    { end: 0, lineNumber: 2, start: 0, text: 'file2.txt', type: TextSearchResultType.File },
  ])
})

test('getFilteredResults - handles empty results', () => {
  const results: SearchResult[] = []
  const filteredResults = GetFilteredResults.getFilteredResults(results, ['file1.txt'])
  expect(filteredResults).toEqual([])
})

test('getFilteredResults - handles only file results', () => {
  const results: SearchResult[] = [
    { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
    { end: 0, lineNumber: 1, start: 0, text: 'file2.txt', type: TextSearchResultType.File },
  ]

  const filteredResults = GetFilteredResults.getFilteredResults(results, ['file1.txt'])
  expect(filteredResults).toEqual([
    { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
    { end: 0, lineNumber: 1, start: 0, text: 'file2.txt', type: TextSearchResultType.File },
  ])
})

test('getFilteredResults - handles only match results', () => {
  const results: SearchResult[] = [
    { end: 6, lineNumber: 0, start: 0, text: 'match1', type: TextSearchResultType.Match },
    { end: 6, lineNumber: 1, start: 0, text: 'match2', type: TextSearchResultType.Match },
  ]

  const filteredResults = GetFilteredResults.getFilteredResults(results, ['file1.txt'])
  expect(filteredResults).toEqual(results)
})

test('getFilteredResults - hides nested tree descendants of a collapsed folder', () => {
  const results: readonly SearchResult[] = [
    { depth: 0, end: 0, isDirectory: true, lineNumber: 0, start: 0, text: 'src', type: TextSearchResultType.File },
    { depth: 1, end: 0, isDirectory: true, lineNumber: 0, start: 0, text: 'src/nested', type: TextSearchResultType.File },
    { depth: 2, end: 0, lineNumber: 0, start: 0, text: 'src/nested/file.ts', type: TextSearchResultType.File },
    { depth: 3, end: 6, lineNumber: 1, start: 0, text: 'needle', type: TextSearchResultType.Match },
    { depth: 0, end: 0, lineNumber: 0, start: 0, text: 'root.ts', type: TextSearchResultType.File },
  ]

  expect(GetFilteredResults.getFilteredResults(results, ['src'])).toEqual([results[0], results[4]])
})
