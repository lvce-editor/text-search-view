import type { DisplaySearchResult } from '../DisplaySearchResult/DisplaySearchResult.ts'
import type { SearchResult } from '../SearchResult/SearchResult.ts'
import * as ExpandedType from '../ExpandedType/ExpandedType.ts'
import * as GetMatchCount from '../GetMatchCount/GetMatchCount.ts'
import * as GetTreeItemIndent from '../GetTreeItemIndent/GetTreeItemIndent.ts'
import * as Path from '../Path/Path.ts'
import * as Workspace from '../Workspace/Workspace.ts'

export const getSearchDisplayResultFile = (
  results: readonly SearchResult[],
  fileIcons: readonly string[],
  i: number,
  setSize: number,
  collapsedPaths: readonly string[],
  text: string,
  posInSet: number,
  relativeIndex: number,
  focused: boolean,
  renderFolderPaths: boolean,
  originalResults: readonly SearchResult[],
  resultDepth: number | undefined,
  isDirectory: boolean | undefined,
): DisplaySearchResult => {
  const path = text
  const absolutePath = Workspace.getRelativePath(path)
  const baseName = Workspace.pathBaseName(path)
  const relativeFolderPath = Workspace.getRelativeFolderPath(path)
  const displayText = renderFolderPaths && relativeFolderPath && !isDirectory ? `${baseName} — ${relativeFolderPath}` : baseName
  const normalizedPath = Path.normalizeRelativePath(path)
  const index = originalResults.findIndex((result) => result.type === results[i].type && Path.normalizeRelativePath(result.text) === normalizedPath)
  const matchCount = isDirectory ? 0 : GetMatchCount.getMatchCount(originalResults, index)
  const expanded = collapsedPaths.includes(path) ? ExpandedType.Collapsed : ExpandedType.Expanded
  const badgeText = isDirectory ? '' : String(matchCount)
  const depth = resultDepth ?? 0
  const indent = GetTreeItemIndent.getTreeItemIndent(depth)
  return {
    badgeText,
    depth,
    expanded,
    focused,
    icon: isDirectory ? '' : fileIcons[relativeIndex],
    indent,
    matchLength: 0,
    matchStart: 0,
    posInSet,
    replacement: '',
    setSize,
    text: displayText,
    title: absolutePath,
  }
}
