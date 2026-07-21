import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetHeaderHeightForFlags from '../GetHeaderHeightForFlags/GetHeaderHeightForFlags.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'

export const expandDetails = (state: SearchState): SearchState => {
  const { flags, headerHeight } = state
  const newFlags = flags | SearchFlags.DetailsExpanded
  return {
    ...state,
    flags: newFlags,
    focus: WhenExpression.FocusSearchIncludeInput,
    focusSource: InputSource.Script,
    headerHeight: GetHeaderHeightForFlags.getHeaderHeightForFlags(headerHeight, flags, newFlags),
  }
}
