import type { SearchHeader } from '../SearchHeader/SearchHeader.ts'
import type { SearchList } from '../SearchList/SearchList.ts'
import type { SelectionState } from '../SelectionState/SelectionState.ts'

export interface SearchState extends SearchHeader, SearchList {
  readonly initial: boolean
  readonly platform: number
  readonly scrollBarY: number
  readonly selections: SelectionState
  readonly uid: number
}
