import { TextSearchWorker } from '@lvce-editor/rpc-registry'
import type { TextSearchCompletionResult } from '../TextSearchCompletionResult/TextSearchCompletionResult.ts'
import type { TextSearchOptions } from '../TextSearchOptions/TextSearchOptions.ts'

export const textSearch = async (
  root: string,
  query: string,
  options: TextSearchOptions,
  assetDir: string,
  platform?: number,
  searchId?: string,
  uid?: number,
): Promise<TextSearchCompletionResult> => {
  return TextSearchWorker.search(root, query, options, assetDir, platform, searchId, uid)
}
