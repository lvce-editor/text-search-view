import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getShowOpenInEditorLink = async (): Promise<boolean> => {
  try {
    return Boolean(await RendererWorker.getPreference('Search.showOpenInEditorLink'))
  } catch {
    return true
  }
}
