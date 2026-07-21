import type { SearchState } from '../SearchState/SearchState.ts'
import * as Assert from '../Assert/Assert.ts'
import * as Clamp from '../Clamp/Clamp.ts'
import * as GetNumberOfVisibleItems from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'

export const setDeltaY = (state: SearchState, value: number): SearchState => {
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

  // TODO update icons
  return {
    ...state,
    deltaY: newDeltaY,
    maxLineY,
    minLineY,
  }
}
