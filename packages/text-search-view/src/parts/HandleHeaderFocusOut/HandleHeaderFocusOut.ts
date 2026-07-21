import type { SearchState } from '../SearchState/SearchState.ts'

export const handleHeaderFocusOut = (state: SearchState): SearchState => {
  const { focus } = state
  if (!focus) {
    return state
  }
  return {
    ...state,
    focus: 0,
    focused: false,
  }
}
