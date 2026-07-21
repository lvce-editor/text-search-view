import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetSearchWarningMessageHeight from '../GetSearchWarningMessageHeight/GetSearchWarningMessageHeight.ts'
import * as GetTopHeight from '../GetTopHeight/GetTopHeight.ts'
import * as GetUsePullBasedSearch from '../GetUsePullBasedSearch/GetUsePullBasedSearch.ts'
import * as ViewletSearchHandleUpdate from '../HandleUpdate/HandleUpdate.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as RestoreState from '../RestoreState/RestoreState.ts'

export const loadContent = async (state: SearchState, savedState: unknown): Promise<SearchState> => {
  const { limitHitWarning, width } = state
  const { excludeValue, flags, includeValue, replacement, savedCollapsedPaths, savedValue, threads } = RestoreState.restoreState(savedState)
  const usePullBasedSearch = await GetUsePullBasedSearch.getUsePullBasedSearch()
  const warningHeight = await GetSearchWarningMessageHeight.getSearchWarningMessageHeight(limitHitWarning, width)
  const headerHeight = GetTopHeight.getTopHeight(flags) + warningHeight

  const update: Partial<SearchState> = {
    collapsedPaths: savedCollapsedPaths,
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
