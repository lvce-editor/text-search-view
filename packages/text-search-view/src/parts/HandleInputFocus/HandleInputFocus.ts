import type { SearchState } from '../SearchState/SearchState.ts'
import { getSearchFocusKey } from '../GetSearchFocusKey/GetSearchFocusKey.ts'

export const handleInputFocus = (state: SearchState, name: string): SearchState => {
  const key = getSearchFocusKey(name)
  return {
    ...state,
    focus: key,
    focused: true,
    listFocused: false,
  }
}
