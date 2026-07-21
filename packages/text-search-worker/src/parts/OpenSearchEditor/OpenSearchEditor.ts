import type { SearchState } from '../SearchState/SearchState.ts'
import { openUri } from '../OpenUri/OpenUri.ts'

export const openSearchEditor = async (state: SearchState): Promise<SearchState> => {
  const { uid } = state
  const uri = `search-editor://${uid}-${globalThis.crypto.randomUUID()}/Search`
  await openUri(uri)
  return state
}
