import type { SearchState } from '../SearchState/SearchState.ts'
import * as OpenFolder from '../OpenFolder/OpenFolder.ts'

export const handleOpenFolderClick = async (state: SearchState): Promise<SearchState> => {
  await OpenFolder.openFolder()
  return state
}
