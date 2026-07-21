import type { SearchState } from '../SearchState/SearchState.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const focusElement = (state: SearchState, focusKey: number): SearchState => {
  return {
    ...state,
    focus: focusKey,
    focusSource: InputSource.Script,
  }
}
