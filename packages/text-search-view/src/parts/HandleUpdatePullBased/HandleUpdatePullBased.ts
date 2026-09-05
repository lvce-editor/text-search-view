import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetProtocol from '../GetProtocol/GetProtocol.ts'
import * as GetSearchHeaderHeight from '../GetSearchHeaderHeight/GetSearchHeaderHeight.ts'
import * as GetSearchMessageHeight from '../GetSearchMessageHeight/GetSearchMessageHeight.ts'
import * as GetSearchWarningMessageHeight from '../GetSearchWarningMessageHeight/GetSearchWarningMessageHeight.ts'
import { getTextSearchResultCounts } from '../GetTextSearchResultCounts/GetTextSearchResultCounts.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'
import { getStatusMessage } from '../SearchStatusMessage/SearchStatusMessage.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'
import { get, set } from '../SearchViewStates/SearchViewStates.ts'
import * as TextSearch from '../TextSearch/TextSearch.ts'

const getSearchId = (): string => {
  return crypto.randomUUID()
}

export const handleUpdatePullBased = async (state: SearchState, update: Partial<SearchState>): Promise<SearchState> => {
  const { uid: previousUid, workspaceUri } = state
  const searchId = getSearchId()
  const partialNewState: SearchState = { ...state, ...update, items: [], listItems: [], message: '', searchId, searchResults: [] }
  set(previousUid, state, partialNewState)
  const {
    assetDir,
    contextLines,
    contextLinesEnabled,
    excludeValue,
    flags,
    includeValue,
    limit,
    platform,
    threads,
    uid,
    usePullBasedSearch,
    value,
    width,
  } = partialNewState
  const root = workspaceUri
  const scheme = GetProtocol.getProtocol(root)
  const isFileSearch = scheme === '' || scheme === 'file'
  const shouldUsePullBasedSearch = usePullBasedSearch && isFileSearch
  const { limitHit } = await TextSearch.textSearch(
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

  const latest = get(uid)
  if (!latest) {
    return state
  }
  if (latest.newState.searchId !== searchId) {
    return state
  }
  const limitHitWarning = limitHit ? SearchStrings.theResultSetOnlyContainsASubSetOfMatches() : ''
  const { fileCount, resultCount } = getTextSearchResultCounts(latest.newState.items)
  const message = getStatusMessage(resultCount, fileCount)
  const [messageHeight, warningHeight] = await Promise.all([
    GetSearchMessageHeight.getSearchMessageHeight(message, width, flags),
    GetSearchWarningMessageHeight.getSearchWarningMessageHeight(limitHitWarning, width),
  ])
  const current = get(uid)
  if (current.newState.searchId !== searchId) {
    return state
  }
  const headerHeight = GetSearchHeaderHeight.getSearchHeaderHeight(flags, messageHeight, warningHeight)
  const updatedState = {
    ...current.newState,
    headerHeight,
    limitHit,
    limitHitWarning,
    message,
    messageHeight,
  }
  set(uid, current.oldState, updatedState)
  return state
}
