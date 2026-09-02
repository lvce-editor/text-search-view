import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetHeaderHeightForFlags from '../GetHeaderHeightForFlags/GetHeaderHeightForFlags.ts'
import * as GetSearchMessageHeight from '../GetSearchMessageHeight/GetSearchMessageHeight.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'

export const collapseDetails = async (state: SearchState): Promise<SearchState> => {
  const { flags, headerHeight, message, messageHeight: oldMessageHeight, width } = state
  const newFlags = flags & ~SearchFlags.DetailsExpanded
  const messageHeight = await GetSearchMessageHeight.getSearchMessageHeight(message, width, newFlags)
  return {
    ...state,
    flags: newFlags,
    focus: WhenExpression.FocusSearchInput,
    focusSource: InputSource.Script,
    headerHeight: GetHeaderHeightForFlags.getHeaderHeightForFlags(headerHeight, flags, newFlags) + messageHeight - oldMessageHeight,
    messageHeight,
  }
}
