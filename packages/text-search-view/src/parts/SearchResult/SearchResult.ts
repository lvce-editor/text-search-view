export interface SearchResult {
  readonly end: number
  readonly endColumnIndex?: number
  readonly lineNumber: number
  readonly rowIndex?: number
  readonly start: number
  readonly startColumnIndex?: number
  readonly text: string
  readonly type: number
}
