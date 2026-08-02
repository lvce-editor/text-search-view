import { RendererWorker, TextSearchWorker } from '@lvce-editor/rpc-registry'
import type { TextSearchCompletionResult } from '../TextSearchCompletionResult/TextSearchCompletionResult.ts'
import type { TextSearchOptions } from '../TextSearchOptions/TextSearchOptions.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'

export const textSearch = async (
  root: string,
  query: string,
  options: TextSearchOptions,
  assetDir: string,
  platform?: number,
  searchId?: string,
  uid?: number,
): Promise<TextSearchCompletionResult> => {
  if (!SearchFlags.hasOpenEditors(options.flags)) {
    return TextSearchWorker.search(root, query, options, assetDir, platform, searchId, uid)
  }
  const openEditorUris = await RendererWorker.invoke('GetActiveEditor.getOpenEditorUris')
  return TextSearchWorker.search(root, query, { ...options, openEditorUris }, assetDir, platform, searchId, uid)
}
