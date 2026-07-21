import { RendererWorker } from '@lvce-editor/rpc-registry'

export const openUri = async (path: string, focus = true, props = {}): Promise<void> => {
  await RendererWorker.openUri(path, focus, props)
}
