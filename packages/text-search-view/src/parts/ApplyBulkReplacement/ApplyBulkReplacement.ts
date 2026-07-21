import { RendererWorker } from '@lvce-editor/rpc-registry'

export const applyBulkReplacement = async (bulkEdits: readonly any[]): Promise<void> => {
  await RendererWorker.invoke('BulkReplacement.applyBulkReplacement', bulkEdits)
}
