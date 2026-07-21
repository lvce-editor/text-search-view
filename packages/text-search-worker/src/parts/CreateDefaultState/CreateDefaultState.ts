import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as DefaultExcludeValue from '../DefaultExcludeValue/DefaultExcludeValue.ts'
import * as GetTopHeight from '../GetTopHeight/GetTopHeight.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as MinimumSliderSize from '../MinimumSliderSize/MinimumSliderSize.ts'
import * as ScrollBarFunctions from '../ScrollBarFunctions/ScrollBarFunctions.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'
import * as ViewMode from '../ViewMode/ViewMode.ts'
import * as VirtualList from '../VirtualList/VirtualList.ts'

export const createDefaultState = (): SearchState => {
  const headerHeight = GetTopHeight.getTopHeight(0)
  const virtualList = VirtualList.create({
    headerHeight,
    itemHeight: 22,
    minimumSliderSize: MinimumSliderSize.minimumSliderSize,
  })
  const height = 0
  const deltaY = 0
  const finalDeltaY = 0
  const { scrollBarHeight } = virtualList
  const scrollBarY = finalDeltaY === 0 ? 0 : ScrollBarFunctions.getScrollBarY(deltaY, finalDeltaY, height - headerHeight, scrollBarHeight)
  const state: SearchState = {
    disposed: false,
    fileCount: 0,
    height,
    searchResults: [],
    stats: {},
    uid: 0,
    value: '',
    width: 0,
    x: 0,
    y: 0,
    ...virtualList,
    assetDir: '',
    collapsedPaths: [],
    defaultExcludes: DefaultExcludeValue.defaultExcludes,
    deltaY,
    excludeValue: '',
    fileIconCache: {},
    finalDeltaY,
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
    initial: true,
    inputSource: InputSource.User,
    limit: 20_000,
    limitHit: false,
    limitHitWarning: '',
    listFocused: false,
    listFocusedIndex: -1,
    loaded: false,
    matchCount: 0,
    message: '',
    platform: 0,
    removeButtonRight: 0,
    removeButtonWidth: 20,
    renderFolderPaths: false,
    replacement: '',
    scrollBarY,
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
    usePullBasedSearch: false,
    viewMode: ViewMode.List,
    workspacePath: '',
  }
  return state
}
