import type { SearchState } from '../SearchState/SearchState.ts'
import { removeIndex } from '../RemoveIndex/RemoveIndex.ts'

export const removeCurrent = async (state: SearchState): Promise<SearchState> => {
  const { focusedIndex, listFocusedIndex } = state
  const actualIndex = focusedIndex === -1 ? listFocusedIndex : focusedIndex
  if (actualIndex === -1) {
    return state
  }
  return removeIndex(state, actualIndex)
}
