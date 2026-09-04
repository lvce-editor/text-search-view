import { handleWheel as handleListWheel } from '@lvce-editor/list'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as ApplyListOperation from '../ApplyListOperation/ApplyListOperation.ts'

export const handleWheel = async (state: SearchState, deltaMode: number, deltaY: number): Promise<SearchState> => {
  return ApplyListOperation.applyListOperation(state, (listState) => handleListWheel(listState, deltaMode, deltaY))
}
