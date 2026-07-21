import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetSelectHandler from '../GetSelectHandler/GetSelectHandler.ts'

export const selectIndex = async (state: SearchState, index: number): Promise<SearchState> => {
  if (index === -1) {
    return {
      ...state,
      listFocused: true,
      listFocusedIndex: -1,
    }
  }
  const { listItems } = state
  const searchResult = listItems[index]
  const fn = GetSelectHandler.getSelectHandler(searchResult.type)
  return fn(state, searchResult, index)
}
