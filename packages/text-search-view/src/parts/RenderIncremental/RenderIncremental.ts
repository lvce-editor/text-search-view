import { ViewletCommand } from '@lvce-editor/constants'
import { diffTree } from '@lvce-editor/virtual-dom-worker'
import type { SearchState } from '../SearchState/SearchState.ts'
import { getDom } from '../RenderItems/RenderItems.ts'

// TODO cache rendered dom so that it can be used for dom diffing
export const renderIncremental = (oldState: SearchState, newState: SearchState): readonly any[] => {
  const oldDom = getDom(oldState)
  const newDom = getDom(newState)
  const patches = diffTree(oldDom, newDom)
  return [ViewletCommand.SetPatches, newState.uid, patches]
}
