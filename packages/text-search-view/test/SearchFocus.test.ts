import { expect, test } from '@jest/globals'
import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'
import * as SearchFocus from '../src/parts/SearchFocus/SearchFocus.ts'

test('focusSearchValueNext - without replace expanded', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    flags: 0,
  }

  const result = SearchFocus.focusSearchValueNext(state)
  expect(result.focus).toBe(WhenExpression.FocusSearchMatchCase)
})

test('focusSearchValueNext - with replace expanded', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    flags: SearchFlags.ReplaceExpanded,
  }

  const result = SearchFocus.focusSearchValueNext(state)
  expect(result.focus).toBe(WhenExpression.FocusSearchReplaceInput)
})

test('focusMatchCasePrevious - with replace expanded', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    flags: SearchFlags.ReplaceExpanded,
  }

  const result = SearchFocus.focusMatchCasePrevious(state)
  expect(result.focus).toBe(WhenExpression.FocusSearchReplaceInput)
})

test('focusMatchCasePrevious - without replace expanded', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    flags: 0,
  }

  const result = SearchFocus.focusMatchCasePrevious(state)
  expect(result.focus).toBe(WhenExpression.FocusSearchInput)
})

test('focusReplaceValueNext', () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  const result = SearchFocus.focusReplaceValueNext(state)
  expect(result.focus).toBe(WhenExpression.FocusSearchMatchCase)
})

test('focusSearchValue', () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  const result = SearchFocus.focusSearchValue(state)
  expect(result.focus).toBe(WhenExpression.FocusSearchInput)
  expect(result.focusSource).toBe(InputSource.Script)
})

test('focusReplaceValuePrevious', () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  const result = SearchFocus.focusReplaceValuePrevious(state)
  expect(result.focus).toBe(WhenExpression.FocusSearchInput)
  expect(result.focusSource).toBe(InputSource.Script)
})

test('focusRegexNext', () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  const result = SearchFocus.focusRegexNext(state)
  expect(result.focus).toBe(WhenExpression.FocusSearchPreserveCase)
  expect(result.focusSource).toBe(InputSource.Script)
})

test('focusPreserveCasePrevious', () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  const result = SearchFocus.focusPreserveCasePrevious(state)
  expect(result.focus).toBe(WhenExpression.FocusSearchRegex)
  expect(result.focusSource).toBe(InputSource.Script)
})

test('focusReplaceValue', () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  const result = SearchFocus.focusReplaceValue(state)
  expect(result.focus).toBe(WhenExpression.FocusSearchReplaceInput)
  expect(result.focusSource).toBe(InputSource.Script)
})

test('focusMatchCase', () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  const result = SearchFocus.focusMatchCase(state)
  expect(result.focus).toBe(WhenExpression.FocusSearchMatchCase)
  expect(result.focusSource).toBe(InputSource.Script)
})

test('focusPreserveCase', () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  const result = SearchFocus.focusPreserveCase(state)
  expect(result.focus).toBe(WhenExpression.FocusSearchPreserveCase)
  expect(result.focusSource).toBe(InputSource.Script)
})

test('focusMatchWholeWord', () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  const result = SearchFocus.focusMatchWholeWord(state)
  expect(result.focus).toBe(WhenExpression.FocusSearchWholeWord)
  expect(result.focusSource).toBe(InputSource.Script)
})

test('focusRegex', () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  const result = SearchFocus.focusRegex(state)
  expect(result.focus).toBe(WhenExpression.FocusSearchRegex)
  expect(result.focusSource).toBe(InputSource.Script)
})

test('focusReplaceAll', () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  const result = SearchFocus.focusReplaceAll(state)
  expect(result.focus).toBe(WhenExpression.FocusSearchReplaceAll)
  expect(result.focusSource).toBe(InputSource.Script)
})

test('handleFocusIn - SearchValue', async () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  const result = await SearchFocus.handleFocusIn(state, InputName.SearchValue)
  expect(result.focus).toBe(WhenExpression.FocusSearchInput)
  expect(result.focusSource).toBe(InputSource.User)
})

