import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetSearchHeaderHeight from '../GetSearchHeaderHeight/GetSearchHeaderHeight.ts'
import * as GetSearchWarningMessageHeight from '../GetSearchWarningMessageHeight/GetSearchWarningMessageHeight.ts'
import * as ViewletSearchHandleUpdate from '../HandleUpdate/HandleUpdate.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import { loadPreferences } from '../LoadPreferences/LoadPreferences.ts'
import * as RestoreState from '../RestoreState/RestoreState.ts'
import * as SearchViewStates from '../SearchViewStates/SearchViewStates.ts'

export const loadContent = async (state: SearchState, savedState: unknown, context?: unknown): Promise<SearchState> => {
  const {
    defaultExcludes: currentDefaultExcludes,
    isSearchEditor,
    limitHitWarning,
    messageHeight,
    searchWarningFontFamily,
    searchWarningFontSize,
    searchWarningHorizontalPadding,
    searchWarningLineHeight,
    searchWarningVerticalPadding,
    uid,
    width,
  } = state
  const restoreSource = savedState ?? context
  const { excludeValue, flags, includeValue, replacement, savedCollapsedPaths, savedValue, threads } = RestoreState.restoreState(restoreSource)
  const {
    defaultExcludes,
    maxResults,
    showOpenInEditorLink: preferenceShowOpenInEditorLink,
    usePullBasedSearch,
  } = await loadPreferences(currentDefaultExcludes)
  const showOpenInEditorLink = preferenceShowOpenInEditorLink && !isSearchEditor
  const warningHeight = await GetSearchWarningMessageHeight.getSearchWarningMessageHeight(
    limitHitWarning,
    width,
    searchWarningFontFamily,
    searchWarningFontSize,
    searchWarningLineHeight,
    searchWarningHorizontalPadding,
    searchWarningVerticalPadding,
  )
  const headerHeight = GetSearchHeaderHeight.getSearchHeaderHeight(flags, messageHeight, warningHeight)

  const update: Partial<SearchState> = {
    collapsedPaths: savedCollapsedPaths,
    defaultExcludes,
    excludeValue,
    flags,
    focus: WhenExpression.FocusSearchInput,
    focusSource: InputSource.Script,
    headerHeight,
    includeValue,
    inputSource: InputSource.Script,
    limit: maxResults,
    replacement,
    showOpenInEditorLink,
    threads,
    usePullBasedSearch,
    value: savedValue,
  }
  if (savedValue) {
    const searchState = {
      ...state,
      usePullBasedSearch,
    }
    const result = await ViewletSearchHandleUpdate.handleUpdate(searchState, update)
    // Search handlers publish results directly and return their input state.
    const restoredState = result === searchState ? SearchViewStates.get(uid).newState : result
    return {
      ...restoredState,
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
    showOpenInEditorLink,
    threads,
    usePullBasedSearch,
  }
}
