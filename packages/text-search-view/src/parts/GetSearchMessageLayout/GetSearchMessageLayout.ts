import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetSearchMessageHeight from '../GetSearchMessageHeight/GetSearchMessageHeight.ts'

export const getSearchMessageLayout = async (
  state: SearchState,
  message: string,
  showOpenInEditorLink?: boolean,
): Promise<{ readonly headerHeight: number; readonly messageHeight: number }> => {
  const { flags, headerHeight, matchCount, messageHeight: oldMessageHeight, showOpenInEditorLink: stateShowOpenInEditorLink, width } = state
  const shouldShowOpenInEditorLink = showOpenInEditorLink ?? (stateShowOpenInEditorLink && matchCount > 0)
  const messageHeight = await GetSearchMessageHeight.getSearchMessageHeight(message, width, flags, shouldShowOpenInEditorLink)
  return {
    headerHeight: headerHeight + messageHeight - oldMessageHeight,
    messageHeight,
  }
}
