import * as SearchStrings from '../SearchStrings/SearchStrings.ts'

export const getReplacedMessage = (fileCount: number, replaceCount: number, replacement: string): string => {
  if (replacement === '') {
    if (replaceCount === 1) {
      return SearchStrings.replacedOneOccurrenceInOneFileNoValue()
    }
    if (fileCount === 1) {
      return SearchStrings.replacedManyOccurrencesInOneFileNoValue(replaceCount)
    }
    return SearchStrings.replacedManyOccurrencesInManyFilesNoValue(replaceCount, fileCount)
  }
  if (replaceCount === 1) {
    return SearchStrings.replacedOneOccurrenceInOneFile(replacement)
  }
  if (fileCount === 1) {
    return SearchStrings.replacedManyOccurrencesInOneFile(replaceCount, replacement)
  }
  return SearchStrings.replacedManyOccurrencesInManyFiles(replaceCount, fileCount, replacement)
}
