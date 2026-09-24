import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getShowOpenInEditorLink = async (): Promise<boolean> => {
  try {
    const value = await RendererWorker.getPreference('Search.showOpenInEditorLink')
    return typeof value === 'boolean' ? value : true
  } catch {
    return true
  }
}
