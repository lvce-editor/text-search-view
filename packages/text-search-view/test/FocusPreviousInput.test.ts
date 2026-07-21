import { expect, test } from '@jest/globals'
import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as FocusPreviousInput from '../src/parts/FocusPreviousInput/FocusPreviousInput.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

test('focusPreviousInput - from search input to toggle replace', () => {
  const state = CreateDefaultState.createDefaultState()
  const updatedState = FocusPreviousInput.focusPreviousInput({
    ...state,
    flags: 0,
    focus: WhenExpression.FocusSearchInput,
  })
  expect(updatedState.focus).toBe(WhenExpression.FocusToggleReplace)
  expect(updatedState.focusSource).toBe(InputSource.Script)
})

test('focusPreviousInput - from match case to search input without replace expanded', () => {
  const state = CreateDefaultState.createDefaultState()
  const updatedState = FocusPreviousInput.focusPreviousInput({
    ...state,
    flags: 0,
    focus: WhenExpression.FocusSearchMatchCase,
  })
  expect(updatedState.focus).toBe(WhenExpression.FocusSearchInput)
  expect(updatedState.focusSource).toBe(InputSource.Script)
})

test('focusPreviousInput - from match case to replace input with replace expanded', () => {
  const state = CreateDefaultState.createDefaultState()
  const updatedState = FocusPreviousInput.focusPreviousInput({
    ...state,
    flags: SearchFlags.ReplaceExpanded,
    focus: WhenExpression.FocusSearchMatchCase,
  })
  expect(updatedState.focus).toBe(WhenExpression.FocusSearchReplaceInput)
  expect(updatedState.focusSource).toBe(InputSource.Script)
})

test('focusPreviousInput - from whole word to match case', () => {
  const state = CreateDefaultState.createDefaultState()
  const updatedState = FocusPreviousInput.focusPreviousInput({
    ...state,
    flags: 0,
    focus: WhenExpression.FocusSearchWholeWord,
  })
  expect(updatedState.focus).toBe(WhenExpression.FocusSearchMatchCase)
  expect(updatedState.focusSource).toBe(InputSource.Script)
})

test('focusPreviousInput - from regex to whole word', () => {
  const state = CreateDefaultState.createDefaultState()
  const updatedState = FocusPreviousInput.focusPreviousInput({
    ...state,
    flags: 0,
    focus: WhenExpression.FocusSearchRegex,
  })
  expect(updatedState.focus).toBe(WhenExpression.FocusSearchWholeWord)
  expect(updatedState.focusSource).toBe(InputSource.Script)
})

test('focusPreviousInput - from preserve case to regex', () => {
  const state = CreateDefaultState.createDefaultState()
  const updatedState = FocusPreviousInput.focusPreviousInput({
    ...state,
    flags: 0,
    focus: WhenExpression.FocusSearchPreserveCase,
  })
  expect(updatedState.focus).toBe(WhenExpression.FocusSearchRegex)
  expect(updatedState.focusSource).toBe(InputSource.Script)
})

test('focusPreviousInput - from replace input to search input', () => {
  const state = CreateDefaultState.createDefaultState()
  const updatedState = FocusPreviousInput.focusPreviousInput({
    ...state,
    flags: 0,
    focus: WhenExpression.FocusSearchReplaceInput,
  })
  expect(updatedState.focus).toBe(WhenExpression.FocusSearchInput)
  expect(updatedState.focusSource).toBe(InputSource.Script)
})

test('focusPreviousInput - from replace all to preserve case', () => {
  const state = CreateDefaultState.createDefaultState()
  const updatedState = FocusPreviousInput.focusPreviousInput({
    ...state,
    flags: 0,
    focus: WhenExpression.FocusSearchReplaceAll,
  })
  expect(updatedState.focus).toBe(WhenExpression.FocusSearchPreserveCase)
  expect(updatedState.focusSource).toBe(InputSource.Script)
})

test('focusPreviousInput - from toggle details to replace all with replace expanded', () => {
  const state = CreateDefaultState.createDefaultState()
  const updatedState = FocusPreviousInput.focusPreviousInput({
    ...state,
    flags: SearchFlags.ReplaceExpanded,
    focus: WhenExpression.FocusToggleDetails,
  })
  expect(updatedState.focus).toBe(WhenExpression.FocusSearchReplaceAll)
  expect(updatedState.focusSource).toBe(InputSource.Script)
})

test('focusPreviousInput - from toggle details to regex without replace expanded', () => {
  const state = CreateDefaultState.createDefaultState()
  const updatedState = FocusPreviousInput.focusPreviousInput({
    ...state,
    flags: 0,
    focus: WhenExpression.FocusToggleDetails,
  })
  expect(updatedState.focus).toBe(WhenExpression.FocusSearchRegex)
  expect(updatedState.focusSource).toBe(InputSource.Script)
})

test('focusPreviousInput - from open editors to include input', () => {
  const state = CreateDefaultState.createDefaultState()
  const updatedState = FocusPreviousInput.focusPreviousInput({
    ...state,
    flags: 0,
    focus: WhenExpression.FocusSearchOpenEditors,
  })
  expect(updatedState.focus).toBe(WhenExpression.FocusSearchIncludeInput)
  expect(updatedState.focusSource).toBe(InputSource.Script)
})

test('focusPreviousInput - from exclude input to open editors', () => {
  const state = CreateDefaultState.createDefaultState()
  const updatedState = FocusPreviousInput.focusPreviousInput({
    ...state,
    flags: 0,
    focus: WhenExpression.FocusSearchExcludeInput,
  })
  expect(updatedState.focus).toBe(WhenExpression.FocusSearchOpenEditors)
  expect(updatedState.focusSource).toBe(InputSource.Script)
})

test('focusPreviousInput - from ignore files to exclude input', () => {
  const state = CreateDefaultState.createDefaultState()
  const updatedState = FocusPreviousInput.focusPreviousInput({
    ...state,
    flags: 0,
    focus: WhenExpression.FocusIgnoreFiles,
  })
  expect(updatedState.focus).toBe(WhenExpression.FocusSearchExcludeInput)
  expect(updatedState.focusSource).toBe(InputSource.Script)
})

test('focusPreviousInput - from include input to toggle details', () => {
  const state = CreateDefaultState.createDefaultState()
  const updatedState = FocusPreviousInput.focusPreviousInput({
    ...state,
    flags: 0,
    focus: WhenExpression.FocusSearchIncludeInput,
  })
  expect(updatedState.focus).toBe(WhenExpression.FocusToggleDetails)
  expect(updatedState.focusSource).toBe(InputSource.Script)
})

test('focusPreviousInput - preserves other state properties', () => {
  const state = CreateDefaultState.createDefaultState()
  const updatedState = FocusPreviousInput.focusPreviousInput({
    ...state,
    flags: 0,
    focus: WhenExpression.FocusSearchInput,
    replacement: 'replace',
    value: 'test',
  })
  expect(updatedState.value).toBe('test')
  expect(updatedState.replacement).toBe('replace')
  expect(updatedState.focusSource).toBe(InputSource.Script)
})

test('focusPreviousInput - returns same focus for unknown focus value', () => {
  const state = CreateDefaultState.createDefaultState()
  const updatedState = FocusPreviousInput.focusPreviousInput({
    ...state,
    flags: 0,
    focus: -1,
  })
  expect(updatedState.focus).toBe(-1)
  expect(updatedState.focusSource).toBe(InputSource.Script)
})
