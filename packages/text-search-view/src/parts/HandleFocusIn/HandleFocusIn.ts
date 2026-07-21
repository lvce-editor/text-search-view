import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetSearchFocusKey from '../GetSearchFocusKey/GetSearchFocusKey.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const handleFocusIn = async (state: SearchState, key: string): Promise<SearchState> => {
  const { focus } = state
  const focusKey = GetSearchFocusKey.getSearchFocusKey(key)
  if (focus === focusKey) {
    return state
  }
  return {
    ...state,
    focus: focusKey,
    focusSource: InputSource.User,
  }
}
