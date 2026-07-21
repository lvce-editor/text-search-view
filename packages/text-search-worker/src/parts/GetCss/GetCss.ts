const getIndentRule = (indent: number): string => {
  return `.Indent-${indent} {
  padding-left: ${indent}px;
}`
}

const getIndentRightRule = (indentRight: number): string => {
  return `.IndentRight-${indentRight} {
  padding-right: ${indentRight}px;
}`
}

const getTreeItemsTopRule = (treeItemsTop: number): string => {
  const roundedTreeItemsTop = Math.round(treeItemsTop)
  return `.TreeItemsTop-${roundedTreeItemsTop} {
  top: ${roundedTreeItemsTop}px;
}`
}

const getScrollBarThumbTopRule = (scrollBarY: number): string => {
  const roundedScrollBarY = Math.round(scrollBarY)
  return `.ScrollBarThumbTop-${roundedScrollBarY} {
  transform: translateY(${roundedScrollBarY}px);
}`
}

export const getCss = (
  top: number,
  uniqueIndents: readonly number[],
  uniqueIndentRights: readonly number[],
  scrollBarHeight: number,
  scrollBarY: number,
  treeItemsTop: number,
  headerHeight: number = 0,
): string => {
  const rules = [
    `.Search {
  --ScrollBarHeight: ${scrollBarHeight}px;
  --ScrollBarTop: ${scrollBarY}px;
  --TreeItemsTop: ${top}px;
}

.SearchHeader {
  contain: strict;
  height: ${headerHeight}px;
}
  `,

    ...uniqueIndents.map(getIndentRule),
    ...uniqueIndentRights.map(getIndentRightRule),
    getTreeItemsTopRule(treeItemsTop),
    getScrollBarThumbTopRule(scrollBarY),
  ]
  return rules.join('\n')
}
