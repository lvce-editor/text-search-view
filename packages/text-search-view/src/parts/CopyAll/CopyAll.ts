import type { SearchResult } from '../SearchResult/SearchResult.ts'
import type { SearchState } from '../SearchState/SearchState.ts'
import { writeText } from '../ClipBoard/ClipBoard.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

const getActualIndex = (state: SearchState): number => {
  const { focusedIndex, listFocusedIndex } = state
  return focusedIndex === -1 ? listFocusedIndex : focusedIndex
}

const getFileIndex = (items: readonly SearchResult[], actualIndex: number): number => {
  if (actualIndex < 0 || actualIndex >= items.length) {
    return -1
  }
  if (items[actualIndex].type === TextSearchResultType.File) {
    return actualIndex
  }
  for (let i = actualIndex; i >= 0; i--) {
    if (items[i].type === TextSearchResultType.File) {
      return i
    }
  }
  return -1
}

const getMatchTexts = (items: readonly SearchResult[], fileIndex: number): readonly string[] => {
  const matchTexts: string[] = []
  for (let i = fileIndex + 1; i < items.length; i++) {
    const item = items[i]
    if (item.type === TextSearchResultType.File) {
      break
    }
    matchTexts.push(item.text)
  }
  return matchTexts
}

export const copyAll = async (state: SearchState): Promise<SearchState> => {
  const { items } = state
  const actualIndex = getActualIndex(state)
  if (actualIndex === -1) {
    return state
  }
  const fileIndex = getFileIndex(items, actualIndex)
  if (fileIndex === -1) {
    return state
  }
  const matchTexts = getMatchTexts(items, fileIndex)
  if (matchTexts.length === 0) {
    return state
  }
  await writeText(matchTexts.join('\n'))
  return state
}
