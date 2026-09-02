import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetSearchMessageHeight from '../GetSearchMessageHeight/GetSearchMessageHeight.ts'

export const handleUpdateError = async (state: SearchState, update: Partial<SearchState>, error: unknown): Promise<SearchState> => {
  const partialNewState = { ...state, ...update }
  const message = String(error)
  const messageHeight = await GetSearchMessageHeight.getSearchMessageHeight(message, partialNewState.width, partialNewState.flags)
  const headerHeight = partialNewState.headerHeight + messageHeight - partialNewState.messageHeight
  return {
    ...partialNewState,
    fileCount: 0,
    headerHeight,
    items: [],
    listItems: [],
    matchCount: 0,
    maxLineY: 0,
    message,
    messageHeight,
    minLineY: 0,
  }
}
