import { ViewletCommand } from '@lvce-editor/constants'
import { diffTree } from '@lvce-editor/virtual-dom-worker'
import type { SearchState } from '../SearchState/SearchState.ts'
import { getDom } from '../RenderItems/RenderItems.ts'

// TODO cache rendered dom so that it can be used for dom diffing
export const renderIncremental = (oldState: SearchState, newState: SearchState): readonly any[] => {
  const newDom = getDom(newState)
  if (oldState.replacement !== newState.replacement) {
    return [ViewletCommand.SetDom2, newState.uid, newDom]
  }
  const oldDom = getDom(oldState)
  const patches = diffTree(oldDom, newDom)
  return [ViewletCommand.SetPatches, newState.uid, patches]
}
