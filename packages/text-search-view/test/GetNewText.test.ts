import { expect, test } from '@jest/globals'
import * as GetNewText from '../src/parts/GetNewText/GetNewText.ts'

test('getNewText replaces selected text in the middle', () => {
  const currentText = 'hello world'
  const selectionStart = 6
  const selectionEnd = 11
  const insertedText = 'universe'
  const result = GetNewText.getNewText(currentText, selectionStart, selectionEnd, insertedText)
  expect(result).toBe('hello universe')
})

test('getNewText replaces text at the start', () => {
  const currentText = 'hello world'
  const selectionStart = 0
  const selectionEnd = 5
  const insertedText = 'hi'
  const result = GetNewText.getNewText(currentText, selectionStart, selectionEnd, insertedText)
  expect(result).toBe('hi world')
})

test('getNewText replaces text at the end', () => {
  const currentText = 'hello world'
  const selectionStart = 6
  const selectionEnd = 11
  const insertedText = 'universe'
  const result = GetNewText.getNewText(currentText, selectionStart, selectionEnd, insertedText)
  expect(result).toBe('hello universe')
})

test('getNewText replaces entire text', () => {
  const currentText = 'hello world'
  const selectionStart = 0
  const selectionEnd = 11
  const insertedText = 'new text'
  const result = GetNewText.getNewText(currentText, selectionStart, selectionEnd, insertedText)
  expect(result).toBe('new text')
})

test('getNewText inserts text when selection is empty', () => {
  const currentText = 'hello world'
  const selectionStart = 5
  const selectionEnd = 5
  const insertedText = ' beautiful'
  const result = GetNewText.getNewText(currentText, selectionStart, selectionEnd, insertedText)
  expect(result).toBe('hello beautiful world')
})

test('getNewText handles empty currentText', () => {
  const currentText = ''
  const selectionStart = 0
  const selectionEnd = 0
  const insertedText = 'new text'
  const result = GetNewText.getNewText(currentText, selectionStart, selectionEnd, insertedText)
  expect(result).toBe('new text')
})

test('getNewText handles empty insertedText', () => {
  const currentText = 'hello world'
  const selectionStart = 6
  const selectionEnd = 11
  const insertedText = ''
  const result = GetNewText.getNewText(currentText, selectionStart, selectionEnd, insertedText)
  expect(result).toBe('hello ')
})

test('getNewText deletes text when insertedText is empty and selection is not empty', () => {
  const currentText = 'hello world'
  const selectionStart = 0
  const selectionEnd = 6
  const insertedText = ''
  const result = GetNewText.getNewText(currentText, selectionStart, selectionEnd, insertedText)
  expect(result).toBe('world')
})
