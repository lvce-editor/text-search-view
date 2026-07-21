import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetHeaderHeightForFlags from '../GetHeaderHeightForFlags/GetHeaderHeightForFlags.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'

export const expandReplace = (state: SearchState): SearchState => {
  const { flags, headerHeight } = state
  const newFlags = flags | SearchFlags.ReplaceExpanded
  return {
    ...state,
    flags: newFlags,
    headerHeight: GetHeaderHeightForFlags.getHeaderHeightForFlags(headerHeight, flags, newFlags),
  }
}
