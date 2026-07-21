import type { SearchResult } from '../SearchResult/SearchResult.ts'
import * as Arrays from '../Arrays/Arrays.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

interface RemoveIndices {
  newFileCount: number
  newFocusedIndex: number
  newMatchCount: number
  removeCount: number
  startIndex: number
}

const getSetSize = (items: readonly SearchResult[], index: number): number => {
  let setSize = 0
  for (let i = index + 1; i < items.length; i++) {
    if (items[i].type === TextSearchResultType.File) {
      break
    }
    setSize++
  }
  return setSize
}

const getRemoveIndicesFile = (
  items: readonly SearchResult[],
  item: SearchResult,
  index: number,
  matchCount: number,
  fileCount: number,
): RemoveIndices => {
  const setSize = getSetSize(items, index)
  return {
    newFileCount: fileCount - 1,
    newFocusedIndex: index + setSize + 1 < items.length ? index : index - 1,
    newMatchCount: matchCount - setSize,
    removeCount: setSize + 1,
    startIndex: index,
  }
}

const getRemoveIndicesMatch = (items: readonly SearchResult[], index: number, matchCount: number, fileCount: number): RemoveIndices => {
  for (let i = index; i >= 0; i--) {
    if (items[i].type === TextSearchResultType.File) {
      const setSize = getSetSize(items, i)
      if (setSize === 1) {
        return {
          newFileCount: fileCount - 1,
          newFocusedIndex: i - 1,
          newMatchCount: matchCount - 1,
          removeCount: 2,
          startIndex: i,
        }
      }
      return {
        newFileCount: fileCount,
        newFocusedIndex: index,
        newMatchCount: matchCount - 1,
        removeCount: 1,
        startIndex: index,
      }
    }
  }
  throw new Error('could not compute indices to remove')
}

const getRemoveIndices = (items: readonly SearchResult[], index: number, matchCount: number, fileCount: number): RemoveIndices => {
  const item = items[index]
  switch (item.type) {
    case TextSearchResultType.File:
      return getRemoveIndicesFile(items, item, index, matchCount, fileCount)
    case TextSearchResultType.Match:
      return getRemoveIndicesMatch(items, index, matchCount, fileCount)
    default:
      throw new Error('unknown search result type')
  }
}

export const removeItemFromItems = (items: readonly SearchResult[], index: number, matchCount: number, fileCount: number): any => {
  const { newFileCount, newFocusedIndex, newMatchCount, removeCount, startIndex } = getRemoveIndices(items, index, matchCount, fileCount)
  const newItems = Arrays.remove(items, startIndex, removeCount)
  return {
    newFileCount,
    newFocusedIndex,
    newItems,
    newMatchCount,
  }
}
