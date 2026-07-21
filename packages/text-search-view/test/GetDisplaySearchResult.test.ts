import { expect, test } from '@jest/globals'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import * as GetSearchDisplayResult from '../src/parts/GetSearchDisplayResult/GetSearchDisplayResult.ts'

test('getDisplayResult - file', () => {
  const results: readonly SearchResult[] = [
    {
      end: 0,
      lineNumber: 0,
      start: 0,
      text: './languages/index.kt',
      type: 1,
    },
  ]

  const i = 0
  const replacement = ''
  const focusedIndex = -1
  const setSize = 1
  const searchTermLength = 1
  const fileIcons: readonly string[] = ['']
  const collapsedPaths: readonly string[] = []
  const minLineY = 0
  expect(
    GetSearchDisplayResult.getDisplayResult(
      results,
      fileIcons,
      i,
      setSize,
      searchTermLength,
      replacement,
      focusedIndex,
      collapsedPaths,
      false,
      minLineY,
      results,
    ),
  ).toEqual({
    badgeText: '0',
    depth: 0,
    expanded: 2,
    focused: false,
    icon: '',
    indent: 16,
    matchLength: 0,
    matchStart: 0,
    posInSet: 1,
    replacement: '',
    setSize: 1,
    text: 'index.kt',
    title: '/languages/index.kt',
  })
})

test('getDisplayResult - result', () => {
  const results: readonly SearchResult[] = [
    {
      end: 6,
      lineNumber: 1,
      start: 5,
      text: 'fun main(args : Array<String>) {',
      type: 2,
    },
  ]
  const i = 0
  const replacement = ''
  const focusedIndex = -1
  const setSize = 1
  const searchTermLength = 1
  const fileIcons: readonly string[] = []
  const collapsedPaths: readonly string[] = []
  const minLineY = 0
  expect(
    GetSearchDisplayResult.getDisplayResult(
      results,
      fileIcons,
      i,
      setSize,
      searchTermLength,
      replacement,
      focusedIndex,
      collapsedPaths,
      false,
      minLineY,
      results,
    ),
  ).toEqual({
    badgeText: '',
    depth: 1,
    expanded: 0,
    focused: false,
    icon: '',
    indent: 28,
    matchLength: 1,
    matchStart: 5,
    posInSet: 1,
    replacement: '',
    setSize: 1,
    text: 'fun main(args : Array<String>) {',
    title: 'fun main(args : Array<String>) {',
  })
})
