import { expect, test } from '@jest/globals'
import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'
import * as ToggleDetailsExpanded from '../src/parts/ToggleDetailsExpanded/ToggleDetailsExpanded.ts'

test('toggleDetailsExpanded - focuses include files input when expanding', () => {
  const initialState: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    flags: 0,
  }
  const newState = ToggleDetailsExpanded.toggleDetailsExpanded(initialState)
  expect(SearchFlags.hasDetailsExpanded(newState.flags)).toBe(true)
  expect(newState.focus).toBe(WhenExpression.FocusSearchIncludeInput)
  expect(newState.focusSource).toBe(InputSource.Script)
})

test('toggleDetailsExpanded - focuses search input when collapsing', () => {
  const initialState: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    flags: SearchFlags.DetailsExpanded,
    focus: WhenExpression.FocusSearchIncludeInput,
  }
  const newState = ToggleDetailsExpanded.toggleDetailsExpanded(initialState)
  expect(SearchFlags.hasDetailsExpanded(newState.flags)).toBe(false)
  expect(newState.focus).toBe(WhenExpression.FocusSearchInput)
  expect(newState.focusSource).toBe(InputSource.Script)
})
