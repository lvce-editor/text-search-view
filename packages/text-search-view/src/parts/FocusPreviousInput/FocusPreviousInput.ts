import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetPreviousFocus from '../GetPreviousFocus/GetPreviousFocus.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const focusPreviousInput = (state: SearchState): SearchState => {
  const { flags, focus } = state
  const previousFocus = GetPreviousFocus.getPreviousFocus(focus, flags)
  return {
    ...state,
    focus: previousFocus,
    focusSource: InputSource.Script,
  }
}
