export interface List<T> {
  readonly focusedIndex: number
  readonly headerHeight: number
  readonly height: number
  readonly itemHeight: number
  readonly items: readonly T[]
  readonly maxLineY: number
  readonly minLineY: number
}
