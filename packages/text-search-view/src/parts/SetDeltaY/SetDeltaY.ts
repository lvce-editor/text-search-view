import type { SearchState } from '../SearchState/SearchState.ts'
import * as Assert from '../Assert/Assert.ts'
import * as Clamp from '../Clamp/Clamp.ts'
import * as GetNumberOfVisibleItems from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'
import * as UpdateVisibleFileIcons from '../UpdateVisibleFileIcons/UpdateVisibleFileIcons.ts'

export const setDeltaY = async (state: SearchState, value: number): Promise<SearchState> => {
  Assert.object(state)
  Assert.number(value)
  const { deltaY, finalDeltaY, headerHeight, height, itemHeight, listItems } = state
  const listHeight = height - headerHeight
  const newDeltaY = Clamp.clamp(value, 0, finalDeltaY)
  if (deltaY === newDeltaY) {
    return state
  }
  // TODO when it only moves by one px, extensions don't need to be rerendered, only negative margin
  const minLineY = Math.floor(newDeltaY / itemHeight)
  const maxLineY = Math.min(minLineY + GetNumberOfVisibleItems.getNumberOfVisibleItems(listHeight, itemHeight), listItems.length)

  const updatedState = {
    ...state,
    deltaY: newDeltaY,
    maxLineY,
    minLineY,
  }
  return UpdateVisibleFileIcons.updateVisibleFileIconsWhenRangeChanges(state, updatedState)
}
