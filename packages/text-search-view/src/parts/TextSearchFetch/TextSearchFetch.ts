import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { TextSearchCompletionResult } from '../TextSearchCompletionResult/TextSearchCompletionResult.ts'
import type { TextSearchOptions } from '../TextSearchOptions/TextSearchOptions.ts'

export const textSearch = async (
  scheme: string,
  root: string,
  query: string,
  options: TextSearchOptions,
  assetDir: string,
): Promise<TextSearchCompletionResult> => {
  const results = await RendererWorker.invoke('ExtensionHostTextSearch.textSearchFetch', scheme, root, query, options, assetDir)
  return {
    limitHit: false,
    results,
  }
}
