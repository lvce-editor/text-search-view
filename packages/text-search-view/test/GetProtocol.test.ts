import { expect, test } from '@jest/globals'
import * as GetProtocol from '../src/parts/GetProtocol/GetProtocol.ts'

test('getProtocol - empty string returns empty string', () => {
  expect(GetProtocol.getProtocol('')).toBe('')
})

test('getProtocol - no protocol returns empty string', () => {
  expect(GetProtocol.getProtocol('test/path')).toBe('')
})

test('getProtocol - file protocol', () => {
  expect(GetProtocol.getProtocol('file:///test/path')).toBe('file')
})

test('getProtocol - http protocol', () => {
  expect(GetProtocol.getProtocol('http://example.com')).toBe('http')
})

test('getProtocol - https protocol', () => {
  expect(GetProtocol.getProtocol('https://example.com')).toBe('https')
})

test('getProtocol - web protocol', () => {
  expect(GetProtocol.getProtocol('web://test')).toBe('web')
})

test('getProtocol - fetch protocol', () => {
  expect(GetProtocol.getProtocol('fetch://test')).toBe('fetch')
})

test('getProtocol - html protocol', () => {
  expect(GetProtocol.getProtocol('html://test')).toBe('html')
})

test('getProtocol - custom protocol', () => {
  expect(GetProtocol.getProtocol('custom-protocol://test')).toBe('custom-protocol')
})

test('getProtocol - protocol with numbers', () => {
  expect(GetProtocol.getProtocol('protocol123://test')).toBe('protocol123')
})

test('getProtocol - protocol with hyphens', () => {
  expect(GetProtocol.getProtocol('my-custom-protocol://test')).toBe('my-custom-protocol')
})
