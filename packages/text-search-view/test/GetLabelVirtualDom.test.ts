import { expect, test } from '@jest/globals'
import * as GetLabelVirtualDom from '../src/parts/GetLabelVirtualDom/GetLabelVirtualDom.ts'

test('getLabelVirtualDom', () => {
  const displayText = 'abc'
  const matchLength = 1
  const matchStart = 1
  const replacement = 'd'
  expect(GetLabelVirtualDom.getLabelVirtualDom(displayText, matchLength, matchStart, replacement)).toEqual([
    {
      childCount: 4,
      className: 'Label Grow',
      type: 4,
    },
    {
      childCount: 0,
      text: 'a',
      type: 12,
    },
    {
      childCount: 1,
      className: 'HighlightDeleted',
      type: 21,
    },
    {
      childCount: 0,
      text: 'b',
      type: 12,
    },
    {
      childCount: 1,
      className: 'HighlightInserted',
      type: 20,
    },
    {
      childCount: 0,
      text: 'd',
      type: 12,
    },
    {
      childCount: 0,
      text: 'c',
      type: 12,
    },
  ])
})

test('no match', () => {
  const displayText = 'abc'
  const matchLength = 0
  const matchStart = 0
  const replacement = ''
  expect(GetLabelVirtualDom.getLabelVirtualDom(displayText, matchLength, matchStart, replacement)).toEqual([
    {
      childCount: 1,
      className: 'Label Grow',
      type: 4,
    },
    {
      childCount: 0,
      text: 'abc',
      type: 12,
    },
  ])
})

test('no replacement', () => {
  const displayText = 'abc'
  const matchLength = 1
  const matchStart = 1
  const replacement = ''
  expect(GetLabelVirtualDom.getLabelVirtualDom(displayText, matchLength, matchStart, replacement)).toEqual([
    {
      childCount: 3,
      className: 'Label Grow',
      type: 4,
    },
    {
      childCount: 0,
      text: 'a',
      type: 12,
    },
    {
      childCount: 1,
      className: 'Highlight',
      type: 8,
    },
    {
      childCount: 0,
      text: 'b',
      type: 12,
    },
    {
      childCount: 0,
      text: 'c',
      type: 12,
    },
  ])
})
