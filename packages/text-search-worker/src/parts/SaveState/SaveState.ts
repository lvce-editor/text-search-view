import type { SavedState } from '../SavedState/SavedState.ts'
import type { SearchState } from '../SearchState/SearchState.ts'

export const saveState = (state: SearchState): SavedState => {
  const { collapsedPaths, excludeValue, flags, focus, history, includeValue, listFocused, replacement, value } = state
  return {
    collapsedPaths,
    excludeValue,
    flags,
    focus,
    history,
    includeValue,
    listFocused,
    replacement,
    value,
  }
}
