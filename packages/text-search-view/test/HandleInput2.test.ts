import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleExcludeInput from '../src/parts/HandleExcludeInput/HandleExcludeInput.ts'
import * as HandleIncludeInput from '../src/parts/HandleIncludeInput/HandleIncludeInput.ts'
import { handleInput2 } from '../src/parts/HandleInput2/HandleInput2.ts'
import * as HandleInput from '../src/parts/HandleInput/HandleInput.ts'
import * as HandleReplaceInput from '../src/parts/HandleReplaceInput/HandleReplaceInput.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'

test('handleInput2 - delegates search input with default script source', async () => {
  const state: SearchState = CreateDefaultState.createDefaultState()
  const expected = await HandleInput.handleInput(state, '', InputSource.Script)
  const result = await handleInput2(state, InputName.SearchValue, '')

  expect(result).toEqual(expected)
})

test('handleInput2 - delegates replace input with provided source', async () => {
  const state: SearchState = CreateDefaultState.createDefaultState()
  const expected = await HandleReplaceInput.handleReplaceInput(state, 'replace', InputSource.User)
  const result = await handleInput2(state, InputName.ReplaceValue, 'replace', InputSource.User)

  expect(result).toEqual(expected)
})

test('handleInput2 - delegates include input', async () => {
  const state: SearchState = CreateDefaultState.createDefaultState()
  const expected = await HandleIncludeInput.handleIncludeInput(state, '*.ts', InputSource.User)
  const result = await handleInput2(state, InputName.FilesToInclude, '*.ts', InputSource.User)

  expect(result).toEqual(expected)
})

test('handleInput2 - delegates exclude input', async () => {
  const state: SearchState = CreateDefaultState.createDefaultState()
  const expected = await HandleExcludeInput.handleExcludeInput(state, 'node_modules', InputSource.User)
  const result = await handleInput2(state, InputName.FilesToExclude, 'node_modules', InputSource.User)

  expect(result).toEqual(expected)
})

test('handleInput2 - throws for unknown input name', async () => {
  const state: SearchState = CreateDefaultState.createDefaultState()

  expect(() => handleInput2(state, 'UnknownInput', 'test')).toThrow('unknown input handler: UnknownInput')
})
