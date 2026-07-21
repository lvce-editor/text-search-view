import type { SearchState } from '../SearchState/SearchState.ts'
import { removeIndex } from '../RemoveIndex/RemoveIndex.ts'

export const dismissItem = (state: SearchState): Promise<SearchState> => {
  const { focusedIndex, listFocusedIndex } = state
  const actualIndex = listFocusedIndex === -1 ? focusedIndex : listFocusedIndex
  return removeIndex(state, actualIndex)
}
