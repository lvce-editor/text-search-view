import * as SearchStrings from '../SearchStrings/SearchStrings.ts'

export const getReplacingMessage = (fileCount: number, replaceCount: number): string => {
  if (replaceCount === 1) {
    return SearchStrings.replacingOneOccurrenceInOneFile()
  }
  if (fileCount === 1) {
    return SearchStrings.replacingManyOccurrencesInOneFile(replaceCount)
  }
  return SearchStrings.replacingManyOccurrencesInManyFiles(replaceCount, fileCount)
}
