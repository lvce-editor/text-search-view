import { ClassNames, mergeClassNames } from '@lvce-editor/virtual-dom-worker'

const disabledClassName = mergeClassNames(ClassNames.IconButton, ClassNames.IconButtonDisabled)

export const getActionButtonClassName = (enabled: boolean | undefined): string => {
  if (enabled) {
    return ClassNames.IconButton
  }
  return disabledClassName
}
