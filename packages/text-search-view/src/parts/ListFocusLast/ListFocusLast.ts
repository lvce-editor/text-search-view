import { focusLast as focusLastListItem } from '@lvce-editor/list'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as ApplyListOperation from '../ApplyListOperation/ApplyListOperation.ts'

export const focusLast = async (state: SearchState): Promise<SearchState> => {
  return ApplyListOperation.applyListOperation(state, focusLastListItem)
}
