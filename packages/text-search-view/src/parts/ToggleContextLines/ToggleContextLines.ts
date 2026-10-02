import type { SearchState } from '../SearchState/SearchState.ts'
import * as HandleUpdate from '../HandleUpdate/HandleUpdate.ts'

export const toggleContextLines = async (state: SearchState): Promise<SearchState> => {
  const { contextLinesEnabled } = state
  return HandleUpdate.handleUpdate(state, { contextLinesEnabled: !contextLinesEnabled })
}
