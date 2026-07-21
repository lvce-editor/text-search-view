import * as MeasureTextBlockHeight from '../MeasureTextBlockHeight/MeasureTextBlockHeight.ts'

const SearchWarningFontFamily = 'system-ui'
const SearchWarningFontSize = 12
const SearchWarningLineHeight = 18
const SearchWarningHorizontalPadding = 10
const SearchWarningVerticalPadding = 8

export const getSearchWarningMessageHeight = async (limitHitWarning: string, width: number): Promise<number> => {
  if (!limitHitWarning) {
    return 0
  }
  const availableWidth = Math.max(width - SearchWarningHorizontalPadding, 1)
  const textHeight = await MeasureTextBlockHeight.measureTextHeight(
    limitHitWarning,
    SearchWarningFontFamily,
    SearchWarningFontSize,
    SearchWarningLineHeight,
    availableWidth,
  )
  return textHeight + SearchWarningVerticalPadding
}
