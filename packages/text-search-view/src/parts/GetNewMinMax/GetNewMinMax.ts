interface MinMaxResult {
  newDeltaY: number
  newMaxLineY: number
  newMinLineY: number
}

export const getNewMinMax = (newItemsLength: number, minLineY: number, maxLineY: number, deltaY: number, itemHeight: number): MinMaxResult => {
  if (maxLineY > newItemsLength) {
    const diff = maxLineY - minLineY
    const newMinLineY = Math.max(newItemsLength - diff, 0)
    const newDeltaY = newMinLineY * itemHeight
    return {
      newDeltaY,
      newMaxLineY: newItemsLength,
      newMinLineY,
    }
  }
  return {
    newDeltaY: deltaY,
    newMaxLineY: maxLineY,
    newMinLineY: minLineY,
  }
}
