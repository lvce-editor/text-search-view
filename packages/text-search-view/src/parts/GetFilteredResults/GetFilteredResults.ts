import type { SearchResult } from '../SearchResult/SearchResult.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

export const getFilteredResults = (results: readonly SearchResult[], collapsedPaths: readonly string[]): readonly SearchResult[] => {
  if (collapsedPaths.length === 0) {
    return results
  }
  const filteredResults: SearchResult[] = []
  let collapsedDepth = -1
  for (const result of results) {
    const depth = result.depth ?? (result.type === TextSearchResultType.File ? 0 : 1)
    if (collapsedDepth !== -1) {
      if (depth > collapsedDepth) {
        continue
      }
      collapsedDepth = -1
    }
    filteredResults.push(result)
    if (result.type === TextSearchResultType.File && collapsedPaths.includes(result.text)) {
      collapsedDepth = depth
    }
  }
  return filteredResults
}
