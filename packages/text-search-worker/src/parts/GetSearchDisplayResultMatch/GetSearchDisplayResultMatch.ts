import type { DisplaySearchResult } from '../DisplaySearchResult/DisplaySearchResult.ts'
import * as ExpandedType from '../ExpandedType/ExpandedType.ts'
import * as GetTreeItemIndent from '../GetTreeItemIndent/GetTreeItemIndent.ts'

export const getDisplayResultMatch = (
  setSize: number,
  searchTermLength: number,
  replacement: string,
  text: string,
  posInSet: number,
  start: number,
  focused: boolean,
): DisplaySearchResult => {
  const depth = 1
  const indent = GetTreeItemIndent.getTreeItemIndent(depth)
  return {
    badgeText: '',
    depth,
    expanded: ExpandedType.None,
    focused,
    icon: '',
    indent,
    matchLength: searchTermLength,
    matchStart: start,
    posInSet,
    replacement,
    setSize,
    text: text,
    title: text.trim(),
  }
}
