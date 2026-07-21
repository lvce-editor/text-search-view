import { expect, test } from '@jest/globals'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import * as GetReplacementEdits from '../src/parts/GetReplaceElements/GetReplaceElements.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('getReplacementEdits - single file with one match', () => {
  const workspacePath = '/test'
  const results: readonly SearchResult[] = [
    {
      end: 0,
      lineNumber: 0,
      start: 0,
      text: './file.txt',
      type: TextSearchResultType.File,
    },
    {
      end: 4,
      lineNumber: 1,
      start: 0,
      text: 'test content',
      type: TextSearchResultType.Match,
    },
  ]
  const replacement = 'new'

  const edits = GetReplacementEdits.getReplaceElements(results, workspacePath, replacement)
  expect(edits).toEqual([
    {
      changes: [
        {
          endColumnIndex: 4,
          endRowIndex: 1,
          startColumnIndex: 0,
          startRowIndex: 0,
          text: 'new',
        },
      ],
      uri: '/test/file.txt',
    },
  ])
})

test('getReplacementEdits - multiple files with matches', () => {
  const workspacePath = '/test'
  const results: readonly SearchResult[] = [
    {
      end: 0,
      lineNumber: 0,
      start: 0,
      text: './file1.txt',
      type: TextSearchResultType.File,
    },
    {
      end: 4,
      lineNumber: 1,
      start: 0,
      text: 'test content',
      type: TextSearchResultType.Match,
    },
    {
      end: 0,
      lineNumber: 0,
      start: 0,
      text: './file2.txt',
      type: TextSearchResultType.File,
    },
    {
      end: 6,
      lineNumber: 3,
      start: 2,
      text: 'test other',
      type: TextSearchResultType.Match,
    },
  ]
  const replacement = 'new'

  const edits = GetReplacementEdits.getReplaceElements(results, workspacePath, replacement)
  expect(edits).toEqual([
    {
      changes: [
        {
          endColumnIndex: 4,
          endRowIndex: 1,
          startColumnIndex: 0,
          startRowIndex: 0,
          text: 'new',
        },
      ],
      uri: '/test/file1.txt',
    },
    {
      changes: [
        {
          endColumnIndex: 6,
          endRowIndex: 3,
          startColumnIndex: 2,
          startRowIndex: 2,
          text: 'new',
        },
      ],
      uri: '/test/file2.txt',
    },
  ])
})

test('getReplacementEdits - empty results', () => {
  const workspacePath = '/test'
  const results: readonly SearchResult[] = []
  const replacement = 'new'

  const edits = GetReplacementEdits.getReplaceElements(results, workspacePath, replacement)
  expect(edits).toEqual([])
})

test('getReplacementEdits - file with multiple matches', () => {
  const workspacePath = '/test'
  const results: readonly SearchResult[] = [
    {
      end: 0,
      lineNumber: 0,
      start: 0,
      text: './file.txt',
      type: TextSearchResultType.File,
    },
    {
      end: 4,
      lineNumber: 1,
      start: 0,
      text: 'test content test',
      type: TextSearchResultType.Match,
    },
    {
      end: 16,
      lineNumber: 1,
      start: 12,
      text: 'test content test',
      type: TextSearchResultType.Match,
    },
  ]
  const replacement = 'new'

  const edits = GetReplacementEdits.getReplaceElements(results, workspacePath, replacement)
  expect(edits).toEqual([
    {
      changes: [
        {
          endColumnIndex: 4,
          endRowIndex: 1,
          startColumnIndex: 0,
          startRowIndex: 0,
          text: 'new',
        },
        {
          endColumnIndex: 16,
          endRowIndex: 1,
          startColumnIndex: 12,
          startRowIndex: 0,
          text: 'new',
        },
      ],
      uri: '/test/file.txt',
    },
  ])
})

test('getReplacementEdits - handles different file paths', () => {
  const workspacePath = 'memfs:///test'
  const results: readonly SearchResult[] = [
    {
      end: 0,
      lineNumber: 0,
      start: 0,
      text: 'file.txt',
      type: TextSearchResultType.File,
    },
    {
      end: 4,
      lineNumber: 1,
      start: 0,
      text: 'test content',
      type: TextSearchResultType.Match,
    },
  ]
  const replacement = 'new'

  const edits = GetReplacementEdits.getReplaceElements(results, workspacePath, replacement)
  expect(edits).toEqual([
    {
      changes: [
        {
          endColumnIndex: 4,
          endRowIndex: 1,
          startColumnIndex: 0,
          startRowIndex: 0,
          text: 'new',
        },
      ],
      uri: 'memfs:///test/file.txt',
    },
  ])
})
