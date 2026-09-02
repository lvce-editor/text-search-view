import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

export const getSearchResultClassName = (focused: boolean): string => {
  if (focused) {
    return MergeClassNames.mergeClassNames(ClassNames.TreeItem, ClassNames.TreeItemActive)
  }
  return ClassNames.TreeItem
}
