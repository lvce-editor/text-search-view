import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import type { SearchState } from '../SearchState/SearchState.ts'

export const focusSearchValue = async (state: SearchState): Promise<SearchState> => {
  return {
    ...state,
    focus: WhenExpression.FocusSearchInput,
  }
}
