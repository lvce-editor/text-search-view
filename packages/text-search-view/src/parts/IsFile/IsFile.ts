import type { SearchResult } from '../SearchResult/SearchResult.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

export const isFile = (match: SearchResult): boolean => {
  return match.type === TextSearchResultType.File
}
