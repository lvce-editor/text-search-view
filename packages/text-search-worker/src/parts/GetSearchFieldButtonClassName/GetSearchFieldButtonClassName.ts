import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import * as InputActionFlag from '../InputActionFlag/InputActionFlag.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

export const getSearchFieldButtonClassName = (flag: number): string => {
  return MergeClassNames.mergeClassNames(
    ClassNames.SearchFieldButton,
    flag === InputActionFlag.CheckBoxEnabled ? ClassNames.SearchFieldButtonChecked : '',
    flag === InputActionFlag.ButtonDisabled ? ClassNames.SearchFieldButtonDisabled : '',
  )
}
