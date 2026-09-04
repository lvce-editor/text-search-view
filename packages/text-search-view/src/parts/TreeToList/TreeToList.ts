import type { SearchResult } from '../SearchResult/SearchResult.ts'
import type { Tree } from '../Tree/Tree.ts'
import { join2 } from '../Path/Path.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const processChildren = (map: Tree, items: SearchResult[], path: string, depth: number): void => {
  const children = map[path]
  if (!children) {
    return
  }
  const count = children.length
  for (let i = 0; i < count; i++) {
    const child = children[i]
    if (child.type === TextSearchResultType.File) {
      const childPath = join2(path, child.text)
      items.push({
        ...child,
        depth,
        text: childPath,
      })
      processChildren(map, items, childPath, depth + 1)
    } else {
      items.push({
        ...child,
        depth,
      })
    }
  }
}

export const treeToList = (map: Tree): readonly SearchResult[] => {
  const items: SearchResult[] = []
  processChildren(map, items, '', 0)
  return items
}
