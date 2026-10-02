export interface SearchResult {
  readonly depth?: number | undefined
  readonly end: number
  readonly endColumnIndex?: number | undefined
  readonly isDirectory?: boolean | undefined
  readonly lineNumber: number
  readonly rowIndex?: number | undefined
  readonly start: number
  readonly startColumnIndex?: number | undefined
  readonly text: string
  readonly type: number
}
