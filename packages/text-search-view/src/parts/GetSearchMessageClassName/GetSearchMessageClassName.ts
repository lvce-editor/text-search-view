import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

const indentedClassName = MergeClassNames.mergeClassNames(ClassNames.ViewletSearchMessage, ClassNames.ViewletSearchMessageIndented)

export const getSearchMessageClassName = (indented: boolean): string => {
  if (indented) {
    return indentedClassName
  }
  return ClassNames.ViewletSearchMessage
}
