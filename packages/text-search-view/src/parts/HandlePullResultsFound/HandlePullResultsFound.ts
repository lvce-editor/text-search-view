import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { SearchResult } from '../SearchResult/SearchResult.ts'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetFileIcons from '../GetFileIcons/GetFileIcons.ts'
import * as GetNumberOfVisibleItems from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'
import * as GetSearchMessageLayout from '../GetSearchMessageLayout/GetSearchMessageLayout.ts'
import * as GetTextSearchResultCounts from '../GetTextSearchResultCounts/GetTextSearchResultCounts.ts'
import * as ScrollBarFunctions from '../ScrollBarFunctions/ScrollBarFunctions.ts'
import * as SearchStatusMessage from '../SearchStatusMessage/SearchStatusMessage.ts'
import * as SearchViewStates from '../SearchViewStates/SearchViewStates.ts'

export const handlePullResultsFound = async (
  state: SearchState,
  resultSearchId: string,
  newResults: readonly SearchResult[],
): Promise<SearchState> => {
  const { fileIconCache, height, itemHeight, listItems, minimumSliderSize, searchId, uid } = state
  if (searchId !== resultSearchId) {
    return state
  }
  const allResults = [...listItems, ...newResults]
  const { fileCount, resultCount } = GetTextSearchResultCounts.getTextSearchResultCounts(allResults)
  const message = SearchStatusMessage.getStatusMessage(resultCount, fileCount)
  const { headerHeight, messageHeight } = await GetSearchMessageLayout.getSearchMessageLayout(state, message)
  const total = allResults.length
  const contentHeight = total * itemHeight
  const listHeight = height - headerHeight
  const scrollBarHeight = ScrollBarFunctions.getScrollBarSize(height, contentHeight, minimumSliderSize)
  const numberOfVisible = GetNumberOfVisibleItems.getNumberOfVisibleItems(listHeight, itemHeight)
  const maxLineY = Math.min(numberOfVisible, total)
  const finalDeltaY = Math.max(contentHeight - listHeight, 0)
  const visible = allResults.slice(0, maxLineY)
  const { icons, newFileIconCache } = await GetFileIcons.getFileIcons(visible, fileIconCache)

  const latest = SearchViewStates.get(uid)

  const updatedState = {
    ...latest.newState,
    fileCount,
    fileIconCache: newFileIconCache,
    finalDeltaY,
    headerHeight,
    icons,
    items: allResults,
    listItems: allResults,
    loaded: true,
    matchCount: resultCount,
    maxLineY,
    message,
    messageHeight,
    minLineY: 0,
    scrollBarHeight,
  }
  const oldState = latest ? latest.oldState : state
  SearchViewStates.set(uid, oldState, updatedState)
  await RendererWorker.invoke('Search.rerender')
  return state
}
