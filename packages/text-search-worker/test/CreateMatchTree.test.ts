import { test, expect } from '@jest/globals'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import { createMatchTree } from '../src/parts/CreateMatchTree/CreateMatchTree.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('createMatchTree creates tree from search results', () => {
  const results: SearchResult[] = [
    {
      end: 0,
      lineNumber: 0,
      start: 0,
      text: 'file1.ts',
      type: TextSearchResultType.File,
    },
    {
      end: 5,
      lineNumber: 1,
      start: 0,
      text: 'match1',
      type: TextSearchResultType.Match,
    },
    {
      end: 5,
      lineNumber: 2,
      start: 0,
      text: 'match2',
      type: TextSearchResultType.Match,
    },
    {
      end: 0,
      lineNumber: 0,
      start: 0,
      text: 'file2.ts',
      type: TextSearchResultType.File,
    },
    {
      end: 5,
      lineNumber: 1,
      start: 0,
      text: 'match3',
      type: TextSearchResultType.Match,
    },
  ]

  const result = createMatchTree(results)

  expect(result).toEqual({
    'file1.ts': [
      {
        end: 5,
        lineNumber: 1,
        start: 0,
        text: 'match1',
        type: TextSearchResultType.Match,
      },
      {
        end: 5,
        lineNumber: 2,
        start: 0,
        text: 'match2',
        type: TextSearchResultType.Match,
      },
    ],
    'file2.ts': [
      {
        end: 5,
        lineNumber: 1,
        start: 0,
        text: 'match3',
        type: TextSearchResultType.Match,
      },
    ],
  })
})

test('createMatchTree handles empty results', () => {
  const results: SearchResult[] = []
  const result = createMatchTree(results)
  expect(result).toEqual({})
})

test('createMatchTree handles single file with no matches', () => {
  const results: SearchResult[] = [
    {
      end: 0,
      lineNumber: 0,
      start: 0,
      text: 'file1.ts',
      type: TextSearchResultType.File,
    },
  ]
  const result = createMatchTree(results)
  expect(result).toEqual({
    'file1.ts': [],
  })
})
