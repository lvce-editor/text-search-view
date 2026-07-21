import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'
import * as TogglePreserveCase from '../src/parts/TogglePreserveCase/TogglePreserveCase.ts'

test('togglePreserveCase', async () => {
  const initialState: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    flags: 0,
  }
  const newState = await TogglePreserveCase.togglePreserveCase(initialState)
  expect(SearchFlags.hasPreserveCase(newState.flags)).toBe(true)
})
