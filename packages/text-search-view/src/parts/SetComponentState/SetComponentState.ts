import type { SearchState } from '../SearchState/SearchState.ts'
import * as SearchViewStates from '../SearchViewStates/SearchViewStates.ts'

const applyComponentState = (currentState: SearchState, state: SearchState): SearchState => {
  if (!state || typeof state !== 'object' || Array.isArray(state)) {
    throw new TypeError('Text Search state must be an object')
  }
  if (state.uid !== currentState.uid) {
    throw new Error(`Text Search state uid must remain ${currentState.uid}`)
  }
  return state
}

export const setComponentState = SearchViewStates.wrapCommand(applyComponentState)
