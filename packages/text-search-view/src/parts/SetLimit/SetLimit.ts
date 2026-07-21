import type { SearchState } from '../SearchState/SearchState.ts'
import { handleUpdate } from '../HandleUpdate/HandleUpdate.ts'

export const setLimit = (state: SearchState, limit: number): Promise<SearchState> => {
  return handleUpdate(state, {
    limit,
  })
}
