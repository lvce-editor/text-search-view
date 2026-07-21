import type { SearchResultMatch } from '../SearchResultMatch/SearchResultMatch.ts'

export interface SearchResultFile {
  readonly isExpanded: boolean
  readonly matches: readonly SearchResultMatch[]
  readonly path: string
}
