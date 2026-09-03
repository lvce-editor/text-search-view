import { test, expect } from '@jest/globals'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import { getTreeListItems } from '../src/parts/GetTreeListItems/GetTreeListItems.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('getTreeListItems transforms flat results into tree structure', () => {
  const results = [
    { end: 0, lineNumber: 0, start: 0, text: 'src/file1.ts', type: TextSearchResultType.File },
    { end: 6, lineNumber: 1, start: 0, text: 'match1', type: TextSearchResultType.Match },
    { end: 0, lineNumber: 2, start: 0, text: 'src/folder/file2.ts', type: TextSearchResultType.File },
    { end: 6, lineNumber: 3, start: 0, text: 'match2', type: TextSearchResultType.Match },
  ]

  const treeResults = getTreeListItems(results)

  expect(treeResults).toEqual([
    { depth: 0, end: 0, isDirectory: true, lineNumber: 0, start: 0, text: 'src', type: TextSearchResultType.File },
    { depth: 1, end: 0, lineNumber: 0, start: 0, text: 'src/file1.ts', type: TextSearchResultType.File },
    { depth: 2, end: 6, lineNumber: 1, start: 0, text: 'match1', type: TextSearchResultType.Match },
    { depth: 1, end: 0, isDirectory: true, lineNumber: 0, start: 0, text: 'src/folder', type: TextSearchResultType.File },
    { depth: 2, end: 0, lineNumber: 2, start: 0, text: 'src/folder/file2.ts', type: TextSearchResultType.File },
    { depth: 3, end: 6, lineNumber: 3, start: 0, text: 'match2', type: TextSearchResultType.Match },
  ])
})

test('getTreeListItems handles empty results', () => {
  const results: readonly SearchResult[] = []
  const treeResults = getTreeListItems(results)
  expect(treeResults).toEqual([])
})

test('getTreeListItems handles single file with multiple matches', () => {
  const results = [
    { end: 0, lineNumber: 0, start: 0, text: 'file.ts', type: TextSearchResultType.File },
    { end: 6, lineNumber: 1, start: 0, text: 'match1', type: TextSearchResultType.Match },
    { end: 16, lineNumber: 2, start: 10, text: 'match2', type: TextSearchResultType.Match },
  ]

  const treeResults = getTreeListItems(results)

  expect(treeResults).toEqual([
    { depth: 0, end: 0, lineNumber: 0, start: 0, text: 'file.ts', type: TextSearchResultType.File },
    { depth: 1, end: 6, lineNumber: 1, start: 0, text: 'match1', type: TextSearchResultType.Match },
    { depth: 1, end: 16, lineNumber: 2, start: 10, text: 'match2', type: TextSearchResultType.Match },
  ])
})

test('getTreeListItems handles nested folders', () => {
  const results = [
    { end: 0, lineNumber: 0, start: 0, text: 'src/folder1/folder2/file.ts', type: TextSearchResultType.File },
    { end: 5, lineNumber: 1, start: 0, text: 'match', type: TextSearchResultType.Match },
  ]

  const treeResults = getTreeListItems(results)

  expect(treeResults).toEqual([
    { depth: 0, end: 0, isDirectory: true, lineNumber: 0, start: 0, text: 'src', type: TextSearchResultType.File },
    { depth: 1, end: 0, isDirectory: true, lineNumber: 0, start: 0, text: 'src/folder1', type: TextSearchResultType.File },
    { depth: 2, end: 0, isDirectory: true, lineNumber: 0, start: 0, text: 'src/folder1/folder2', type: TextSearchResultType.File },
    { depth: 3, end: 0, lineNumber: 0, start: 0, text: 'src/folder1/folder2/file.ts', type: TextSearchResultType.File },
    { depth: 4, end: 5, lineNumber: 1, start: 0, text: 'match', type: TextSearchResultType.Match },
  ])
})

test('getTreeListItems normalizes dot-prefixed paths and reuses shared folders', () => {
  const results = [
    { end: 0, lineNumber: 0, start: 0, text: './src/one.ts', type: TextSearchResultType.File },
    { end: 3, lineNumber: 1, start: 0, text: 'one', type: TextSearchResultType.Match },
    { end: 0, lineNumber: 0, start: 0, text: './src/two.ts', type: TextSearchResultType.File },
    { end: 3, lineNumber: 1, start: 0, text: 'two', type: TextSearchResultType.Match },
  ]

  const treeResults = getTreeListItems(results)

  expect(treeResults.filter((item) => item.isDirectory).map((item) => item.text)).toEqual(['src'])
  expect(treeResults.map((item) => item.text)).toEqual(['src', 'src/one.ts', 'one', 'src/two.ts', 'two'])
})
