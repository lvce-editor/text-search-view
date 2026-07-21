import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'
import * as ToggleUseRegularExpression from '../src/parts/ToggleUseRegularExpression/ToggleUseRegularExpression.ts'

test('toggleUseRegularExpression', async () => {
  const initialState: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    flags: 0,
  }
  const newState = await ToggleUseRegularExpression.toggleUseRegularExpression(initialState)
  expect(SearchFlags.hasUseRegularExpression(newState.flags)).toBe(true)
})
