import type { SearchState } from '../SearchState/SearchState.ts'
import * as SearchViewStates from '../SearchViewStates/SearchViewStates.ts'

export const getComponentState = (uid: number): SearchState => {
  return SearchViewStates.get(uid).newState
}
