export interface RestoredState {
  readonly excludeValue: string
  readonly flags: number
  readonly focus: number
  readonly history: readonly string[]
  readonly includeValue: string
  readonly listFocused: boolean
  readonly replacement: string
  readonly savedCollapsedPaths: readonly string[]
  readonly savedValue: string
  readonly threads: number
}
