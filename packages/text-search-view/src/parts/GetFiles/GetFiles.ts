import type { SearchResult } from '../SearchResult/SearchResult.ts'
import * as IsFile from '../IsFile/IsFile.ts'

export const getFiles = (matches: readonly SearchResult[]): readonly SearchResult[] => {
  return matches.filter(IsFile.isFile)
}
