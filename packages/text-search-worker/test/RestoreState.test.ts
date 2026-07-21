import { expect, test } from '@jest/globals'
import { restoreState } from '../src/parts/RestoreState/RestoreState.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

test('restoreState - with empty state', () => {
  const state = {}
  const result = restoreState(state)
  expect(result).toEqual({
    excludeValue: '',
    flags: SearchFlags.UseIgnoreFiles,
    focus: 0,
    history: [],
    includeValue: '',
    listFocused: false,
    replacement: '',
    savedCollapsedPaths: [],

    savedValue: '',
    threads: 1,
  })
})

test('restoreState - with null state', () => {
  const result = restoreState(null)
  expect(result).toEqual({
    excludeValue: '',
    flags: SearchFlags.UseIgnoreFiles,
    focus: 0,
    history: [],
    includeValue: '',
    listFocused: false,
    replacement: '',
    savedCollapsedPaths: [],

    savedValue: '',
    threads: 1,
  })
})

test('restoreState - with basic state', () => {
  const state = {
    excludeValue: 'node_modules',
    flags: 31,
    includeValue: '*.ts',
    value: 'test',
  }
  const result = restoreState(state)
  const expectedFlags =
    SearchFlags.PreserveCase | SearchFlags.ReplaceExpanded | SearchFlags.MatchCase | SearchFlags.MatchWholeWord | SearchFlags.UseRegularExpression
  expect(result).toEqual({
    excludeValue: 'node_modules',
    flags: expectedFlags,
    focus: 0,
    history: [],
    includeValue: '*.ts',
    listFocused: false,
    replacement: '',
    savedCollapsedPaths: [],
    savedValue: 'test',
    threads: 1,
  })
})
