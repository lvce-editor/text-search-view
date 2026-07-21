import type { SelectHandler } from '../SelectHandler/SelectHandler.ts'
import * as SelectIndexFile from '../SelectIndexFile/SelectIndexFile.ts'
import * as SelectIndexPreview from '../SelectIndexPreview/SelectIndexPreview.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

export const getSelectHandler = (type: number): SelectHandler => {
  switch (type) {
    case TextSearchResultType.File:
      return SelectIndexFile.selectIndexFile
    case TextSearchResultType.Match:
      return SelectIndexPreview.selectIndexPreview
    default:
      throw new Error(`unexpected search result type ${type}`)
  }
}
