import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'
import * as ToggleUseIgnoreFiles from '../src/parts/ToggleUseIgnoreFiles/ToggleUseIgnoreFiles.ts'

test('toggleUseIgnoreFiles', async () => {
  const initialState: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    flags: 0,
  }
  const newState = await ToggleUseIgnoreFiles.toggleUseIgnoreFiles(initialState)
  expect(SearchFlags.hasUseIgnoreFiles(newState.flags)).toBe(true)
})
