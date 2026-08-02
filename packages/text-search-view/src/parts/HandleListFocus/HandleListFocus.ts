import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import type { SearchState } from '../SearchState/SearchState.ts'

export const handleListFocus = async (state: SearchState): Promise<SearchState> => {
  const { focus, listFocused } = state
  if (focus === WhenExpression.FocusSearchResults && listFocused) {
    return state
  }
  return {
    ...state,
    focus: WhenExpression.FocusSearchResults,
    listFocused: true,
  }
}
