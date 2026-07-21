import { AriaRoles } from '@lvce-editor/constants'
import * as InputActionFlag from '../InputActionFlag/InputActionFlag.ts'

// TODO have have separate renderers for checkbox and button elements
export const getRole = (flag: number): string | undefined => {
  switch (flag) {
    case InputActionFlag.CheckBoxDisabled:
    case InputActionFlag.CheckBoxEnabled:
      return AriaRoles.CheckBox
    default:
      return undefined
  }
}
