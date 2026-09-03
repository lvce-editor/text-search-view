import { handleScrollBarClick as handleListScrollBarClick } from '@lvce-editor/list'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as ApplyListOperation from '../ApplyListOperation/ApplyListOperation.ts'

export const handleScrollBarClick = async (state: SearchState, eventY: number): Promise<SearchState> => {
  return ApplyListOperation.applyListOperation(state, (listState) => handleListScrollBarClick(listState, eventY))
}
