import type { SearchState } from '../SearchState/SearchState.ts'
import * as CreateViewModel from '../CreateViewModel/CreateViewModel.ts'
import * as GetSearchVirtualDom from '../GetSearchVirtualDom/GetSearchVirtualDom.ts'

export const getDom = (newState: SearchState): readonly any[] => {
  const viewModel = CreateViewModel.createViewModel(newState)
  const dom = GetSearchVirtualDom.getSearchVirtualDom(
    viewModel.displayResults,
    viewModel.flags,
    viewModel.message,
    viewModel.focusOutline,
    viewModel.searchInputErrorMessage,
    viewModel.scrollBarHeight,
    viewModel.scrollBarY,
    viewModel.scrollBarValue,
    viewModel.deltaY,
    viewModel.itemHeight,
    viewModel.matchCount,
    newState.limitHitWarning,
    viewModel.focus,
    newState.initial,
  )
  return dom
}
