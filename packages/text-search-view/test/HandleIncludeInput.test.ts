import { expect, test } from '@jest/globals'
import type { SearchHeader } from '../src/parts/SearchHeader/SearchHeader.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleIncludeInput from '../src/parts/HandleIncludeInput/HandleIncludeInput.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'

test.skip('handleIncludeInput', () => {
  const initialState: SearchHeader = {
    ...CreateDefaultState.createDefaultState(),
    includeValue: '',
  }
  // @ts-ignore
  const newState = HandleIncludeInput.handleIncludeInput(initialState, '*.ts')
  // @ts-ignore
  expect(newState.includeValue).toBe('*.ts')
  // @ts-ignore
  expect(newState.focusSource).toBe(InputSource.User)
})
