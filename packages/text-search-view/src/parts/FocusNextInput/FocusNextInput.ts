import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetNextFocus from '../GetNextFocus/GetNextFocus.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const focusNextInput = (state: SearchState): SearchState => {
  const { flags, focus } = state
  const nextFocus = GetNextFocus.getNextFocus(focus, flags)
  const isListFocus = nextFocus === WhenExpression.FocusSearchResults
  return {
    ...state,
    focus: nextFocus,
    focusSource: InputSource.Script,
    listFocused: isListFocus,
  }
}
