export interface SearchHeader {
  readonly defaultExcludes: readonly string[]
  readonly excludeValue: string
  readonly flags: number
  readonly focus: number
  readonly focused: boolean
  readonly focusSource: number
  readonly history: readonly string[]
  readonly historyIndex: number
  readonly includeValue: string
  readonly incrementalSearch: boolean
  readonly limit: number
  readonly limitHit: boolean
  readonly limitHitWarning: string
  readonly renderFolderPaths?: boolean
  readonly replacement: string
  readonly searchId: string
  readonly searchInputErrorMessage: string
  readonly useChevrons: boolean
  readonly useFileIcons: boolean
  readonly usePullBasedSearch: boolean
  readonly value: string
  readonly viewMode: number
}
