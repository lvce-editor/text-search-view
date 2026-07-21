import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as DefaultExcludeValue from '../DefaultExcludeValue/DefaultExcludeValue.ts'
import * as GetTopHeight from '../GetTopHeight/GetTopHeight.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as MinimumSliderSize from '../MinimumSliderSize/MinimumSliderSize.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'
import * as SearchViewStates from '../SearchViewStates/SearchViewStates.ts'
import * as ViewMode from '../ViewMode/ViewMode.ts'
import * as VirtualList from '../VirtualList/VirtualList.ts'

export const create = (
  uid: number,
  x: number,
  y: number,
  width: number,
  height: number,
  workspacePath: string,
  assetDir: string,
  itemHeight?: number,
  value: string = '',
  replacement: string = '',
  platform?: number,
): SearchState => {
  const headerHeight = GetTopHeight.getTopHeight(0)
  const state: SearchState = {
    disposed: false,
    fileCount: 0,
    height,
    initial: true,
    searchResults: [],
    stats: {},
    uid,
    value,
    width,
    x,
    y,
    ...VirtualList.create({
      headerHeight,
      itemHeight: itemHeight || 22,
      minimumSliderSize: MinimumSliderSize.minimumSliderSize,
    }),
    assetDir,
    collapsedPaths: [],
    defaultExcludes: DefaultExcludeValue.defaultExcludes,
    deltaY: 0,
    excludeValue: '',
    fileIconCache: {},
    finalDeltaY: 0,
    flags: SearchFlags.UseIgnoreFiles,
    focus: WhenExpression.Empty,
    focused: false,
    focusedIndex: -1,
    focusSource: InputSource.User,
    handleOffset: 0,
    history: [],
    historyIndex: -1,
    icons: [],
    includeValue: '',
    incrementalSearch: false,
    inputSource: InputSource.User,
    limit: 20_000,
    limitHit: false,
    limitHitWarning: '',
    listFocused: false,
    listFocusedIndex: -1,
    loaded: false,
    matchCount: 0,
    message: '',
    platform,
    removeButtonRight: 0,
    removeButtonWidth: 20,
    replacement,
    searchId: '',
    searchInputErrorMessage: '',
    selections: {
      FilesToExclude: {
        end: 0,
        start: 0,
      },
      FilesToInclude: {
        end: 0,
        start: 0,
      },
      ReplaceValue: {
        end: 0,
        start: 0,
      },
      SearchValue: {
        end: 0,
        start: 0,
      },
    },
    threads: 0,
    useChevrons: true,
    useFileIcons: true,
    usePullBasedSearch: false, // TODO enable
    viewMode: ViewMode.List,
    workspacePath: workspacePath,
  }
  SearchViewStates.set(uid, state, state)
  return state
}
