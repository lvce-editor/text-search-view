import type { SearchState } from '../SearchState/SearchState.ts'
import * as HandleUpdate from '../HandleUpdate/HandleUpdate.ts'

export const handleContextLinesInput = async (state: SearchState, value: string): Promise<SearchState> => {
  const contextLines = Math.trunc(Number(value))
  if (!Number.isFinite(contextLines)) {
    return state
  }
  return HandleUpdate.handleUpdate(state, { contextLines: Math.max(0, contextLines) })
}
