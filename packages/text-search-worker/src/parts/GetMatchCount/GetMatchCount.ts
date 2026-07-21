import type { SearchResult } from '../SearchResult/SearchResult.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

export const getMatchCount = (results: readonly SearchResult[], startIndex: number): number => {
  for (let i = startIndex + 1; i < results.length; i++) {
    const result = results[i]
    if (result.type === TextSearchResultType.File) {
      return i - startIndex - 1
    }
  }
  return results.length - startIndex - 1
}
