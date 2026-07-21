import type { DisplaySearchResult } from '../DisplaySearchResult/DisplaySearchResult.ts'

export interface ViewModel {
  readonly deltaY: number
  readonly displayResults: readonly DisplaySearchResult[]
  readonly flags: number
  readonly focus: number
  readonly focusOutline: boolean
  readonly itemHeight: number
  readonly matchCount: number
  readonly message: string
  readonly scrollBarHeight: number
  readonly scrollBarValue: number
  readonly scrollBarY: number
  readonly searchInputErrorMessage: string
}