test('handleFocusIn - ReplaceValue', async () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  const result = await SearchFocus.handleFocusIn(state, InputName.ReplaceValue)
  expect(result.focus).toBe(WhenExpression.FocusSearchReplaceInput)
  expect(result.focusSource).toBe(InputSource.User)
})

test('handleFocusIn - MatchCase', async () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  const result = await SearchFocus.handleFocusIn(state, InputName.MatchCase)
  expect(result.focus).toBe(WhenExpression.FocusSearchMatchCase)
  expect(result.focusSource).toBe(InputSource.User)
})

test('handleFocusIn - MatchWholeWord', async () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  const result = await SearchFocus.handleFocusIn(state, InputName.MatchWholeWord)
  expect(result.focus).toBe(WhenExpression.FocusSearchWholeWord)
  expect(result.focusSource).toBe(InputSource.User)
})

test('handleFocusIn - UseRegularExpression', async () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  const result = await SearchFocus.handleFocusIn(state, InputName.UseRegularExpression)
  expect(result.focus).toBe(WhenExpression.FocusSearchRegex)
  expect(result.focusSource).toBe(InputSource.User)
})

test('handleFocusIn - PreserveCase', async () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  const result = await SearchFocus.handleFocusIn(state, InputName.PreserveCase)
  expect(result.focus).toBe(WhenExpression.FocusSearchPreserveCase)
  expect(result.focusSource).toBe(InputSource.User)
})

test('handleFocusIn - ReplaceAll', async () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  const result = await SearchFocus.handleFocusIn(state, InputName.ReplaceAll)
  expect(result.focus).toBe(WhenExpression.FocusSearchReplaceAll)
  expect(result.focusSource).toBe(InputSource.User)
})

test('handleFocusIn - ToggleSearchDetails', async () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  const result = await SearchFocus.handleFocusIn(state, InputName.ToggleSearchDetails)
  expect(result.focus).toBe(WhenExpression.FocusToggleDetails)
  expect(result.focusSource).toBe(InputSource.User)
})

test('handleFocusIn - FilesToInclude', async () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  const result = await SearchFocus.handleFocusIn(state, InputName.FilesToInclude)
  expect(result.focus).toBe(WhenExpression.FocusSearchIncludeInput)
  expect(result.focusSource).toBe(InputSource.User)
})

test('handleFocusIn - FilesToExclude', async () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  const result = await SearchFocus.handleFocusIn(state, InputName.FilesToExclude)
  expect(result.focus).toBe(WhenExpression.FocusSearchExcludeInput)
  expect(result.focusSource).toBe(InputSource.User)
})

test('handleFocusIn - SearchOnlyOpenEditors', async () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  const result = await SearchFocus.handleFocusIn(state, InputName.SearchOnlyOpenEditors)
  expect(result.focus).toBe(WhenExpression.FocusSearchOpenEditors)
  expect(result.focusSource).toBe(InputSource.User)
})

test('handleFocusIn - UseExcludeSettings', async () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  const result = await SearchFocus.handleFocusIn(state, InputName.UseExcludeSettings)
  expect(result.focus).toBe(WhenExpression.FocusIgnoreFiles)
  expect(result.focusSource).toBe(InputSource.User)
})

test('handleFocusIn - ToggleReplace', async () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  const result = await SearchFocus.handleFocusIn(state, InputName.ToggleReplace)
  expect(result.focus).toBe(WhenExpression.FocusToggleReplace)
  expect(result.focusSource).toBe(InputSource.User)
})

test('handleFocusIn - unknown input name', async () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  const result = await SearchFocus.handleFocusIn(state, 'UnknownInput')
  expect(result.focus).toBe(WhenExpression.Empty)
  expect(result.focusSource).toBe(InputSource.User)
})

test('handleFocusIn - same focus key returns unchanged state', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    focus: WhenExpression.FocusSearchInput,
  }

  const result = await SearchFocus.handleFocusIn(state, InputName.SearchValue)
  expect(result).toBe(state)
})
