import type { SearchState } from '../SearchState/SearchState.ts'

export const getDebugState = (state: SearchState): unknown => {
  const { deltaY, fileCount, focusedIndex, items, listFocusedIndex, listItems, matchCount, maxLineY, message, minLineY, replacement, searchId } =
    state
  const actualIndex = focusedIndex === -1 ? listFocusedIndex : focusedIndex
  const actualItem = items[actualIndex]
  return {
    actualIndex,
    actualItem,
    deltaY,
    fileCount,
    focusedIndex,
    itemsLength: items.length,
    listFocusedIndex,
    listItemsLength: listItems.length,
    matchCount,
    maxLineY,
    message,
    minLineY,
    replacement,
    searchId,
  }
}
