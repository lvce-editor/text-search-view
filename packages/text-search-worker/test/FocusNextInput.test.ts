import { expect, test } from '@jest/globals'
import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as FocusNextInput from '../src/parts/FocusNextInput/FocusNextInput.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

test('focusNextInput - from toggle details with details collapsed sets listFocused to true', () => {
  const state = CreateDefaultState.createDefaultState()
  const updatedState = FocusNextInput.focusNextInput({
    ...state,
    flags: 0,
    focus: WhenExpression.FocusToggleDetails,
  })
  expect(updatedState.focus).toBe(WhenExpression.FocusSearchResults)
  expect(updatedState.listFocused).toBe(true)
})

test('focusNextInput - from ignore files sets listFocused to true', () => {
  const state = CreateDefaultState.createDefaultState()
  const updatedState = FocusNextInput.focusNextInput({
    ...state,
    flags: 0,
    focus: WhenExpression.FocusIgnoreFiles,
  })
  expect(updatedState.focus).toBe(WhenExpression.FocusSearchResults)
  expect(updatedState.listFocused).toBe(true)
})

test('focusNextInput - from search input does not set listFocused to true', () => {
  const state = CreateDefaultState.createDefaultState()
  const updatedState = FocusNextInput.focusNextInput({
    ...state,
    flags: 0,
    focus: WhenExpression.FocusSearchInput,
  })
  expect(updatedState.focus).toBe(WhenExpression.FocusSearchMatchCase)
  expect(updatedState.listFocused).toBe(false)
})

test('focusNextInput - from toggle details with details expanded does not set listFocused to true', () => {
  const state = CreateDefaultState.createDefaultState()
  const updatedState = FocusNextInput.focusNextInput({
    ...state,
    flags: SearchFlags.DetailsExpanded,
    focus: WhenExpression.FocusToggleDetails,
  })
  expect(updatedState.focus).toBe(WhenExpression.FocusSearchIncludeInput)
  expect(updatedState.listFocused).toBe(false)
})
