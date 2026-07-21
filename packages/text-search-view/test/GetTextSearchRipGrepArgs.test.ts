import { expect, test } from '@jest/globals'
import * as GetTextSearchRipGrepArgs from '../src/parts/GetTextSearchRipGrepArgs/GetTextSearchRipGrepArgs.ts'

test('getRipGrepArgs - threads', () => {
  expect(
    GetTextSearchRipGrepArgs.getRipGrepArgs({
      isCaseSensitive: false,
      searchString: 'test',
      threads: 1,
      useRegularExpression: false,
    }),
  ).toEqual([
    '--hidden',
    '--no-require-git',
    '--smart-case',
    '--stats',
    '--json',
    '--threads',
    '1',
    '--ignore-case',
    '--fixed-strings',
    '--',
    'test',
    '.',
  ])
})

test('getRipGrepArgs - isCaseSensitive', () => {
  expect(
    GetTextSearchRipGrepArgs.getRipGrepArgs({
      isCaseSensitive: true,
      searchString: 'test',
      threads: 1,
      useRegularExpression: false,
    }),
  ).toEqual([
    '--hidden',
    '--no-require-git',
    '--smart-case',
    '--stats',
    '--json',
    '--threads',
    '1',
    '--case-sensitive',
    '--fixed-strings',
    '--',
    'test',
    '.',
  ])
})

test('getRipGrepArgs - useRegularExpression', () => {
  expect(
    GetTextSearchRipGrepArgs.getRipGrepArgs({
      isCaseSensitive: false,
      searchString: 'test',
      threads: 1,
      useRegularExpression: true,
    }),
  ).toEqual(['--hidden', '--no-require-git', '--smart-case', '--stats', '--json', '--threads', '1', '--ignore-case', '--regexp', 'test', '.'])
})

test('getRipGrepArgs - exclude', () => {
  expect(
    GetTextSearchRipGrepArgs.getRipGrepArgs({
      exclude: '.git,node_modules',
      isCaseSensitive: false,
      searchString: 'test',
      threads: 1,
      useRegularExpression: false,
    }),
  ).toEqual([
    '--hidden',
    '--no-require-git',
    '--smart-case',
    '--stats',
    '--json',
    '--threads',
    '1',
    '--glob',
    '!**/.git/**',
    '--glob',
    '!**/node_modules/**',
    '--ignore-case',
    '--fixed-strings',
    '--',
    'test',
    '.',
  ])
})

test('getRipGrepArgs - default excludes when UseIgnoreFiles is enabled', () => {
  expect(
    GetTextSearchRipGrepArgs.getRipGrepArgs({
      defaultExcludes: ['.git', 'node_modules'],
      isCaseSensitive: false,
      searchString: 'test',
      threads: 1,
      useRegularExpression: false,
    }),
  ).toEqual([
    '--hidden',
    '--no-require-git',
    '--smart-case',
    '--stats',
    '--json',
    '--threads',
    '1',
    '--glob',
    '!**/.git/**',
    '--glob',
    '!**/node_modules/**',
    '--ignore-case',
    '--fixed-strings',
    '--',
    'test',
    '.',
  ])
})

test('getRipGrepArgs - merges default excludes and exclude value', () => {
  expect(
    GetTextSearchRipGrepArgs.getRipGrepArgs({
      defaultExcludes: ['.git', 'node_modules'],
      exclude: 'dist,.git',
      isCaseSensitive: false,
      searchString: 'test',
      threads: 1,
      useRegularExpression: false,
    }),
  ).toEqual([
    '--hidden',
    '--no-require-git',
    '--smart-case',
    '--stats',
    '--json',
    '--threads',
    '1',
    '--glob',
    '!**/.git/**',
    '--glob',
    '!**/node_modules/**',
    '--glob',
    '!**/dist/**',
    '--ignore-case',
    '--fixed-strings',
    '--',
    'test',
    '.',
  ])
})

test('getRipGrepArgs - preserves search exclude glob patterns', () => {
  expect(
    GetTextSearchRipGrepArgs.getRipGrepArgs({
      defaultExcludes: ['**/excluded', '**/package-lock.json'],
      isCaseSensitive: false,
      searchString: 'test',
      threads: 1,
      useRegularExpression: false,
    }),
  ).toEqual([
    '--hidden',
    '--no-require-git',
    '--smart-case',
    '--stats',
    '--json',
    '--threads',
    '1',
    '--glob',
    '!**/excluded',
    '--glob',
    '!**/excluded/**',
    '--glob',
    '!**/package-lock.json',
    '--glob',
    '!**/package-lock.json/**',
    '--ignore-case',
    '--fixed-strings',
    '--',
    'test',
    '.',
  ])
})
