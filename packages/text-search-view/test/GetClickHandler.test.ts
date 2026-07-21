import { expect, test } from '@jest/globals'
import * as FocusReplaceValue from '../src/parts/FocusReplaceValue/FocusReplaceValue.ts'
import * as FocusSearchValue from '../src/parts/FocusSearchValue/FocusSearchValue.ts'
import * as GetClickHandler from '../src/parts/GetClickHandler/GetClickHandler.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import * as ReplaceAll from '../src/parts/ReplaceAll/ReplaceAll.ts'
import * as ToggleDetailsExpanded from '../src/parts/ToggleDetailsExpanded/ToggleDetailsExpanded.ts'
import * as ToggleMatchCase from '../src/parts/ToggleMatchCase/ToggleMatchCase.ts'
import * as ToggleMatchWholeWord from '../src/parts/ToggleMatchWholeWord/ToggleMatchWholeWord.ts'
import * as ToggleOpenEditors from '../src/parts/ToggleOpenEditors/ToggleOpenEditors.ts'
import * as TogglePreserveCase from '../src/parts/TogglePreserveCase/TogglePreserveCase.ts'
import * as ToggleReplace from '../src/parts/ToggleReplace/ToggleReplace.ts'
import * as ToggleUseIgnoreFiles from '../src/parts/ToggleUseIgnoreFiles/ToggleUseIgnoreFiles.ts'
import * as ToggleUseRegularExpression from '../src/parts/ToggleUseRegularExpression/ToggleUseRegularExpression.ts'

test('getClickHandler - returns correct handlers', () => {
  expect(GetClickHandler.getClickHandler(InputName.MatchCase)).toBe(ToggleMatchCase.toggleMatchCase)
  expect(GetClickHandler.getClickHandler(InputName.ToggleReplace)).toBe(ToggleReplace.toggleReplace)
  expect(GetClickHandler.getClickHandler(InputName.UseRegularExpression)).toBe(ToggleUseRegularExpression.toggleUseRegularExpression)
  expect(GetClickHandler.getClickHandler(InputName.ReplaceAll)).toBe(ReplaceAll.replaceAll)
  expect(GetClickHandler.getClickHandler(InputName.ReplaceValue)).toBe(FocusReplaceValue.focusReplaceValue)
  expect(GetClickHandler.getClickHandler(InputName.MatchWholeWord)).toBe(ToggleMatchWholeWord.toggleMatchWholeWord)
  expect(GetClickHandler.getClickHandler(InputName.PreserveCase)).toBe(TogglePreserveCase.togglePreserveCase)
  expect(GetClickHandler.getClickHandler(InputName.SearchValue)).toBe(FocusSearchValue.focusSearchValue)
  expect(GetClickHandler.getClickHandler(InputName.ToggleSearchDetails)).toBe(ToggleDetailsExpanded.toggleDetailsExpanded)
  expect(GetClickHandler.getClickHandler(InputName.SearchOnlyOpenEditors)).toBe(ToggleOpenEditors.toggleOpenEditors)
  expect(GetClickHandler.getClickHandler(InputName.UseExcludeSettings)).toBe(ToggleUseIgnoreFiles.toggleUseIgnoreFiles)
})

test('getClickHandler - handles invalid input', () => {
  expect(GetClickHandler.getClickHandler('invalid-name')).toBeDefined()
})
