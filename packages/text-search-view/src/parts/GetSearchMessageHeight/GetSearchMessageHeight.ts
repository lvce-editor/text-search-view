import { TextMeasurementWorker } from '@lvce-editor/rpc-registry'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'
import * as SearchMessageHeight from '../SearchMessageHeight/SearchMessageHeight.ts'

const SearchMessageFontFamily = 'system-ui'
const SearchMessageFontSize = 13
const SearchMessageLineHeight = 13
const SearchMessageCollapsedHorizontalSpace = 52
const SearchMessageExpandedHorizontalSpace = 30

export const getSearchMessageHeight = async (message: string, width: number, flags: number): Promise<number> => {
  if (!message) {
    return SearchMessageHeight.Minimum
  }
  const horizontalSpace = SearchFlags.hasDetailsExpanded(flags) ? SearchMessageExpandedHorizontalSpace : SearchMessageCollapsedHorizontalSpace
  const availableWidth = Math.max(width - horizontalSpace, 1)
  const textHeight = await TextMeasurementWorker.invoke(
    'TextMeasurement.measureTextBlockHeight',
    message,
    SearchMessageFontFamily,
    SearchMessageFontSize,
    SearchMessageLineHeight,
    availableWidth,
  )
  return Math.max(textHeight + SearchMessageHeight.VerticalPadding, SearchMessageHeight.Minimum)
}
