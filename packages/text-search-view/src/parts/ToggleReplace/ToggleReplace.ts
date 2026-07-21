import type { SearchState } from '../SearchState/SearchState.ts'
import { collapseReplace } from '../CollapseReplace/CollapseReplace.ts'
import { expandReplace } from '../ExpandReplace/ExpandReplace.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'

export const toggleReplace = async (state: SearchState): Promise<SearchState> => {
  const { flags } = state
  if (SearchFlags.hasReplaceExpanded(flags)) {
    return collapseReplace(state)
  }
  return expandReplace(state)
}
