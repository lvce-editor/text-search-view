import { expect, test } from '@jest/globals'
import * as ToggleCollapsedPath from '../src/parts/ToggleCollapsedPath/ToggleCollapsedPath.ts'

test('toggleCollapsedPath - collapse path', () => {
  const collapsedPaths: readonly string[] = []
  const path = 'b.css'
  const result = ToggleCollapsedPath.toggleCollapsedPath(collapsedPaths, path)
  expect(result).toEqual(['b.css'])
})

test('toggleCollapsedPath - uncollapse path', () => {
  const collapsedPaths: readonly string[] = ['b.css']
  const path = 'b.css'
  const result = ToggleCollapsedPath.toggleCollapsedPath(collapsedPaths, path)
  expect(result).toEqual([])
})

test('toggleCollapsedPath - handles multiple paths', () => {
  const collapsedPaths: readonly string[] = ['a.css']
  const path = 'b.css'
  const result = ToggleCollapsedPath.toggleCollapsedPath(collapsedPaths, path)
  expect(result).toEqual(['a.css', 'b.css'])
})
