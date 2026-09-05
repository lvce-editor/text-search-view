import { focusIndex as focusListIndex } from '@lvce-editor/list'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as ApplyListOperation from '../ApplyListOperation/ApplyListOperation.ts'

export const focusIndex = async (state: SearchState, index: number): Promise<SearchState> => {
  return ApplyListOperation.applyListOperation(state, (listState) => focusListIndex(listState, index))
}
