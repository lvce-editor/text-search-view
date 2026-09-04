import type { SearchResult } from '../SearchResult/SearchResult.ts'
import type { Tree } from '../Tree/Tree.ts'
import * as Path from '../Path/Path.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const addFolder = (tree: Record<string, SearchResult[]>, path: string): void => {
  const parentPath = Path.dirname2(path)
  const name = Path.basename2(path)
  tree[parentPath] ||= []
  tree[parentPath].push({
    end: 0,
    isDirectory: true,
    lineNumber: 0,
    start: 0,
    text: name,
    type: TextSearchResultType.File,
  })
}

export const createFullParentFolderTree = (folders: readonly string[]): Tree => {
  const denseTree: Record<string, SearchResult[]> = Object.create(null)
  const seenFolders = new Set<string>()
  for (const path of folders) {
    let currentPath = path
    while (currentPath !== '') {
      if (!seenFolders.has(currentPath)) {
        seenFolders.add(currentPath)
        addFolder(denseTree, currentPath)
      }
      const parentPath = Path.dirname2(currentPath)
      currentPath = parentPath
    }
  }

  return denseTree
}
