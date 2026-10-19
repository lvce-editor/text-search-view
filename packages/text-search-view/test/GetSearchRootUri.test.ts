import { expect, test } from '@jest/globals'
import * as GetSearchRootUri from '../src/parts/GetSearchRootUri/GetSearchRootUri.ts'

test('getSearchRootUri - finds the common directory of opened files', () => {
  expect(GetSearchRootUri.getSearchRootUri(['file:///workspace/README.md', 'file:///workspace/src/app.ts', 'file:///workspace/docs/guide.md'])).toBe(
    'file:///workspace/',
  )
})

test('getSearchRootUri - returns a file root when there are no opened file uris', () => {
  expect(GetSearchRootUri.getSearchRootUri([])).toBe('file:///')
})

test('getSearchRootUri - keeps a Windows drive root when opened files have different directories', () => {
  expect(GetSearchRootUri.getSearchRootUri(['file:///C:/one/a.ts', 'file:///C:/two/b.ts'])).toBe('file:///C:/')
})

test('getSearchRootUri - ignores unsupported and malformed editor uris', () => {
  expect(GetSearchRootUri.getSearchRootUri(['search-editor://1/Search', 'not a uri'])).toBe('file:///')
})

test('getSearchRootUri - keeps the first file root when file hosts differ', () => {
  expect(GetSearchRootUri.getSearchRootUri(['file:///workspace/README.md', 'file://remote/workspace/app.ts'])).toBe('file:///workspace/')
})

test('getSearchRootUri - falls back to the first drive for files opened on different drives', () => {
  expect(GetSearchRootUri.getSearchRootUri(['file:///C:/one/a.ts', 'file:///D:/two/b.ts'])).toBe('file:///C:/')
})

test('getSearchRootUri - finds the common directory of opened virtual files', () => {
  expect(GetSearchRootUri.getSearchRootUri(['memfs:///workspace/README.md', 'memfs:///workspace/src/app.ts'])).toBe('memfs:///workspace/')
})
