import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getSearchExcludes = async (fallback: readonly string[] = []): Promise<readonly string[]> => {
  try {
    const value = await RendererWorker.invoke('Preferences.get', 'search.exclude')
    if (Array.isArray(value)) {
      return value.filter((item): item is string => typeof item === 'string')
    }
    if (!value || typeof value !== 'object') {
      return []
    }
    const excludes: string[] = []
    for (const [pattern, enabled] of Object.entries(value)) {
      if (enabled === true) {
        excludes.push(pattern)
      }
    }
    return excludes
  } catch {
    return fallback
  }
}
