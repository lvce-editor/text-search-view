import { expect, test } from '@jest/globals'
import { getNewTextCut } from '../src/parts/GetNewTextCut/GetNewTextCut.ts'

test('getNewTextCut - cuts text from middle', () => {
  const result = getNewTextCut('hello world', 6, 11)
  expect(result).toEqual({
    cutText: 'world',
    newText: 'hello ',
  })
})

test('getNewTextCut - cuts text from start', () => {
  const result = getNewTextCut('hello world', 0, 5)
  expect(result).toEqual({
    cutText: 'hello',
    newText: ' world',
  })
})

test('getNewTextCut - cuts text from end', () => {
  const result = getNewTextCut('hello world', 6, 11)
  expect(result).toEqual({
    cutText: 'world',
    newText: 'hello ',
  })
})

test('getNewTextCut - empty selection returns same text', () => {
  const result = getNewTextCut('hello world', 5, 5)
  expect(result).toEqual({
    cutText: '',
    newText: 'hello world',
  })
})

test('getNewTextCut - selection covering entire text', () => {
  const result = getNewTextCut('hello', 0, 5)
  expect(result).toEqual({
    cutText: 'hello',
    newText: '',
  })
})

test('getNewTextCut - empty text with empty selection', () => {
  const result = getNewTextCut('', 0, 0)
  expect(result).toEqual({
    cutText: '',
    newText: '',
  })
})

test('getNewTextCut - single character selection', () => {
  const result = getNewTextCut('hello', 2, 3)
  expect(result).toEqual({
    cutText: 'l',
    newText: 'helo',
  })
})

test('getNewTextCut - multiple character selection', () => {
  const result = getNewTextCut('the quick brown fox', 4, 9)
  expect(result).toEqual({
    cutText: 'quick',
    newText: 'the  brown fox',
  })
})
