import type { SearchState } from '../SearchState/SearchState.ts'
import * as SearchViewStates from '../SearchViewStates/SearchViewStates.ts'

const applyComponentState = (currentState: SearchState, state: SearchState): SearchState => {
  if (!state || typeof state !== 'object' || Array.isArray(state)) {
    throw new TypeError('Text Search state must be an object')
  }
  const { uid } = state
  const { uid: currentUid } = currentState
  if (uid !== currentUid) {
    throw new Error(`Text Search state uid must remain ${currentUid}`)
  }
  return state
}

export const setComponentState = SearchViewStates.wrapCommand(applyComponentState)
