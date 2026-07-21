import type { InputHandler } from '../InputHandler/InputHandler.ts'
import * as HandleExcludeInput from '../HandleExcludeInput/HandleExcludeInput.ts'
import * as HandleIncludeInput from '../HandleIncludeInput/HandleIncludeInput.ts'
import * as HandleInput from '../HandleInput/HandleInput.ts'
import * as HandleReplaceInput from '../HandleReplaceInput/HandleReplaceInput.ts'
import * as InputName from '../InputName/InputName.ts'

export const getInputHandler = (name: string): InputHandler => {
  switch (name) {
    case InputName.FilesToExclude:
      return HandleExcludeInput.handleExcludeInput
    case InputName.FilesToInclude:
      return HandleIncludeInput.handleIncludeInput
    case InputName.ReplaceValue:
      return HandleReplaceInput.handleReplaceInput
    case InputName.SearchValue:
      return HandleInput.handleInput
    default:
      throw new Error(`unknown input handler: ${name}`)
  }
}
