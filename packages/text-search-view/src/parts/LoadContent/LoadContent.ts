import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetSearchExcludes from '../GetSearchExcludes/GetSearchExcludes.ts'
import * as GetSearchHeaderHeight from '../GetSearchHeaderHeight/GetSearchHeaderHeight.ts'
import * as GetSearchWarningMessageHeight from '../GetSearchWarningMessageHeight/GetSearchWarningMessageHeight.ts'
import * as GetUsePullBasedSearch from '../GetUsePullBasedSearch/GetUsePullBasedSearch.ts'
import * as ViewletSearchHandleUpdate from '../HandleUpdate/HandleUpdate.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as RestoreState from '../RestoreState/RestoreState.ts'

export const loadContent = async (state: SearchState, savedState: unknown): Promise<SearchState> => {
  const { defaultExcludes: currentDefaultExcludes, limitHitWarning, messageHeight, width } = state
  const { excludeValue, flags, includeValue, replacement, savedCollapsedPaths, savedValue, threads } = RestoreState.restoreState(savedState)
  const defaultExcludes = await GetSearchExcludes.getSearchExcludes(currentDefaultExcludes)
  const usePullBasedSearch = await GetUsePullBasedSearch.getUsePullBasedSearch()
  const warningHeight = await GetSearchWarningMessageHeight.getSearchWarningMessageHeight(limitHitWarning, width)
  const headerHeight = GetSearchHeaderHeight.getSearchHeaderHeight(flags, messageHeight, warningHeight)

  const update: Partial<SearchState> = {
    collapsedPaths: savedCollapsedPaths,
    defaultExcludes,
    excludeValue,
    flags,
    focus: 0, // TODO
    headerHeight,
    includeValue,
    inputSource: InputSource.Script,
    replacement,
    threads,
    usePullBasedSearch,
    value: savedValue,
  }
  if (savedValue) {
    const result = await ViewletSearchHandleUpdate.handleUpdate(
      {
        ...state,
        usePullBasedSearch,
      },
      update,
    )
    return {
      ...result,
      initial: false,
      loaded: true,
    }
  }
  return {
    ...state,
    ...update,
    flags,
    initial: false,
    loaded: true,
    threads,
    usePullBasedSearch,
  }
}
