import type { SearchState } from '../SearchState/SearchState.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'
import * as ToggleSearchFlag from '../ToggleSearchFlag/ToggleSearchFlag.ts'

export const toggleMatchWholeWord = (state: SearchState): Promise<SearchState> => {
  return ToggleSearchFlag.toggleSearchFlag(state, SearchFlags.MatchWholeWord)
}
