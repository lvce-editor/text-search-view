import { expect, test } from '@jest/globals'
import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ExpandDetails from '../src/parts/ExpandDetails/ExpandDetails.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

test('expandDetails - expands details and focuses include input', () => {
  const initialState: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    flags: 0,
  }
  const newState = ExpandDetails.expandDetails(initialState)
  expect(SearchFlags.hasDetailsExpanded(newState.flags)).toBe(true)
  expect(newState.focus).toBe(WhenExpression.FocusSearchIncludeInput)
  expect(newState.focusSource).toBe(InputSource.Script)
})

test.skip('expandDetails - does nothing if already expanded', () => {
  const initialState: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    flags: SearchFlags.DetailsExpanded,
    focus: WhenExpression.FocusSearchInput,
  }
  const newState = ExpandDetails.expandDetails(initialState)
  expect(newState).toBe(initialState)
})
