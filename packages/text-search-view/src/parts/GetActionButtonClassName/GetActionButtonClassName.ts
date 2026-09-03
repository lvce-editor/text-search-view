import { ClassNames, mergeClassNames } from '@lvce-editor/virtual-dom-worker'

export const getActionButtonClassName = (enabled: boolean | undefined): string => {
  if (enabled) {
    return ClassNames.IconButton
  }
  return mergeClassNames(ClassNames.IconButton, ClassNames.IconButtonDisabled)
}
