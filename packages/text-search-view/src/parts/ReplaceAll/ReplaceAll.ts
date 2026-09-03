import type { AsyncCommandContext } from '@lvce-editor/viewlet-registry'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { SearchResult } from '../SearchResult/SearchResult.ts'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as ApplyBulkReplacement from '../ApplyBulkReplacement/ApplyBulkReplacement.ts'
import { getNewMinMax } from '../GetNewMinMax/GetNewMinMax.ts'
import * as GetReplacedMessage from '../GetReplacedMessage/GetReplacedMessage.ts'
import * as GetReplaceElements from '../GetReplaceElements/GetReplaceElements.ts'
import * as GetReplacingMessage from '../GetReplacingMessage/GetReplacingMessage.ts'
import * as GetSearchMessageLayout from '../GetSearchMessageLayout/GetSearchMessageLayout.ts'
import { removeItemFromItems } from '../RemoveItemFromItems/RemoveItemFromItems.ts'
import * as ReplaceAllAndPrompt from '../ReplaceAllAndPrompt/ReplaceAllAndPrompt.ts'
import * as ScrollBarFunctions from '../ScrollBarFunctions/ScrollBarFunctions.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'
import * as UpdateVisibleFileIcons from '../UpdateVisibleFileIcons/UpdateVisibleFileIcons.ts'

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
  const message = GetReplacedMessage.getReplacedMessage(1, matchCount, replacement)
  const { headerHeight, messageHeight } = await GetSearchMessageLayout.getSearchMessageLayout(state, message)
  const { newDeltaY, newMaxLineY, newMinLineY } = getNewMinMax(newItems.length, minLineY, maxLineY, deltaY, itemHeight)
  const total = newItems.length
  const contentHeight = total * itemHeight
  const listHeight = height - headerHeight
  const scrollBarHeight = ScrollBarFunctions.getScrollBarSize(height, contentHeight, minimumSliderSize)
  const finalDeltaY = Math.max(contentHeight - listHeight, 0)
  const updatedState = {
    ...state,
    deltaY: newDeltaY,
    fileCount: newFileCount,
    finalDeltaY,
    headerHeight,
    items: newItems,
    listFocusedIndex: newFocusedIndex,
    listItems: newItems,
    matchCount: newMatchCount,
    maxLineY: newMaxLineY,
    message,
    messageHeight,
    minLineY: newMinLineY,
    scrollBarHeight,
    searchId: '',
  }
  return UpdateVisibleFileIcons.updateVisibleFileIcons(updatedState)
}

const confirmReplaceAll = async (state: SearchState, fileIndex: number): Promise<boolean> => {
  const { items, matchCount: totalMatchCount, replacement, workspacePath } = state
  const targetItems = fileIndex === -1 ? items : getFileItems(state, fileIndex)
  const fileCount = fileIndex === -1 ? targetItems.filter((item) => item.type === TextSearchResultType.File).length : 1
  const matchCount = fileIndex === -1 ? totalMatchCount : Math.max(targetItems.length - 1, 0)
  if (matchCount === 0) {
    return true
  }
  return ReplaceAllAndPrompt.replaceAllAndPrompt(workspacePath, targetItems, replacement, matchCount, fileCount)
}

const replaceAllConfirmed = async (state: SearchState, fileIndex: number): Promise<SearchState> => {
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
  const { headerHeight, messageHeight } = await GetSearchMessageLayout.getSearchMessageLayout(state, message)
  return {
    ...state,
    headerHeight,
    items: [],
    listItems: [],
    maxLineY: 0,
    message,
    messageHeight,
    minLineY: 0,
    searchId: '',
  }
}

export const replaceAll = async (state: SearchState): Promise<SearchState> => {
  const actualIndex = getActualIndex(state)
  const fileIndex = getFileIndex(state, actualIndex)
  const shouldReplace = await confirmReplaceAll(state, fileIndex)
  if (!shouldReplace) {
    return state
  }
  return replaceAllConfirmed(state, fileIndex)
}

export const replaceAllWithProgress = async (context: AsyncCommandContext<SearchState>): Promise<void> => {
  const state = context.getState()
  const { fileCount: totalFileCount, matchCount: totalMatchCount, searchId: activeSearchId, uid } = state
  const actualIndex = getActualIndex(state)
  const fileIndex = getFileIndex(state, actualIndex)
  const fileCount = fileIndex === -1 ? totalFileCount : 1
  const matchCount = fileIndex === -1 ? totalMatchCount : Math.max(getFileItems(state, fileIndex).length - 1, 0)
  const shouldReplace = await confirmReplaceAll(state, fileIndex)
  if (!shouldReplace) {
    return
  }
  if (context.getState().searchId !== activeSearchId) {
    return
  }
  const replacementSearchId = crypto.randomUUID()
  let progressUpdate: Partial<SearchState> = {}
  if (matchCount > 0) {
    const message = GetReplacingMessage.getReplacingMessage(fileCount, matchCount)
    const messageLayout = await GetSearchMessageLayout.getSearchMessageLayout(state, message)
    progressUpdate = { ...messageLayout, message }
  }
  await context.updateState((latestState) => ({ ...latestState, ...progressUpdate, searchId: replacementSearchId }))
  const updatedState = await replaceAllConfirmed(context.getState(), fileIndex)
  await context.updateState(() => updatedState)
  await RendererWorker.invoke('Viewlet.requestRender', uid)
}
