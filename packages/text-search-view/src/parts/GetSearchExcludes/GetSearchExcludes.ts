import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getSearchExcludes = async (fallback: readonly string[] = []): Promise<readonly string[]> => {
  try {
    const value = await RendererWorker.invoke('Preferences.get', 'search.exclude')
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
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
