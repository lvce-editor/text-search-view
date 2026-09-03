import type { SearchResult } from '../SearchResult/SearchResult.ts'
import { createMatchTree } from '../CreateMatchTree/CreateMatchTree.ts'
import { createParentFolderTree } from '../CreateTree/CreateTree.ts'
import { createFullParentFolderTree } from '../EnsureDenseTree/EnsureDenseTree.ts'
import { mergeTrees } from '../MergeTrees/MergeTrees.ts'
import { treeToList } from '../TreeToList/TreeToList.ts'

export const getTreeListItems = (results: readonly SearchResult[]): readonly SearchResult[] => {
  const parentFolderTree = createParentFolderTree(results)
  const folders = Object.keys(parentFolderTree)
  const denseTree = createFullParentFolderTree(folders)
  const matchTree = createMatchTree(results)
  const merged = mergeTrees(mergeTrees(denseTree, parentFolderTree), matchTree)
  const newList = treeToList(merged)
  return newList
}
