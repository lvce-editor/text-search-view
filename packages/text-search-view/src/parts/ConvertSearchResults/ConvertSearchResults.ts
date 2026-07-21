import type { SearchResult } from '../SearchResult/SearchResult.ts'
import type { SearchResultFile } from '../SearchResultFile/SearchResultFile.ts'
import type { SearchResultMatch } from '../SearchResultMatch/SearchResultMatch.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

export const convertSearchResults = (results: readonly SearchResult[]): readonly SearchResultFile[] => {
  const files: SearchResultFile[] = []
  let matches: SearchResultMatch[] = []
  for (const result of results) {
    if (result.type === TextSearchResultType.File) {
      matches = []
      const currentFile = {
        isExpanded: true,
        matches,
        path: result.text,
      }
      files.push(currentFile)
    } else if (result.type === TextSearchResultType.Match) {
      matches.push({
        end: result.end,
        lineNumber: result.lineNumber,
        start: result.start,
        text: result.text,
      })
    }
  }
  return files
}
