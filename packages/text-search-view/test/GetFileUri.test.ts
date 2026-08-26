import { expect, test } from '@jest/globals'
import { TextSearchResultType } from '@lvce-editor/constants'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getFileUri } from '../src/parts/GetFileUri/GetFileUri.ts'

const file = (text: string): SearchResult => ({
  end: 0,
  lineNumber: 0,
  start: 0,
  text,
  type: TextSearchResultType.File,
})

const match = {
  end: 5,
  lineNumber: 1,
  start: 0,
  text: 'match',
  type: TextSearchResultType.Match,
}

test('returns the uri for a file result', () => {
  const state = { ...createDefaultState(), items: [file('src/file.ts')], workspacePath: '/workspace' }
  expect(getFileUri(state, 0)).toBe('/workspace/src/file.ts')
})

test('normalizes a dot-relative file result', () => {
  const state = { ...createDefaultState(), items: [file('./src/file.ts')], workspacePath: '/workspace' }
  expect(getFileUri(state, 0)).toBe('/workspace/src/file.ts')
})

test('preserves a virtual workspace scheme', () => {
  const state = { ...createDefaultState(), items: [file('src/file.ts')], workspacePath: 'memfs://workspace' }
  expect(getFileUri(state, 0)).toBe('memfs://workspace/src/file.ts')
})

test('returns the containing file uri for a match result', () => {
  const state = { ...createDefaultState(), items: [file('first.ts'), match, file('second.ts'), match], workspacePath: '/workspace' }
  expect(getFileUri(state, 3)).toBe('/workspace/second.ts')
})

test('returns an empty string when no containing file exists', () => {
  const state = { ...createDefaultState(), items: [match], workspacePath: '/workspace' }
  expect(getFileUri(state, 0)).toBe('')
})

test('returns an empty string for an out-of-range index', () => {
  const state = { ...createDefaultState(), items: [file('file.ts')], workspacePath: '/workspace' }
  expect(getFileUri(state, 2)).toBe('')
})
