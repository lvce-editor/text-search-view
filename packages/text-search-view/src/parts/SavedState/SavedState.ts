export interface SavedState {
  readonly collapsedPaths: readonly string[]
  readonly excludeValue: string
  readonly flags: number
  readonly focus: number
  readonly history: readonly string[]
  readonly includeValue: string
  readonly listFocused: boolean
  readonly replacement: string
  readonly value: string
}
