import { ClassNames } from '@lvce-editor/virtual-dom-worker'

export const getSearchResultClassName = (focused: boolean): string => {
  if (focused) {
    return ClassNames.TreeItem + ' ' + ClassNames.TreeItemActive
  }
  return ClassNames.TreeItem
}
