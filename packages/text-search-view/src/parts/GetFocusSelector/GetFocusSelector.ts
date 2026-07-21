import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import * as InputName from '../InputName/InputName.ts'

export const getFocusSelector = (focusKey: number): string => {
  switch (focusKey) {
    case WhenExpression.FocusIgnoreFiles:
      return InputName.UseExcludeSettings
    case WhenExpression.FocusSearchExcludeInput:
      return InputName.FilesToExclude
    case WhenExpression.FocusSearchIncludeInput:
      return InputName.FilesToInclude
    case WhenExpression.FocusSearchInput:
      return InputName.SearchValue
    case WhenExpression.FocusSearchMatchCase:
      return InputName.MatchCase
    case WhenExpression.FocusSearchOpenEditors:
      return InputName.SearchOnlyOpenEditors
    case WhenExpression.FocusSearchPreserveCase:
      return InputName.PreserveCase
    case WhenExpression.FocusSearchRegex:
      return InputName.UseRegularExpression
    case WhenExpression.FocusSearchReplaceAll:
      return InputName.ReplaceAll
    case WhenExpression.FocusSearchReplaceInput:
      return InputName.ReplaceValue
    case WhenExpression.FocusSearchResults:
      return '.Tree'
    case WhenExpression.FocusSearchWholeWord:
      return InputName.MatchWholeWord
    case WhenExpression.FocusToggleDetails:
      return InputName.ToggleSearchDetails
    case WhenExpression.FocusToggleReplace:
      return InputName.ToggleReplace
    default:
      return ''
  }
}
