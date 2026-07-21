import type { SearchState } from '../SearchState/SearchState.ts'

export interface InputHandler {
  (state: SearchState, value: string, inputSource?: number): Promise<SearchState>
}
