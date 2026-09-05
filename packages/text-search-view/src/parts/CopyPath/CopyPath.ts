import type { SearchState } from '../SearchState/SearchState.ts'
import { writeText } from '../ClipBoard/ClipBoard.ts'

export const copyPath = async (state: SearchState): Promise<SearchState> => {
  const { focusedIndex, items, listFocusedIndex } = state
  const actualIndex = focusedIndex === -1 ? listFocusedIndex : focusedIndex
  if (actualIndex === -1) {
    return state
  }
  const item = items[actualIndex]
  await writeText(item.text)
  return state
}
