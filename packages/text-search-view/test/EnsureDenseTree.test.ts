import { expect, test } from '@jest/globals'
import { createFullParentFolderTree } from '../src/parts/EnsureDenseTree/EnsureDenseTree.ts'

test('ensureDenseTree creates parent directories', () => {
  const folders = ['src/folder']
  const denseTree = createFullParentFolderTree(folders)
  expect(denseTree).toEqual({
    src: [],
  })
})

test('ensureDenseTree handles multiple files in same directory', () => {
  const folders = ['src']
  const denseTree = createFullParentFolderTree(folders)
  expect(denseTree).toEqual({})
})

test('ensureDenseTree handles empty tree', () => {
  const folders: readonly string[] = []
  const denseTree = createFullParentFolderTree(folders)
  expect(denseTree).toEqual({})
})
