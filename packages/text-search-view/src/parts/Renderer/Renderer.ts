import type { SearchState } from '../SearchState/SearchState.ts'

export interface Renderer {
  (oldState: SearchState, newState: SearchState): readonly any[]
}
