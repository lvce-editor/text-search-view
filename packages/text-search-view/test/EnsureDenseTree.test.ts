import { expect, test } from '@jest/globals'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import { createFullParentFolderTree } from '../src/parts/EnsureDenseTree/EnsureDenseTree.ts'

const folder = (text: string): SearchResult => ({
  end: 0,
  isDirectory: true,
  lineNumber: 0,
  start: 0,
  text,
  type: 1,
})

test('ensureDenseTree creates parent directories', () => {
  const folders = ['src/folder']
  const denseTree = createFullParentFolderTree(folders)
  expect(denseTree).toEqual({
    '': [folder('src')],
    src: [folder('folder')],
  })
})

test('ensureDenseTree handles multiple files in same directory', () => {
  const folders = ['src']
  const denseTree = createFullParentFolderTree(folders)
  expect(denseTree).toEqual({
    '': [folder('src')],
  })
})

test('ensureDenseTree handles empty tree', () => {
  const folders: readonly string[] = []
  const denseTree = createFullParentFolderTree(folders)
  expect(denseTree).toEqual({})
})
