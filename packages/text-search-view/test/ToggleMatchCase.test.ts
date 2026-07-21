import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'
import * as ToggleMatchCase from '../src/parts/ToggleMatchCase/ToggleMatchCase.ts'

test('toggleMatchCase', async () => {
  const initialState: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    flags: 0,
  }
  const newState = await ToggleMatchCase.toggleMatchCase(initialState)
  expect(SearchFlags.hasMatchCase(newState.flags)).toBe(true)
})
