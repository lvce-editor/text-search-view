import { expect, test } from '@jest/globals'
import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleInputFocus } from '../src/parts/HandleInputFocus/HandleInputFocus.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'

test('handleInputFocus sets listFocused to false', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    listFocused: true,
  }

  const result = handleInputFocus(state, InputName.SearchValue)

  expect(result.listFocused).toBe(false)
})

test('handleInputFocus sets focused to true', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    focused: false,
  }

  const result = handleInputFocus(state, InputName.SearchValue)

  expect(result.focused).toBe(true)
})

test('handleInputFocus sets focus to correct key for SearchValue', () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  const result = handleInputFocus(state, InputName.SearchValue)

  expect(result.focus).toBe(WhenExpression.FocusSearchInput)
})

test('handleInputFocus sets focus to correct key for ReplaceValue', () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  const result = handleInputFocus(state, InputName.ReplaceValue)

  expect(result.focus).toBe(WhenExpression.FocusSearchReplaceInput)
})

test('handleInputFocus sets focus to correct key for MatchCase', () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  const result = handleInputFocus(state, InputName.MatchCase)

  expect(result.focus).toBe(WhenExpression.FocusSearchMatchCase)
})

test('handleInputFocus sets focus to correct key for MatchWholeWord', () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  const result = handleInputFocus(state, InputName.MatchWholeWord)

  expect(result.focus).toBe(WhenExpression.FocusSearchWholeWord)
})

test('handleInputFocus sets focus to correct key for UseRegularExpression', () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  const result = handleInputFocus(state, InputName.UseRegularExpression)

  expect(result.focus).toBe(WhenExpression.FocusSearchRegex)
})

test('handleInputFocus sets focus to correct key for ReplaceAll', () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  const result = handleInputFocus(state, InputName.ReplaceAll)

  expect(result.focus).toBe(WhenExpression.FocusSearchReplaceAll)
})

test('handleInputFocus sets focus to correct key for PreserveCase', () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  const result = handleInputFocus(state, InputName.PreserveCase)

  expect(result.focus).toBe(WhenExpression.FocusSearchPreserveCase)
})

test('handleInputFocus sets focus to correct key for ToggleSearchDetails', () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  const result = handleInputFocus(state, InputName.ToggleSearchDetails)

  expect(result.focus).toBe(WhenExpression.FocusToggleDetails)
})

test('handleInputFocus sets focus to correct key for FilesToInclude', () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  const result = handleInputFocus(state, InputName.FilesToInclude)

  expect(result.focus).toBe(WhenExpression.FocusSearchIncludeInput)
})

test('handleInputFocus sets focus to correct key for FilesToExclude', () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  const result = handleInputFocus(state, InputName.FilesToExclude)

  expect(result.focus).toBe(WhenExpression.FocusSearchExcludeInput)
})

test('handleInputFocus sets focus to correct key for SearchOnlyOpenEditors', () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  const result = handleInputFocus(state, InputName.SearchOnlyOpenEditors)

  expect(result.focus).toBe(WhenExpression.FocusSearchOpenEditors)
})

test('handleInputFocus sets focus to correct key for UseExcludeSettings', () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  const result = handleInputFocus(state, InputName.UseExcludeSettings)

  expect(result.focus).toBe(WhenExpression.FocusIgnoreFiles)
})

test('handleInputFocus sets focus to correct key for ToggleReplace', () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  const result = handleInputFocus(state, InputName.ToggleReplace)

  expect(result.focus).toBe(WhenExpression.FocusToggleReplace)
})

test('handleInputFocus sets focus to Empty for unknown input name', () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  const result = handleInputFocus(state, 'UnknownInput')

  expect(result.focus).toBe(WhenExpression.Empty)
})

test('handleInputFocus preserves other state properties', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    height: 200,
    replacement: 'test-replacement',
    uid: 42,
    value: 'test-value',
    width: 100,
  }

  const result = handleInputFocus(state, InputName.SearchValue)

  expect(result.uid).toBe(42)
  expect(result.value).toBe('test-value')
  expect(result.replacement).toBe('test-replacement')
  expect(result.width).toBe(100)
  expect(result.height).toBe(200)
})
