import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getUsePullBasedSearch = async (): Promise<boolean> => {
  try {
    return Boolean(await RendererWorker.getPreference('Search.usePullBasedSearch'))
  } catch {
    return false
  }
}
