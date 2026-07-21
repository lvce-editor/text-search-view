import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import * as InputName from '../InputName/InputName.ts'

export const getSearchFocusKey = (key: string): number => {
  switch (key) {
    case InputName.FilesToExclude:
      return WhenExpression.FocusSearchExcludeInput
    case InputName.FilesToInclude:
      return WhenExpression.FocusSearchIncludeInput
    case InputName.MatchCase:
      return WhenExpression.FocusSearchMatchCase
    case InputName.MatchWholeWord:
      return WhenExpression.FocusSearchWholeWord
    case InputName.PreserveCase:
      return WhenExpression.FocusSearchPreserveCase
    case InputName.ReplaceAll:
      return WhenExpression.FocusSearchReplaceAll
    case InputName.ReplaceValue:
      return WhenExpression.FocusSearchReplaceInput
    case InputName.SearchOnlyOpenEditors:
      return WhenExpression.FocusSearchOpenEditors
    case InputName.SearchValue:
      return WhenExpression.FocusSearchInput
    case InputName.ToggleReplace:
      return WhenExpression.FocusToggleReplace
    case InputName.ToggleSearchDetails:
      return WhenExpression.FocusToggleDetails
    case InputName.UseExcludeSettings:
      return WhenExpression.FocusIgnoreFiles
    case InputName.UseRegularExpression:
      return WhenExpression.FocusSearchRegex
    default:
      return WhenExpression.Empty
  }
}
