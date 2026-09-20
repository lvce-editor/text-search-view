import type { SearchState } from '../SearchState/SearchState.ts'
import { openUri } from '../OpenUri/OpenUri.ts'
import { saveState } from '../SaveState/SaveState.ts'

export const openSearchEditor = async (state: SearchState): Promise<SearchState> => {
  const { uid } = state
  const uri = `search-editor://${uid}-${globalThis.crypto.randomUUID()}/Search`
  await openUri(uri, true, saveState(state))
  return state
}
