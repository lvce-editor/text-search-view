import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

const focusedClassName = MergeClassNames.mergeClassNames(ClassNames.TreeItem, ClassNames.TreeItemActive)

export const getSearchResultClassName = (focused: boolean): string => {
  if (focused) {
    return focusedClassName
  }
  return ClassNames.TreeItem
}
