import { TextMeasurementWorker } from '@lvce-editor/rpc-registry'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'
import * as SearchMessageHeight from '../SearchMessageHeight/SearchMessageHeight.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'

export const getSearchMessageHeight = async (
  message: string,
  width: number,
  flags: number,
  fontFamily: string,
  fontSize: number,
  lineHeight: number,
  collapsedHorizontalSpace: number,
  expandedHorizontalSpace: number,
  showOpenInEditorLink = false,
): Promise<number> => {
  if (!message) {
    return SearchMessageHeight.Minimum
  }
  const horizontalSpace = SearchFlags.hasDetailsExpanded(flags) ? expandedHorizontalSpace : collapsedHorizontalSpace
  const availableWidth = Math.max(width - horizontalSpace, 1)
  const messageText = showOpenInEditorLink ? `${message} - ${SearchStrings.openInEditor()}` : message
  const textHeight = await TextMeasurementWorker.invoke(
    'TextMeasurement.measureTextBlockHeight',
    messageText,
    fontFamily,
    fontSize,
    lineHeight,
    availableWidth,
  )
  return Math.max(textHeight + SearchMessageHeight.VerticalPadding, SearchMessageHeight.Minimum)
}
