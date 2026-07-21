import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetInputHandler from '../GetInputHandler/GetInputHandler.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const handleSharedInput = (state: SearchState, name: string, value: string, inputSource = InputSource.Script): Promise<SearchState> => {
  const fn = GetInputHandler.getInputHandler(name)
  return fn(state, value, inputSource)
}
