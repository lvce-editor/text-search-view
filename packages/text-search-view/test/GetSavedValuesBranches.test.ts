import { expect, test } from '@jest/globals'
import { getSavedCollapsedPaths } from '../src/parts/GetSavedValues/GetSavedValues.ts'

test('getSavedCollapsedPaths returns a valid string array', () => {
  const paths = ['src', 'test']
  expect(getSavedCollapsedPaths({ collapsedPaths: paths })).toBe(paths)
})

test('getSavedCollapsedPaths rejects non-arrays and non-string entries', () => {
  expect(getSavedCollapsedPaths({ collapsedPaths: 'src' })).toEqual([])
  expect(getSavedCollapsedPaths({ collapsedPaths: ['src', 1] })).toEqual([])
})
