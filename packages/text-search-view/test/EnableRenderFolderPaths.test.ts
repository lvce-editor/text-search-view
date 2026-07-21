import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as EnableRenderFolderPaths from '../src/parts/EnableRenderFolderPaths/EnableRenderFolderPaths.ts'

test('enableRenderFolderPaths enables renderFolderPaths', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    renderFolderPaths: false,
  }

  const newState = EnableRenderFolderPaths.enableRenderFolderPaths(state)

  expect(newState.renderFolderPaths).toBe(true)
})

test('enableRenderFolderPaths preserves other state properties', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    renderFolderPaths: false,
    uid: 123,
    value: 'test',
    x: 10,
    y: 20,
  }

  const newState = EnableRenderFolderPaths.enableRenderFolderPaths(state)

  expect(newState.uid).toBe(state.uid)
  expect(newState.value).toBe(state.value)
  expect(newState.x).toBe(state.x)
  expect(newState.y).toBe(state.y)
  expect(newState).not.toBe(state)
})
