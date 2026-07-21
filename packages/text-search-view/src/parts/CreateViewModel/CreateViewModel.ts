import type { SearchState } from '../SearchState/SearchState.ts'
import type { ViewModel } from '../ViewModel/ViewModel.ts'
import * as GetSearchDisplayResults from '../GetSearchDisplayResults/GetSearchDisplayResults.ts'
import * as ScrollBarFunctions from '../ScrollBarFunctions/ScrollBarFunctions.ts'

export const createViewModel = (state: SearchState): ViewModel => {
  // TODO add viewmodel to state, not needing to have separate states and making it easier to compare
  // visible items in diff
  const {
    collapsedPaths,
    deltaY,
    fileCount,
    finalDeltaY,
    flags,
    focus,
    headerHeight,
    height,
    icons,
    itemHeight,
    items,
    listFocused,
    listFocusedIndex,
    listItems,
    matchCount,
    maxLineY,
    message,
    minLineY,
    renderFolderPaths,
    replacement,
    scrollBarHeight,
    searchInputErrorMessage,
    value,
  } = state
  const displayResults = GetSearchDisplayResults.getDisplayResults(
    listItems,
    itemHeight,
    fileCount,
    value,
    minLineY,
    maxLineY,
    replacement,
    icons,
    listFocusedIndex,
    collapsedPaths,
    renderFolderPaths || false,
    items,
  )
  const focusOutline = listFocused && listFocusedIndex === -1
  const scrollBarValue = finalDeltaY === 0 ? 0 : (deltaY / finalDeltaY) * 100
  const scrollBarY = finalDeltaY === 0 ? 0 : ScrollBarFunctions.getScrollBarY(deltaY, finalDeltaY, height - headerHeight, scrollBarHeight)
  return {
    deltaY,
    displayResults,
    flags,
    focus,
    focusOutline,
    itemHeight,
    matchCount,
    message,
    scrollBarHeight,
    scrollBarValue,
    scrollBarY,
    searchInputErrorMessage,
  }
}
