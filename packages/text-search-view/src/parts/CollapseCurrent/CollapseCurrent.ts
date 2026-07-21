import type { SearchState } from '../SearchState/SearchState.ts'
import * as ApplyCollapsedPaths from '../ApplyCollapsedPaths/ApplyCollapsedPaths.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

export const collapseCurrent = async (state: SearchState): Promise<SearchState> => {
  const { collapsedPaths, focusedIndex, listFocusedIndex, listItems } = state
  const actualIndex = focusedIndex === -1 ? listFocusedIndex : focusedIndex
  if (actualIndex === -1) {
    return state
  }
  const item = listItems[actualIndex]
  if (!item || item.type !== TextSearchResultType.File) {
    return state
  }
  if (collapsedPaths.includes(item.text)) {
    return state
  }
  return ApplyCollapsedPaths.applyCollapsedPaths(state, [...collapsedPaths, item.text], actualIndex)
}
