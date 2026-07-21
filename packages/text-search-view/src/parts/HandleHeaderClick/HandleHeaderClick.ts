import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetClickHandler from '../GetClickHandler/GetClickHandler.ts'

export const handleHeaderClick = async (state: SearchState, name: string): Promise<SearchState> => {
  const fn = GetClickHandler.getClickHandler(name)
  return fn(state)
}
