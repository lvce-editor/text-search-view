import type { AsyncCommandContext } from '@lvce-editor/viewlet-registry'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { SearchResult } from '../SearchResult/SearchResult.ts'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as ApplyBulkReplacement from '../ApplyBulkReplacement/ApplyBulkReplacement.ts'
import * as GetFileIcons from '../GetFileIcons/GetFileIcons.ts'
import { getNewMinMax } from '../GetNewMinMax/GetNewMinMax.ts'
import * as GetReplacedMessage from '../GetReplacedMessage/GetReplacedMessage.ts'
import * as GetReplaceElements from '../GetReplaceElements/GetReplaceElements.ts'
import * as GetReplacingMessage from '../GetReplacingMessage/GetReplacingMessage.ts'
import { removeItemFromItems } from '../RemoveItemFromItems/RemoveItemFromItems.ts'
import * as ScrollBarFunctions from '../ScrollBarFunctions/ScrollBarFunctions.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

const getActualIndex = (state: SearchState): number => {
  const { focusedIndex, listFocusedIndex } = state
  return focusedIndex === -1 ? listFocusedIndex : focusedIndex
}

const getFileIndex = (state: SearchState, actualIndex: number): number => {
  const { items } = state
  if (actualIndex < 0 || actualIndex >= items.length) {
    return -1
  }
  if (items[actualIndex].type === TextSearchResultType.File) {
    return actualIndex
  }
  return -1
}

const getFileItems = (state: SearchState, fileIndex: number): readonly SearchResult[] => {
  const { items } = state
  const fileItems = [items[fileIndex]]
  for (let i = fileIndex + 1; i < items.length; i++) {
    const item = items[i]
    if (item.type === TextSearchResultType.File) {
      break
    }
    fileItems.push(item)
  }
  return fileItems
}

const replaceAllInFocusedFile = async (state: SearchState, fileIndex: number): Promise<SearchState> => {
  const {
    deltaY,
    fileCount,
    fileIconCache,
    headerHeight,
    height,
    itemHeight,
    items,
    matchCount: totalMatchCount,
    maxLineY,
    minimumSliderSize,
    minLineY,
    replacement,
    workspacePath,
  } = state
  const fileItems = getFileItems(state, fileIndex)
  const matchCount = Math.max(fileItems.length - 1, 0)
  if (matchCount === 0) {
    return state
  }
  const bulkEdits = GetReplaceElements.getReplaceElements(fileItems, workspacePath, replacement)
  await ApplyBulkReplacement.applyBulkReplacement(bulkEdits)
  await RendererWorker.handleWorkspaceRefresh()

  const { newFileCount, newFocusedIndex, newItems, newMatchCount } = removeItemFromItems(items, fileIndex, totalMatchCount, fileCount)
  const { newDeltaY, newMaxLineY, newMinLineY } = getNewMinMax(newItems.length, minLineY, maxLineY, deltaY, itemHeight)
  const total = newItems.length
  const contentHeight = total * itemHeight
  const listHeight = height - headerHeight
  const scrollBarHeight = ScrollBarFunctions.getScrollBarSize(height, contentHeight, minimumSliderSize)
  const finalDeltaY = Math.max(contentHeight - listHeight, 0)
  const visible = newItems.slice(0, newMaxLineY)
  const { icons, newFileIconCache } = await GetFileIcons.getFileIcons(visible, fileIconCache)

  return {
    ...state,
    deltaY: newDeltaY,
    fileCount: newFileCount,
    fileIconCache: newFileIconCache,
    finalDeltaY,
    icons,
    items: newItems,
    listFocusedIndex: newFocusedIndex,
    listItems: newItems,
    matchCount: newMatchCount,
    maxLineY: newMaxLineY,
    message: GetReplacedMessage.getReplacedMessage(1, matchCount, replacement),
    minLineY: newMinLineY,
    scrollBarHeight,
  }
}

export const replaceAll = async (state: SearchState): Promise<SearchState> => {
  const actualIndex = getActualIndex(state)
  const fileIndex = getFileIndex(state, actualIndex)
  if (fileIndex !== -1) {
    return replaceAllInFocusedFile(state, fileIndex)
  }
  const { items, matchCount, replacement, workspacePath } = state
  const bulkEdits = GetReplaceElements.getReplaceElements(items, workspacePath, replacement)
  // TODO this function should return an error message if an error occurred during bulk edit
  await ApplyBulkReplacement.applyBulkReplacement(bulkEdits)
  await RendererWorker.handleWorkspaceRefresh()
  const fileCount = bulkEdits.length
  const message = GetReplacedMessage.getReplacedMessage(fileCount, matchCount, replacement)
  return {
    ...state,
    items: [],
    listItems: [],
    maxLineY: 0,
    message,
    minLineY: 0,
  }
}

export const replaceAllWithProgress = async (context: AsyncCommandContext<SearchState>): Promise<void> => {
  const state = context.getState()
  const { fileCount: totalFileCount, matchCount: totalMatchCount } = state
  const actualIndex = getActualIndex(state)
  const fileIndex = getFileIndex(state, actualIndex)
  const fileCount = fileIndex === -1 ? totalFileCount : 1
  const matchCount = fileIndex === -1 ? totalMatchCount : Math.max(getFileItems(state, fileIndex).length - 1, 0)
  const message = GetReplacingMessage.getReplacingMessage(fileCount, matchCount)
  await context.updateState((latestState) => ({
    ...latestState,
    message,
  }))
  await RendererWorker.invoke('Search.rerender')
  const updatedState = await replaceAll(context.getState())
  await context.updateState(() => updatedState)
}
