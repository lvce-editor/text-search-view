export interface TextSearchOptions {
  readonly assetDir: string
  readonly defaultExcludes?: readonly string[]
  readonly exclude: string
  readonly flags: number
  readonly include: string
  readonly isCaseSensitive: boolean
  readonly limit: number
  readonly matchWholeWord: boolean

  readonly query: string
  readonly root: string
  readonly scheme: string

  readonly threads: number

  // TODO use flags or options object?
  readonly usePullBasedSearch: boolean
  readonly useRegularExpression: boolean
}
