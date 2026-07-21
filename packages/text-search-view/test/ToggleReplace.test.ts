import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'
import * as ToggleReplace from '../src/parts/ToggleReplace/ToggleReplace.ts'

test('toggleReplace', async () => {
  const initialState: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    flags: 0,
  }
  const newState = await ToggleReplace.toggleReplace(initialState)
  expect(SearchFlags.hasReplaceExpanded(newState.flags)).toBe(true)
})

test('toggleReplace collapses an expanded replace input', async () => {
  const initialState: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    flags: SearchFlags.ReplaceExpanded,
  }
  const newState = await ToggleReplace.toggleReplace(initialState)
  expect(SearchFlags.hasReplaceExpanded(newState.flags)).toBe(false)
})
