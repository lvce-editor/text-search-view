import type { SearchResult } from '../SearchResult/SearchResult.ts'
import { createParentFolderTree } from '../CreateTree/CreateTree.ts'
import { createFullParentFolderTree } from '../EnsureDenseTree/EnsureDenseTree.ts'
import { mergeTrees } from '../MergeTrees/MergeTrees.ts'
import { treeToList } from '../TreeToList/TreeToList.ts'

export const getTreeListItems = (results: readonly SearchResult[], root: string): readonly SearchResult[] => {
  const tree = createParentFolderTree(results)
  const folders = Object.keys(tree)
  const denseTree = createFullParentFolderTree(folders)
  const merged = mergeTrees(denseTree, tree)
  const newList = treeToList(merged, root)
  return newList
}
