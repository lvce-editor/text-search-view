import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetHeaderHeightForFlags from '../GetHeaderHeightForFlags/GetHeaderHeightForFlags.ts'
import * as GetSearchMessageHeight from '../GetSearchMessageHeight/GetSearchMessageHeight.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'

export const expandDetails = async (state: SearchState): Promise<SearchState> => {
  const { flags, headerHeight, matchCount, message, messageHeight: oldMessageHeight, showOpenInEditorLink, width } = state
  const newFlags = flags | SearchFlags.DetailsExpanded
  const messageHeight = await GetSearchMessageHeight.getSearchMessageHeight(message, width, newFlags, showOpenInEditorLink && matchCount > 0)
  return {
    ...state,
    flags: newFlags,
    focus: WhenExpression.FocusSearchIncludeInput,
    focusSource: InputSource.Script,
    headerHeight: GetHeaderHeightForFlags.getHeaderHeightForFlags(headerHeight, flags, newFlags) + messageHeight - oldMessageHeight,
    messageHeight,
  }
}
