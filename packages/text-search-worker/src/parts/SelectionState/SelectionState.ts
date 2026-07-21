interface Selection {
  readonly end: number
  readonly start: number
}

export interface SelectionState {
  readonly FilesToExclude: Selection
  readonly FilesToInclude: Selection
  readonly ReplaceValue: Selection
  readonly SearchValue: Selection
}
