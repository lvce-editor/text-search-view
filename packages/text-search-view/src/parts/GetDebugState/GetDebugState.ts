import type { SearchState } from '../SearchState/SearchState.ts'

const debugState = {
  beforeReplacement: undefined as unknown,
}

const getDebugState = (state: SearchState): unknown => {
  const { deltaY, fileCount, focusedIndex, items, listFocusedIndex, listItems, matchCount, maxLineY, message, minLineY, replacement, searchId } =
    state
  const actualIndex = focusedIndex === -1 ? listFocusedIndex : focusedIndex
  const actualItem = focusedIndex === -1 ? listItems[listFocusedIndex] : items[focusedIndex]
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

export const captureBeforeReplacement = (state: SearchState): SearchState => {
  debugState.beforeReplacement = getDebugState(state)
  return state
}

export const assertReplacementCompleted = (state: SearchState): SearchState => {
  const { message } = state
  if (message === "Replaced 1 occurrence across 1 file with 'd'") {
    return state
  }
  throw new Error(
    `File replacement state mismatch. Before: ${JSON.stringify(debugState.beforeReplacement)}. After: ${JSON.stringify(getDebugState(state))}`,
  )
}
