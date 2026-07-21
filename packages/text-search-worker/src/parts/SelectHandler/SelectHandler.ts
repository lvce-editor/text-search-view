import type { SearchResult } from '../SearchResult/SearchResult.ts'
import type { SearchState } from '../SearchState/SearchState.ts'

export interface SelectHandler {
  (state: SearchState, searchResult: SearchResult, index: number): Promise<SearchState>
}
