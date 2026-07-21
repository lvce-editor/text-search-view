import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const clearSearchResults = (state: SearchState): SearchState => {
  return {
    ...state,
    focus: WhenExpression.FocusSearchInput,
    focusSource: InputSource.Script,
    inputSource: InputSource.Script,
    items: [],
    limitHit: false,
    limitHitWarning: '',
    maxLineY: 0,
    message: '',
    minLineY: 0,
    replacement: '',
    searchInputErrorMessage: '',
    value: '',
  }
}
