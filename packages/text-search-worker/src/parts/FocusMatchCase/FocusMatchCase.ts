import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import type { SearchState } from '../SearchState/SearchState.ts'

export const focusMatchCase = (state: SearchState): SearchState => {
  return { ...state, focus: WhenExpression.FocusSearchMatchCase }
}
