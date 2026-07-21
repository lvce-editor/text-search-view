import type { TextSearchCompletionResult } from '../TextSearchCompletionResult/TextSearchCompletionResult.ts'
import type { TextSearchOptions } from '../TextSearchOptions/TextSearchOptions.ts'
import * as Assert from '../Assert/Assert.ts'
import * as GetProtocol from '../GetProtocol/GetProtocol.ts'
import { getTextSearchProvider } from '../GetTextSearchProvider/GetTextSearchProvider.ts'

export const textSearch = async (
  root: string,
  query: string,
  options: TextSearchOptions,
  assetDir: string,
  platform?: number,
  searchId?: string,
  uid?: number,
): Promise<TextSearchCompletionResult> => {
  Assert.string(root)
  Assert.string(query)
  const scheme = GetProtocol.getProtocol(root)
  const provider = getTextSearchProvider(scheme)
  const results = await provider(scheme, root, query, options, assetDir, platform, searchId, uid)
  return results
}
