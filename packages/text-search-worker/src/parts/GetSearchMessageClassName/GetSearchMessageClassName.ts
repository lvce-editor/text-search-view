import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

export const getSearchMessageClassName = (indented: boolean): string => {
  if (indented) {
    return MergeClassNames.mergeClassNames(ClassNames.ViewletSearchMessage, ClassNames.ViewletSearchMessageIndented)
  }
  return ClassNames.ViewletSearchMessage
}
