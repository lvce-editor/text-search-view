import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetListIndex from '../GetListIndex/GetListIndex.ts'
import * as InputName from '../InputName/InputName.ts'
import { removeIndex } from '../RemoveIndex/RemoveIndex.ts'
import * as SelectIndex from '../SelectIndex/SelectIndex.ts'

export const handleClickAt = async (state: SearchState, eventX: number, eventY: number, name: string): Promise<SearchState> => {
  const { deltaY, headerHeight, itemHeight, listItems, x, y } = state
  const index = GetListIndex.getListIndex(eventX, eventY, x, y, deltaY, itemHeight, headerHeight, listItems.length)
  const isRemoveButton = name === InputName.Remove
  if (isRemoveButton) {
    return removeIndex(state, index)
  }
  return SelectIndex.selectIndex(state, index)
}
