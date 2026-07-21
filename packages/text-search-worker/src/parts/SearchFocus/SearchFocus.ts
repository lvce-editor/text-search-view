import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as FocusElement from '../FocusElement/FocusElement.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'

export const focusSearchValue = (state: SearchState): SearchState => {
  return FocusElement.focusElement(state, WhenExpression.FocusSearchInput)
}

export const focusSearchValueNext = (state: SearchState): SearchState => {
  const { flags } = state
  if (flags & SearchFlags.ReplaceExpanded) {
    return focusReplaceValue(state)
  }
  return focusMatchCase(state)
}

export const focusMatchCasePrevious = (state: SearchState): SearchState => {
  const { flags } = state
  if (flags & SearchFlags.ReplaceExpanded) {
    return focusReplaceValue(state)
  }
  return focusSearchValue(state)
}

export const focusReplaceValuePrevious = (state: SearchState): SearchState => {
  return focusSearchValue(state)
}

export const focusReplaceValueNext = (state: SearchState): SearchState => {
  return focusMatchCase(state)
}

export const focusRegexNext = (state: SearchState): SearchState => {
  return focusPreserveCase(state)
}

export const focusPreserveCasePrevious = (state: SearchState): SearchState => {
  return focusRegex(state)
}

export const focusReplaceValue = (state: SearchState): SearchState => {
  return FocusElement.focusElement(state, WhenExpression.FocusSearchReplaceInput)
}

export const focusMatchCase = (state: SearchState): SearchState => {
  return FocusElement.focusElement(state, WhenExpression.FocusSearchMatchCase)
}

export const focusPreserveCase = (state: SearchState): SearchState => {
  return FocusElement.focusElement(state, WhenExpression.FocusSearchPreserveCase)
}

export const focusMatchWholeWord = (state: SearchState): SearchState => {
  return FocusElement.focusElement(state, WhenExpression.FocusSearchWholeWord)
}

export const focusRegex = (state: SearchState): SearchState => {
  return FocusElement.focusElement(state, WhenExpression.FocusSearchRegex)
}

export const focusReplaceAll = (state: SearchState): SearchState => {
  return FocusElement.focusElement(state, WhenExpression.FocusSearchReplaceAll)
}

export * from '../HandleFocusIn/HandleFocusIn.ts'
