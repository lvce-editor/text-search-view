import { focusPreviousPage as focusPreviousListPage } from '@lvce-editor/list'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as ApplyListOperation from '../ApplyListOperation/ApplyListOperation.ts'

export const focusPreviousPage = async (state: SearchState): Promise<SearchState> => {
  return ApplyListOperation.applyListOperation(state, focusPreviousListPage)
}
