import type { SearchResult } from '../SearchResult/SearchResult.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

export const getMatchCount = (results: readonly SearchResult[], startIndex: number): number => {
  let matchCount = 0
  for (let i = startIndex + 1; i < results.length; i++) {
    const result = results[i]
    if (result.type === TextSearchResultType.File) {
      break
    }
    if (result.type === TextSearchResultType.Match) {
      matchCount++
    }
  }
  return matchCount
}
