import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import { ReplaceExpanded } from '../SearchFlags/SearchFlags.ts'

export const getPreviousFocus = (focus: number, flags: number): number => {
  switch (focus) {
    case WhenExpression.FocusIgnoreFiles:
      return WhenExpression.FocusSearchExcludeInput
    case WhenExpression.FocusSearchExcludeInput:
      return WhenExpression.FocusSearchOpenEditors
    case WhenExpression.FocusSearchIncludeInput:
      return WhenExpression.FocusToggleDetails
    case WhenExpression.FocusSearchInput:
      return WhenExpression.FocusToggleReplace
    case WhenExpression.FocusSearchMatchCase:
      if (flags & ReplaceExpanded) {
        return WhenExpression.FocusSearchReplaceInput
      }
      return WhenExpression.FocusSearchInput
    case WhenExpression.FocusSearchOpenEditors:
      return WhenExpression.FocusSearchIncludeInput
    case WhenExpression.FocusSearchPreserveCase:
      return WhenExpression.FocusSearchRegex
    case WhenExpression.FocusSearchRegex:
      return WhenExpression.FocusSearchWholeWord
    case WhenExpression.FocusSearchReplaceAll:
      return WhenExpression.FocusSearchPreserveCase
    case WhenExpression.FocusSearchReplaceInput:
      return WhenExpression.FocusSearchInput
    case WhenExpression.FocusSearchWholeWord:
      return WhenExpression.FocusSearchMatchCase
    case WhenExpression.FocusToggleDetails:
      if (flags & ReplaceExpanded) {
        return WhenExpression.FocusSearchReplaceAll
      }
      return WhenExpression.FocusSearchRegex
    default:
      return focus
  }
}
