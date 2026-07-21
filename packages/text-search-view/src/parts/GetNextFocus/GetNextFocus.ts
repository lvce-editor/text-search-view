import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import { ReplaceExpanded, DetailsExpanded } from '../SearchFlags/SearchFlags.ts'

export const getNextFocus = (focus: number, flags: number): number => {
  switch (focus) {
    case WhenExpression.FocusIgnoreFiles:
      return WhenExpression.FocusSearchResults
    case WhenExpression.FocusSearchExcludeInput:
      return WhenExpression.FocusIgnoreFiles
    case WhenExpression.FocusSearchIncludeInput:
      return WhenExpression.FocusSearchOpenEditors
    case WhenExpression.FocusSearchInput:
      if (flags & ReplaceExpanded) {
        return WhenExpression.FocusSearchReplaceInput
      }
      return WhenExpression.FocusSearchMatchCase
    case WhenExpression.FocusSearchMatchCase:
      return WhenExpression.FocusSearchWholeWord
    case WhenExpression.FocusSearchOpenEditors:
      return WhenExpression.FocusSearchExcludeInput
    case WhenExpression.FocusSearchPreserveCase:
      return WhenExpression.FocusSearchReplaceAll
    case WhenExpression.FocusSearchRegex:
      if (flags & ReplaceExpanded) {
        return WhenExpression.FocusSearchPreserveCase
      }
      return WhenExpression.FocusToggleDetails
    case WhenExpression.FocusSearchReplaceAll:
      return WhenExpression.FocusToggleDetails
    case WhenExpression.FocusSearchReplaceInput:
      return WhenExpression.FocusSearchMatchCase
    case WhenExpression.FocusSearchWholeWord:
      return WhenExpression.FocusSearchRegex
    case WhenExpression.FocusToggleDetails:
      if (flags & DetailsExpanded) {
        return WhenExpression.FocusSearchIncludeInput
      }
      return WhenExpression.FocusSearchResults
    case WhenExpression.FocusToggleReplace:
      return WhenExpression.FocusSearchInput
    default:
      return focus
  }
}
