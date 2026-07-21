import { expect, test } from '@jest/globals'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import * as GetSearchDisplayResults from '../src/parts/GetSearchDisplayResults/GetSearchDisplayResults.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('getDisplayResults', () => {
  const results: readonly SearchResult[] = [
    {
      end: 0,
      lineNumber: 0,
      start: 0,
      text: './languages/index.kt',
      type: 1,
    },
    {
      end: 6,
      lineNumber: 1,
      start: 5,
      text: 'fun main(args : Array<String>) {',
      type: 2,
    },
    {
      end: 10,
      lineNumber: 1,
      start: 9,
      text: 'fun main(args : Array<String>) {',
      type: 2,
    },
    {
      end: 17,
      lineNumber: 1,
      start: 16,
      text: 'fun main(args : Array<String>) {',
      type: 2,
    },
  ]
  const fileIcons: readonly string[] = ['']
  const itemHeight = 20
  const resultCount = 3
  const searchTerm = 'a'
  const minLineY = 0
  const maxLineY = 4
  const replacement = ''
  const focusedIndex = -1
  const collapsedPaths: readonly string[] = []
  expect(
    GetSearchDisplayResults.getDisplayResults(
      results,
      itemHeight,
      resultCount,
      searchTerm,
      minLineY,
      maxLineY,
      replacement,
      fileIcons,
      focusedIndex,
      collapsedPaths,
      false,
      results,
    ),
  ).toEqual([
    {
      badgeText: '3',
      depth: 0,
      expanded: 2,
      focused: false,
      icon: '',
      indent: 16,
      matchLength: 0,
      matchStart: 0,
      posInSet: 1,
      replacement: '',
      setSize: 3,
      text: 'index.kt',
      title: '/languages/index.kt',
    },
    {
      badgeText: '',
      depth: 1,
      expanded: 0,
      focused: false,
      icon: '',
      indent: 28,
      matchLength: 1,
      matchStart: 5,
      posInSet: 2,
      replacement: '',
      setSize: 3,
      text: 'fun main(args : Array<String>) {',
      title: 'fun main(args : Array<String>) {',
    },
    {
      badgeText: '',
      depth: 1,
      expanded: 0,
      focused: false,
      icon: '',
      indent: 28,
      matchLength: 1,
      matchStart: 9,
      posInSet: 3,
      replacement: '',
      setSize: 3,
      text: 'fun main(args : Array<String>) {',
      title: 'fun main(args : Array<String>) {',
    },
    {
      badgeText: '',
      depth: 1,
      expanded: 0,
      focused: false,
      icon: '',
      indent: 28,
      matchLength: 1,
      matchStart: 16,
      posInSet: 4,
      replacement: '',
      setSize: 3,
      text: 'fun main(args : Array<String>) {',
      title: 'fun main(args : Array<String>) {',
    },
  ])
})

test('getDisplayResults - should not show child items when parent file is collapsed', () => {
  const results: readonly SearchResult[] = [
    {
      end: 0,
      lineNumber: 0,
      start: 0,
      text: './file1.txt',
      type: TextSearchResultType.File,
    },
    {
      end: 6,
      lineNumber: 1,
      start: 5,
      text: 'match1 in file1',
      type: TextSearchResultType.Match,
    },
    {
      end: 10,
      lineNumber: 2,
      start: 9,
      text: 'match2 in file1',
      type: TextSearchResultType.Match,
    },
    {
      end: 0,
      lineNumber: 3,
      start: 0,
      text: './file2.txt',
      type: TextSearchResultType.File,
    },
    {
      end: 6,
      lineNumber: 4,
      start: 5,
      text: 'match1 in file2',
      type: TextSearchResultType.Match,
    },
  ]
  const fileIcons: readonly string[] = ['', '']
  const itemHeight = 20
  const resultCount = 3 // Only file1.txt and file2.txt should be counted, plus file2.txt's match
  const searchTerm = 'a'
  const minLineY = 0
  const maxLineY = 3 // Only show file1.txt, file2.txt, and file2.txt's match
  const replacement = ''
  const focusedIndex = -1
  const collapsedPaths: readonly string[] = ['./file1.txt'] // file1.txt is collapsed
  const originalResults = results

  const displayResults = GetSearchDisplayResults.getDisplayResults(
    results, // This should be the filtered results, but currently it's not
    itemHeight,
    resultCount,
    searchTerm,
    minLineY,
    maxLineY,
    replacement,
    fileIcons,
    focusedIndex,
    collapsedPaths,
    false,
    originalResults,
  )

  // Should only show file1.txt (collapsed) and file2.txt with its match
  // Should NOT show matches from file1.txt since it's collapsed
  expect(displayResults).toHaveLength(3)
  expect(displayResults[0].text).toBe('file1.txt')
  expect(displayResults[0].expanded).toBe(1) // Collapsed
  expect(displayResults[1].text).toBe('file2.txt')
  expect(displayResults[1].expanded).toBe(2) // Expanded
  expect(displayResults[2].text).toBe('match1 in file2')
})

test('getDisplayResults - should render relative folder path next to file name when enabled', () => {
  const results: readonly SearchResult[] = [
    {
      end: 0,
      lineNumber: 0,
      start: 0,
      text: './languages/index.kt',
      type: TextSearchResultType.File,
    },
    {
      end: 6,
      lineNumber: 1,
      start: 5,
      text: 'fun main(args : Array<String>) {',
      type: TextSearchResultType.Match,
    },
  ]
  const displayResults = GetSearchDisplayResults.getDisplayResults(results, 20, 1, 'a', 0, 2, '', [''], -1, [], true, results)

  expect(displayResults[0].text).toBe('index.kt — languages')
})
