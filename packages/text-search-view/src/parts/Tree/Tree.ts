import type { SearchResult } from '../SearchResult/SearchResult.ts'

export interface Tree {
  readonly [key: string]: readonly SearchResult[]
}
