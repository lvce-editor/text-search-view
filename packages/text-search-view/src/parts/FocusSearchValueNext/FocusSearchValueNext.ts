import type { SearchState } from '../SearchState/SearchState.ts'
import * as FocusMatchCase from '../FocusMatchCase/FocusMatchCase.ts'
import * as FocusReplaceValue from '../FocusReplaceValue/FocusReplaceValue.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'

export const focusSearchValueNext = (state: SearchState): SearchState => {
  const { flags } = state
  if (flags & SearchFlags.ReplaceExpanded) {
    return FocusReplaceValue.focusReplaceValue(state)
  }
  return FocusMatchCase.focusMatchCase(state)
}
