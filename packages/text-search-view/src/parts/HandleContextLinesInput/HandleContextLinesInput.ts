import type { SearchState } from '../SearchState/SearchState.ts'

export const handleContextLinesInput = async (state: SearchState, value: string): Promise<SearchState> => {
  const contextLines = Math.trunc(Number(value))
  if (!Number.isFinite(contextLines)) {
    return state
  }
  return {
    ...state,
    contextLines: Math.max(0, contextLines),
  }
}
