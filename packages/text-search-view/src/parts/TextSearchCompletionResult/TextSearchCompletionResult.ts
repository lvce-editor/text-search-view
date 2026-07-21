import type { SearchResult } from '../SearchResult/SearchResult.ts'

export interface TextSearchCompletionResult {
  readonly limitHit: boolean
  readonly results: readonly SearchResult[]
}
