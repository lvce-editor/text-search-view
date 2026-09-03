import type { SearchState } from '../SearchState/SearchState.ts'
import * as UpdateVisibleFileIcons from '../UpdateVisibleFileIcons/UpdateVisibleFileIcons.ts'

export const handleIconThemeChange = async (state: SearchState): Promise<SearchState> => {
  const stateWithEmptyIconCache = {
    ...state,
    fileIconCache: {},
  }
  return UpdateVisibleFileIcons.updateVisibleFileIcons(stateWithEmptyIconCache)
}
