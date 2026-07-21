import type { SearchResult } from '../SearchResult/SearchResult.ts'
import type { Tree } from '../Tree/Tree.ts'

export const mergeTrees = (a: Tree, b: Tree): Tree => {
  const merged: Record<string, readonly SearchResult[]> = { ...a }
  for (const [key, value] of Object.entries(b)) {
    const existings = merged[key] || []
    merged[key] = [...existings, ...value]
  }
  return merged
}
