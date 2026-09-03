import { handleScrollBarMove as handleListScrollBarMove } from '@lvce-editor/list'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as ApplyListOperation from '../ApplyListOperation/ApplyListOperation.ts'

export const handleScrollBarMove = async (state: SearchState, eventY: number): Promise<SearchState> => {
  return ApplyListOperation.applyListOperation(state, (listState) => handleListScrollBarMove(listState, eventY))
}
