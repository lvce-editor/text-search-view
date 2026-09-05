import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetFileIcons from '../GetFileIcons/GetFileIcons.ts'
import * as GetNumberOfVisibleItems from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'
import * as GetProtocol from '../GetProtocol/GetProtocol.ts'
import * as GetSearchHeaderHeight from '../GetSearchHeaderHeight/GetSearchHeaderHeight.ts'
import * as GetSearchMessageHeight from '../GetSearchMessageHeight/GetSearchMessageHeight.ts'
import * as GetSearchWarningMessageHeight from '../GetSearchWarningMessageHeight/GetSearchWarningMessageHeight.ts'
import * as GetTextSearchResultCounts from '../GetTextSearchResultCounts/GetTextSearchResultCounts.ts'
import * as ScrollBarFunctions from '../ScrollBarFunctions/ScrollBarFunctions.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'
import * as SearchStatusMessage from '../SearchStatusMessage/SearchStatusMessage.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'
import * as SearchViewStates from '../SearchViewStates/SearchViewStates.ts'
import * as TextSearch from '../TextSearch/TextSearch.ts'

export const handleUpdateFull = async (state: SearchState, update: Partial<SearchState>): Promise<SearchState> => {
  const { workspacePath } = state
  const partialNewState = { ...state, ...update }
  const {
    assetDir,
    contextLines,
    contextLinesEnabled,
    excludeValue,
    fileIconCache,
    flags,
    height,
    includeValue,
    itemHeight,
    limit,
    minimumSliderSize,
    platform,
    searchWarningFontFamily,
    searchWarningFontSize,
    searchWarningHorizontalPadding,
    searchWarningLineHeight,
    searchWarningVerticalPadding,
    threads,
    uid,
    usePullBasedSearch,
    value,
    width,
  } = partialNewState
  const root = workspacePath
  const scheme = GetProtocol.getProtocol(root)
  const isFileSearch = scheme === '' || scheme === 'file'
  const shouldUsePullBasedSearch = usePullBasedSearch && isFileSearch
  const searchId = crypto.randomUUID()
  const current = SearchViewStates.get(uid)
  const oldState = current ? current.oldState : state
  SearchViewStates.set(uid, oldState, { ...partialNewState, searchId })
  const { limitHit, results } = await TextSearch.textSearch(
    root,
    value,
    {
      assetDir,
      contextLines: contextLinesEnabled ? contextLines : 0,
      defaultExcludes: SearchFlags.hasUseIgnoreFiles(flags) ? partialNewState.defaultExcludes : [],
      exclude: excludeValue,
      flags,
      include: includeValue,
      isCaseSensitive: Boolean(flags & SearchFlags.MatchCase),
      limit,
      matchWholeWord: Boolean(flags & SearchFlags.MatchWholeWord),
      query: value,
      root,
      scheme,
      threads,
      useIgnoreFiles: SearchFlags.hasUseIgnoreFiles(flags),
      usePullBasedSearch: shouldUsePullBasedSearch,
      useRegularExpression: Boolean(flags & SearchFlags.UseRegularExpression),
    },
    assetDir,
    platform,
    searchId,
    uid,
  )
  const latestAfterSearch = SearchViewStates.get(uid)
  if (latestAfterSearch.newState.searchId !== searchId) {
    return state
  }
  if (!Array.isArray(results)) {
    throw new TypeError('results must be of type array')
  }
  const { fileCount, resultCount } = GetTextSearchResultCounts.getTextSearchResultCounts(results)
  const message = SearchStatusMessage.getStatusMessage(resultCount, fileCount)
  const limitHitWarning = limitHit ? SearchStrings.theResultSetOnlyContainsASubSetOfMatches() : ''
  const [messageHeight, warningHeight] = await Promise.all([
    GetSearchMessageHeight.getSearchMessageHeight(message, width, flags),
    GetSearchWarningMessageHeight.getSearchWarningMessageHeight(
      limitHitWarning,
      width,
      searchWarningFontFamily,
      searchWarningFontSize,
      searchWarningLineHeight,
      searchWarningHorizontalPadding,
      searchWarningVerticalPadding,
    ),
  ])
  const headerHeight = GetSearchHeaderHeight.getSearchHeaderHeight(flags, messageHeight, warningHeight)
  const total = results.length
  const contentHeight = total * itemHeight
  const listHeight = height - headerHeight
  const scrollBarHeight = ScrollBarFunctions.getScrollBarSize(height, contentHeight, minimumSliderSize)
  const numberOfVisible = GetNumberOfVisibleItems.getNumberOfVisibleItems(listHeight, itemHeight)
  const maxLineY = Math.min(numberOfVisible, total)
  const finalDeltaY = Math.max(contentHeight - listHeight, 0)
  const visible = results.slice(0, maxLineY)
  const { icons, newFileIconCache } = await GetFileIcons.getFileIcons(visible, fileIconCache)
  const latest = SearchViewStates.get(uid)
  if (latest.newState.searchId !== searchId) {
    return state
  }
  const updatedState = {
    ...latest.newState,
    collapsedPaths: [],
    deltaY: 0,
    fileCount,
    fileIconCache: newFileIconCache,
    finalDeltaY,
    headerHeight,
    icons,
    items: results,
    limitHit,
    limitHitWarning,
    listItems: results,
    loaded: true,
    matchCount: resultCount,
    maxLineY: maxLineY,
    message,
    messageHeight,
    minLineY: 0,
    scrollBarHeight,
    searchId,
    searchInputErrorMessage: '',
    threads,
    value,
  }
  SearchViewStates.set(uid, latest.oldState, updatedState)
  return state
}
