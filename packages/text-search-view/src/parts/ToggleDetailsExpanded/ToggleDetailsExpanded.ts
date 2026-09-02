import type { SearchState } from '../SearchState/SearchState.ts'
import * as CollapseDetails from '../CollapseDetails/CollapseDetails.ts'
import * as ExpandDetails from '../ExpandDetails/ExpandDetails.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'

export const toggleDetailsExpanded = async (state: SearchState): Promise<SearchState> => {
  const { flags } = state
  if (SearchFlags.hasDetailsExpanded(flags)) {
    return CollapseDetails.collapseDetails(state)
  }
  return ExpandDetails.expandDetails(state)
}
