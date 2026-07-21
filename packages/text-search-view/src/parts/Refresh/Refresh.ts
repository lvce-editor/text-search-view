import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetSearchExcludes from '../GetSearchExcludes/GetSearchExcludes.ts'
import * as ViewletSearchHandleUpdate from '../HandleUpdate/HandleUpdate.ts'

export const refresh = async (state: SearchState): Promise<SearchState> => {
  const { defaultExcludes: currentDefaultExcludes } = state
  const defaultExcludes = await GetSearchExcludes.getSearchExcludes(currentDefaultExcludes)
  return ViewletSearchHandleUpdate.handleUpdate(state, { defaultExcludes })
}
