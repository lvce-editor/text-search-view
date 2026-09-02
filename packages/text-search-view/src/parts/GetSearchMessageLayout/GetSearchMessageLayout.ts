import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetSearchMessageHeight from '../GetSearchMessageHeight/GetSearchMessageHeight.ts'

export const getSearchMessageLayout = async (
  state: SearchState,
  message: string,
): Promise<{ readonly headerHeight: number; readonly messageHeight: number }> => {
  const { flags, headerHeight, messageHeight: oldMessageHeight, width } = state
  const messageHeight = await GetSearchMessageHeight.getSearchMessageHeight(message, width, flags)
  return {
    headerHeight: headerHeight + messageHeight - oldMessageHeight,
    messageHeight,
  }
}
