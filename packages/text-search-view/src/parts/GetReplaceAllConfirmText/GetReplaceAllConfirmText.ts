import * as ViewletSearchStrings from '../SearchStrings/SearchStrings.ts'

export const getReplaceAllConfirmText = (matchCount: number, fileCount: number, replacement: string): string => {
  if (matchCount === 1) {
    if (replacement) {
      return ViewletSearchStrings.confirmReplaceOneOccurrenceInOneFile(replacement)
    }
    return ViewletSearchStrings.confirmReplaceOneOccurrenceInOneFileNoValue()
  }
  if (fileCount === 1) {
    if (replacement) {
      return ViewletSearchStrings.confirmReplaceManyOccurrencesInOneFile(matchCount, replacement)
    }
    return ViewletSearchStrings.confirmReplaceManyOccurrencesInOneFileNoValue(matchCount)
  }
  if (replacement) {
    return ViewletSearchStrings.confirmReplaceManyOccurrencesInManyFiles(matchCount, fileCount, replacement)
  }
  return ViewletSearchStrings.confirmReplaceManyOccurrencesInManyFilesNoValue(matchCount, fileCount)
}
