import type { SearchState } from '../SearchState/SearchState.ts'
import { writeText } from '../ClipBoard/ClipBoard.ts'

export const copy = async (state: SearchState): Promise<SearchState> => {
  const { focusedIndex, items } = state
  if (focusedIndex === -1) {
    return state
  }
  const item = items[focusedIndex]
  await writeText(item.text)
  return state
}
