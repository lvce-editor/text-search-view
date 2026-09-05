import * as MeasureTextBlockHeight from '../MeasureTextBlockHeight/MeasureTextBlockHeight.ts'

export const getSearchWarningMessageHeight = async (
  limitHitWarning: string,
  width: number,
  fontFamily: string,
  fontSize: number,
  lineHeight: number,
  horizontalPadding: number,
  verticalPadding: number,
): Promise<number> => {
  if (!limitHitWarning) {
    return 0
  }
  const availableWidth = Math.max(width - horizontalPadding, 1)
  const textHeight = await MeasureTextBlockHeight.measureTextHeight(limitHitWarning, fontFamily, fontSize, lineHeight, availableWidth)
  return textHeight + verticalPadding
}
