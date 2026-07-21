import type { SearchResult } from '../SearchResult/SearchResult.ts'
import type { Tree } from '../Tree/Tree.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

export const createMatchTree = (results: readonly SearchResult[]): Tree => {
  let start = 0
  let current = ''
  const tree: Record<string, SearchResult[]> = Object.create(null)
  for (let i = 0; i < results.length; i++) {
    const result = results[i]
    if (result.type === TextSearchResultType.File) {
      if (current) {
        const sliced = results.slice(start, i)
        tree[current] = sliced
      }
      current = result.text
      start = i + 1
    }
  }
  if (current) {
    tree[current] = results.slice(start)
  }

  return tree
}
