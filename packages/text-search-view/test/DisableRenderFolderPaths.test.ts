import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DisableRenderFolderPaths from '../src/parts/DisableRenderFolderPaths/DisableRenderFolderPaths.ts'

test('disableRenderFolderPaths', () => {
  const initialState: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    renderFolderPaths: true,
  }

  const newState = DisableRenderFolderPaths.disableRenderFolderPaths(initialState)
  expect(newState.renderFolderPaths).toBe(false)
})
