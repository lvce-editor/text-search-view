import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetSearchHeaderHeight from '../GetSearchHeaderHeight/GetSearchHeaderHeight.ts'
import * as GetSearchWarningMessageHeight from '../GetSearchWarningMessageHeight/GetSearchWarningMessageHeight.ts'
import * as ViewletSearchHandleUpdate from '../HandleUpdate/HandleUpdate.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import { loadPreferences } from '../LoadPreferences/LoadPreferences.ts'
import * as RestoreState from '../RestoreState/RestoreState.ts'

export const loadContent = async (state: SearchState, savedState: unknown): Promise<SearchState> => {
  const { defaultExcludes: currentDefaultExcludes, limitHitWarning, messageHeight, width } = state
  const { excludeValue, flags, includeValue, replacement, savedCollapsedPaths, savedValue, threads } = RestoreState.restoreState(savedState)
  const { defaultExcludes, usePullBasedSearch } = await loadPreferences(currentDefaultExcludes)
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
