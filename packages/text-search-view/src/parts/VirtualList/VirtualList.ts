export const create = ({
  headerHeight = 0,
  itemHeight,
  minimumSliderSize = 20,
}: {
  readonly itemHeight: number
  readonly headerHeight: number
  readonly minimumSliderSize: number
}): any => {
  return {
    deltaY: 0,
    finalDeltaY: 0,
    focusedIndex: -1,
    headerHeight,
    itemHeight,
    items: [],
    listItems: [],
    maxLineY: 0,
    minimumSliderSize,
    minLineY: 0,
    scrollBarActive: false,
    scrollBarHeight: 0,
    touchDifference: 0,
    touchOffsetY: 0,
    touchTimeStamp: 0,
  }
}
