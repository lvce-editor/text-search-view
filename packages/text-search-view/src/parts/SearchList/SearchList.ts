import type { DisplaySearchResult } from '../DisplaySearchResult/DisplaySearchResult.ts'
import type { FileIconCache } from '../FileIconCache/FileIconCache.ts'
import type { List } from '../List/List.ts'
import type { SearchResult } from '../SearchResult/SearchResult.ts'

export interface SearchList extends List<SearchResult> {
  readonly assetDir: string
  readonly collapsedPaths: readonly string[]
  readonly deltaY: number
  readonly disposed: boolean
  readonly fileCount: number
  readonly fileIconCache: FileIconCache
  readonly finalDeltaY: number
  readonly handleOffset: number
  readonly icons: readonly string[]
  readonly inputSource: number
  readonly limitHit: boolean
  readonly listFocused: boolean
  readonly listFocusedIndex: number
  readonly listItems: readonly SearchResult[]
  readonly loaded: boolean
  readonly matchCount: number
  readonly message: string
  readonly minimumSliderSize: number
  readonly removeButtonRight: number
  readonly removeButtonWidth: number
  readonly scrollBarActive: boolean
  readonly scrollBarHeight: number
  readonly searchResults: readonly DisplaySearchResult[]
  readonly stats: any
  readonly threads: number
  readonly touchDifference: number
  readonly touchOffsetY: number
  readonly touchTimeStamp: number
  readonly width: number
  readonly workspacePath: string
  readonly x: number
  readonly y: number
}
