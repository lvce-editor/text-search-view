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
  try {
    // @ts-ignore
    const result = await RendererWorker.invoke('ExtensionHostTextSearch.textSearchMemory2', scheme, root, query, options, assetDir)
    if (!result || !result.results) {
      throw new Error(`new api not supported`)
    }
    return result
  } catch {
    const results = await RendererWorker.invoke('ExtensionHostTextSearch.textSearchMemory', scheme, root, query, options, assetDir)
    return {
      limitHit: false,
      results,
    }
  }
}
