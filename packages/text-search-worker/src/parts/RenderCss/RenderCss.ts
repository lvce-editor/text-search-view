import { ViewletCommand } from '@lvce-editor/constants'
import type { SearchState } from '../SearchState/SearchState.ts'
import { createViewModel } from '../CreateViewModel/CreateViewModel.ts'
import { getCss } from '../GetCss/GetCss.ts'
import { getUniqueIndents } from '../GetUniqueIndents/GetUniqueIndents.ts'
import * as TreeItemPadding from '../TreeItemPadding/TreeItemPadding.ts'

export const renderCss = (oldState: SearchState, newState: SearchState): readonly any[] => {
  const { headerHeight, uid } = newState
  const viewModel = createViewModel(newState)
  const indents = viewModel.displayResults.map((item) => item.indent)
  const uniqueIndents = getUniqueIndents(indents)
  const uniqueIndentRights = [TreeItemPadding.PaddingRight]
  const treeItemsTop = viewModel.itemHeight === 0 ? 0 : Math.round(-(viewModel.deltaY % viewModel.itemHeight))
  const css = getCss(0, uniqueIndents, uniqueIndentRights, viewModel.scrollBarHeight, viewModel.scrollBarY, treeItemsTop, headerHeight)
  return [ViewletCommand.SetCss, uid, css]
}
