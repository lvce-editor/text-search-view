export const getListIndex = (
  eventX: number,
  eventY: number,
  x: number,
  y: number,
  deltaY: number,
  itemHeight: number,
  topHeight: number,
  itemCount: number,
): number => {
  const relativeY = eventY - y - topHeight + deltaY
  const index = Math.floor(relativeY / itemHeight)
  if (index < 0 || index >= itemCount) {
    return -1
  }
  return index
}
