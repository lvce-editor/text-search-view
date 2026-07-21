import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { TextSearchCompletionResult } from '../TextSearchCompletionResult/TextSearchCompletionResult.ts'

export const textSearch = async (scheme: string, root: string, query: string): Promise<TextSearchCompletionResult> => {
  const results = await RendererWorker.invoke('ExtensionHostTextSearch.textSearchHtml', scheme, root, query)
  return {
    limitHit: false,
    results,
  }
}
