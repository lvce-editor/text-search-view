import type { SearchState } from '../SearchState/SearchState.ts'

export interface ClickHandler {
  (state: SearchState): SearchState | Promise<SearchState>
}
