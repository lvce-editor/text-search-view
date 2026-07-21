import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'

export const getSearchPlaceholder = (focus: number): string => {
  if (focus === WhenExpression.FocusSearchInput) {
    return SearchStrings.searchForHistory()
  }
  return SearchStrings.search()
}
