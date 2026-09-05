import type { SearchState } from '../SearchState/SearchState.ts'
import * as UpdateVisibleFileIcons from '../UpdateVisibleFileIcons/UpdateVisibleFileIcons.ts'

export type ListOperation = (state: SearchState) => SearchState

export const applyListOperation = async (state: SearchState, operation: ListOperation): Promise<SearchState> => {
  const { items, listItems } = state
  const listState = {
    ...state,
    items: listItems,
  }
  const updatedListState = operation(listState)
  if (updatedListState === listState) {
    return state
  }
  const updatedState = {
    ...updatedListState,
    items,
  }
  return UpdateVisibleFileIcons.updateVisibleFileIconsWhenRangeChanges(state, updatedState)
}
