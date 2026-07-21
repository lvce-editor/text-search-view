import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetInputHandler from '../GetInputHandler/GetInputHandler.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const handleInput2 = (state: SearchState, inputName: string, value: string, inputSource = InputSource.Script): Promise<SearchState> => {
  const fn = GetInputHandler.getInputHandler(inputName)
  return fn(state, value, inputSource)
}
