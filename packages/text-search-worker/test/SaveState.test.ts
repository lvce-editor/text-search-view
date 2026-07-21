import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { saveState } from '../src/parts/SaveState/SaveState.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

test('saveState', () => {
  const flags =
    SearchFlags.PreserveCase | SearchFlags.MatchCase | SearchFlags.MatchWholeWord | SearchFlags.UseRegularExpression | SearchFlags.ReplaceExpanded

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    excludeValue: 'node_modules',
    flags,
    includeValue: '*.ts',
    replacement: 'test-replacement',
    value: 'test-value',
  }

  const result = saveState(state)

  expect(result).toEqual({
    collapsedPaths: [],
    excludeValue: 'node_modules',
    flags,
    focus: 0,
    history: [],
    includeValue: '*.ts',
    listFocused: false,
    replacement: 'test-replacement',
    value: 'test-value',
  })
})
