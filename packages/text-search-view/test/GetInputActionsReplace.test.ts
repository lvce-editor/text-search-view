import { expect, test } from '@jest/globals'
import * as GetInputActionsReplace from '../src/parts/GetInputActionsReplace/GetInputActionsReplace.ts'
import * as InputActionFlag from '../src/parts/InputActionFlag/InputActionFlag.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

test('getInputActionsReplace - replace all button disabled when no results', () => {
  const flags = 0
  const matchCount = 0
  const result = GetInputActionsReplace.getInputActionsReplace(flags, matchCount)
  expect(result.outside[0].flag).toBe(InputActionFlag.ButtonDisabled)
})

test('getInputActionsReplace - replace all button enabled when results exist', () => {
  const flags = 0
  const matchCount = 5
  const result = GetInputActionsReplace.getInputActionsReplace(flags, matchCount)
  expect(result.outside[0].flag).toBe(InputActionFlag.ButtonEnabled)
})

test('getInputActionsReplace - preserve case checked when flag is set', () => {
  const flags = SearchFlags.PreserveCase
  const matchCount = 0
  const result = GetInputActionsReplace.getInputActionsReplace(flags, matchCount)
  expect(result.inside[0].flag).toBe(InputActionFlag.CheckBoxEnabled)
})
