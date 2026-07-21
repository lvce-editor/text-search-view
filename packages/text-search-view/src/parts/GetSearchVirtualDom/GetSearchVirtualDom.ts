import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DisplaySearchResult } from '../DisplaySearchResult/DisplaySearchResult.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetSearchHeaderVirtualDom from '../GetSearchHeaderVirtualDom/GetSearchHeaderVirtualDom.ts'
import * as GetSearchInputErrorVirtualDom from '../GetSearchInputErrorVirtualDom/GetSearchInputErrorVirtualDom.ts'
import * as GetSearchResultsVirtualDom from '../GetSearchResultsVirtualDom/GetSearchResultsVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

const className = MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.Search)

export const getSearchVirtualDom = (
  visibleItems: readonly DisplaySearchResult[],
  flags: number,
  message: string,
  focusOutline: boolean,
  searchInputErrorMessage: string,
  scrollBarHeight: number,
  scrollBarY: number,
  scrollBarValue: number,
  deltaY: number,
  itemHeight: number,
  matchCount: number,
  limitHitWarning: string,
  focus: number = 0,
  initial: boolean = false,
): readonly VirtualDomNode[] => {
  if (initial) {
    return []
  }
  const errorDom = GetSearchInputErrorVirtualDom.getSearchInputErrorVirtualDom(searchInputErrorMessage)
  const childCount = 2 + (errorDom.length > 0 ? 1 : 0)

  return [
    {
      childCount,
      className,
      type: VirtualDomElements.Div,
    },
    ...GetSearchHeaderVirtualDom.getSearchHeaderVirtualDom(flags, message, searchInputErrorMessage, matchCount, focus, limitHitWarning),
    ...errorDom,
    ...GetSearchResultsVirtualDom.getSearchResultsVirtualDom(
      visibleItems,
      focusOutline,
      scrollBarHeight,
      scrollBarY,
      scrollBarValue,
      deltaY,
      itemHeight,
    ),
  ]
}
