import { RendererWorker } from '@lvce-editor/rpc-registry'

export const defaultMaxResults = 20_000

export const getMaxResults = async (): Promise<number> => {
  try {
    const value = await RendererWorker.invoke('Preferences.get', 'textSearch.maxResults')
    if (typeof value === 'number' && Number.isSafeInteger(value) && value > 0) {
      return value
    }
  } catch {
    // Use the default when the preference is unavailable.
  }
  return defaultMaxResults
}
