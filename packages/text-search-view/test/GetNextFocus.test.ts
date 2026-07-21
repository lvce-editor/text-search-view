import { expect, test } from '@jest/globals'
import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import * as GetNextFocus from '../src/parts/GetNextFocus/GetNextFocus.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

test('getNextFocus - from search input with replace expanded', () => {
  const focus = WhenExpression.FocusSearchInput
  const flags = SearchFlags.ReplaceExpanded
  expect(GetNextFocus.getNextFocus(focus, flags)).toBe(WhenExpression.FocusSearchReplaceInput)
})

test('getNextFocus - from search input without replace expanded', () => {
  const focus = WhenExpression.FocusSearchInput
  const flags = 0
  expect(GetNextFocus.getNextFocus(focus, flags)).toBe(WhenExpression.FocusSearchMatchCase)
})

test('getNextFocus - from replace input', () => {
  const focus = WhenExpression.FocusSearchReplaceInput
  const flags = SearchFlags.ReplaceExpanded
  expect(GetNextFocus.getNextFocus(focus, flags)).toBe(WhenExpression.FocusSearchMatchCase)
})

test('getNextFocus - from match case', () => {
  const focus = WhenExpression.FocusSearchMatchCase
  const flags = 0
  expect(GetNextFocus.getNextFocus(focus, flags)).toBe(WhenExpression.FocusSearchWholeWord)
})

test('getNextFocus - from whole word', () => {
  const focus = WhenExpression.FocusSearchWholeWord
  const flags = 0
  expect(GetNextFocus.getNextFocus(focus, flags)).toBe(WhenExpression.FocusSearchRegex)
})

test('getNextFocus - from regex with replace expanded', () => {
  const focus = WhenExpression.FocusSearchRegex
  const flags = SearchFlags.ReplaceExpanded
  expect(GetNextFocus.getNextFocus(focus, flags)).toBe(WhenExpression.FocusSearchPreserveCase)
})

test('getNextFocus - from regex without replace expanded', () => {
  const focus = WhenExpression.FocusSearchRegex
  const flags = 0
  expect(GetNextFocus.getNextFocus(focus, flags)).toBe(WhenExpression.FocusToggleDetails)
})

test('getNextFocus - from preserve case', () => {
  const focus = WhenExpression.FocusSearchPreserveCase
  const flags = SearchFlags.ReplaceExpanded
  expect(GetNextFocus.getNextFocus(focus, flags)).toBe(WhenExpression.FocusSearchReplaceAll)
})

test('getNextFocus - from replace all', () => {
  const focus = WhenExpression.FocusSearchReplaceAll
  const flags = SearchFlags.ReplaceExpanded
  expect(GetNextFocus.getNextFocus(focus, flags)).toBe(WhenExpression.FocusToggleDetails)
})

test('getNextFocus - from include input', () => {
  const focus = WhenExpression.FocusSearchIncludeInput
  const flags = 0
  expect(GetNextFocus.getNextFocus(focus, flags)).toBe(WhenExpression.FocusSearchOpenEditors)
})

test('getNextFocus - from open editors', () => {
  const focus = WhenExpression.FocusSearchOpenEditors
  const flags = 0
  expect(GetNextFocus.getNextFocus(focus, flags)).toBe(WhenExpression.FocusSearchExcludeInput)
})

test('getNextFocus - from exclude input', () => {
  const focus = WhenExpression.FocusSearchExcludeInput
  const flags = 0
  expect(GetNextFocus.getNextFocus(focus, flags)).toBe(WhenExpression.FocusIgnoreFiles)
})

test('getNextFocus - from toggle details with details expanded', () => {
  const focus = WhenExpression.FocusToggleDetails
  const flags = SearchFlags.DetailsExpanded
  expect(GetNextFocus.getNextFocus(focus, flags)).toBe(WhenExpression.FocusSearchIncludeInput)
})

test('getNextFocus - from toggle details with details collapsed', () => {
  const focus = WhenExpression.FocusToggleDetails
  const flags = 0
  expect(GetNextFocus.getNextFocus(focus, flags)).toBe(WhenExpression.FocusSearchResults)
})

test('getNextFocus - from ignore files', () => {
  const focus = WhenExpression.FocusIgnoreFiles
  const flags = 0
  expect(GetNextFocus.getNextFocus(focus, flags)).toBe(WhenExpression.FocusSearchResults)
})

test('getNextFocus - default case returns same focus', () => {
  const focus = -1
  const flags = 0
  expect(GetNextFocus.getNextFocus(focus, flags)).toBe(focus)
})
