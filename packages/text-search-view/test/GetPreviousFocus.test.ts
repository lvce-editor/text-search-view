import { expect, test } from '@jest/globals'
import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import * as GetPreviousFocus from '../src/parts/GetPreviousFocus/GetPreviousFocus.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

test('getPreviousFocus - from match case to search input without replace expanded', () => {
  const result = GetPreviousFocus.getPreviousFocus(WhenExpression.FocusSearchMatchCase, 0)
  expect(result).toBe(WhenExpression.FocusSearchInput)
})

test('getPreviousFocus - from match case to replace input with replace expanded', () => {
  const result = GetPreviousFocus.getPreviousFocus(WhenExpression.FocusSearchMatchCase, SearchFlags.ReplaceExpanded)
  expect(result).toBe(WhenExpression.FocusSearchReplaceInput)
})

test('getPreviousFocus - from whole word to match case', () => {
  const result = GetPreviousFocus.getPreviousFocus(WhenExpression.FocusSearchWholeWord, 0)
  expect(result).toBe(WhenExpression.FocusSearchMatchCase)
})

test('getPreviousFocus - from regex to whole word', () => {
  const result = GetPreviousFocus.getPreviousFocus(WhenExpression.FocusSearchRegex, 0)
  expect(result).toBe(WhenExpression.FocusSearchWholeWord)
})

test('getPreviousFocus - from preserve case to regex', () => {
  const result = GetPreviousFocus.getPreviousFocus(WhenExpression.FocusSearchPreserveCase, 0)
  expect(result).toBe(WhenExpression.FocusSearchRegex)
})

test('getPreviousFocus - from replace input to search input', () => {
  const result = GetPreviousFocus.getPreviousFocus(WhenExpression.FocusSearchReplaceInput, 0)
  expect(result).toBe(WhenExpression.FocusSearchInput)
})

test('getPreviousFocus - from replace all to preserve case', () => {
  const result = GetPreviousFocus.getPreviousFocus(WhenExpression.FocusSearchReplaceAll, 0)
  expect(result).toBe(WhenExpression.FocusSearchPreserveCase)
})

test('getPreviousFocus - from toggle details to replace all with replace expanded', () => {
  const result = GetPreviousFocus.getPreviousFocus(WhenExpression.FocusToggleDetails, SearchFlags.ReplaceExpanded)
  expect(result).toBe(WhenExpression.FocusSearchReplaceAll)
})

test('getPreviousFocus - from toggle details to regex without replace expanded', () => {
  const result = GetPreviousFocus.getPreviousFocus(WhenExpression.FocusToggleDetails, 0)
  expect(result).toBe(WhenExpression.FocusSearchRegex)
})

test('getPreviousFocus - from open editors to include input', () => {
  const result = GetPreviousFocus.getPreviousFocus(WhenExpression.FocusSearchOpenEditors, 0)
  expect(result).toBe(WhenExpression.FocusSearchIncludeInput)
})

test('getPreviousFocus - from exclude input to open editors', () => {
  const result = GetPreviousFocus.getPreviousFocus(WhenExpression.FocusSearchExcludeInput, 0)
  expect(result).toBe(WhenExpression.FocusSearchOpenEditors)
})

test('getPreviousFocus - from ignore files to exclude input', () => {
  const result = GetPreviousFocus.getPreviousFocus(WhenExpression.FocusIgnoreFiles, 0)
  expect(result).toBe(WhenExpression.FocusSearchExcludeInput)
})

test('getPreviousFocus - returns same focus for unknown focus value', () => {
  const result = GetPreviousFocus.getPreviousFocus(-1, 0)
  expect(result).toBe(-1)
})
