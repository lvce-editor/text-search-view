import { expect, test } from '@jest/globals'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import * as ConvertSearchResults from '../src/parts/ConvertSearchResults/ConvertSearchResults.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('convertSearchResults - converts flat array to hierarchical structure', () => {
  const flatResults: readonly SearchResult[] = [
    { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
    { end: 6, lineNumber: 1, start: 0, text: 'match1', type: TextSearchResultType.Match },
    { end: 6, lineNumber: 2, start: 0, text: 'match2', type: TextSearchResultType.Match },
    { end: 0, lineNumber: 0, start: 0, text: 'file2.txt', type: TextSearchResultType.File },
    { end: 6, lineNumber: 1, start: 0, text: 'match3', type: TextSearchResultType.Match },
  ]

  const result = ConvertSearchResults.convertSearchResults(flatResults)
  expect(result).toEqual([
    {
      isExpanded: true,
      matches: [
        { end: 6, lineNumber: 1, start: 0, text: 'match1' },
        { end: 6, lineNumber: 2, start: 0, text: 'match2' },
      ],
      path: 'file1.txt',
    },
    {
      isExpanded: true,
      matches: [{ end: 6, lineNumber: 1, start: 0, text: 'match3' }],
      path: 'file2.txt',
    },
  ])
})
