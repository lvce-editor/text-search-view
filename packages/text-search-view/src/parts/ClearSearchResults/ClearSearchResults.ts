import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as SearchMessageHeight from '../SearchMessageHeight/SearchMessageHeight.ts'

export const clearSearchResults = (state: SearchState): SearchState => {
  const { headerHeight: oldHeaderHeight, messageHeight: oldMessageHeight } = state
  const headerHeight = oldHeaderHeight + SearchMessageHeight.Minimum - oldMessageHeight
  return {
    ...state,
    focus: WhenExpression.FocusSearchInput,
    focusSource: InputSource.Script,
    headerHeight,
    inputSource: InputSource.Script,
    items: [],
    limitHit: false,
    limitHitWarning: '',
    maxLineY: 0,
    message: '',
    messageHeight: SearchMessageHeight.Minimum,
    minLineY: 0,
    replacement: '',
    searchInputErrorMessage: '',
    value: '',
  }
}
