import { expect, test } from '@jest/globals'
import * as DirentType from '../src/parts/DirentType/DirentType.ts'
import { getSimpleIconRequestType } from '../src/parts/GetSimpleIconRequestType/GetSimpleIconRequestType.ts'

test('getSimpleIconRequestType returns 2 for Directory', () => {
  const result = getSimpleIconRequestType(DirentType.Directory)
  expect(result).toBe(2)
})

test('getSimpleIconRequestType returns 2 for DirectoryExpanded', () => {
  const result = getSimpleIconRequestType(DirentType.DirectoryExpanded)
  expect(result).toBe(2)
})

test('getSimpleIconRequestType returns 1 for File', () => {
  const result = getSimpleIconRequestType(DirentType.File)
  expect(result).toBe(1)
})

test('getSimpleIconRequestType returns 1 for BlockDevice', () => {
  const result = getSimpleIconRequestType(DirentType.BlockDevice)
  expect(result).toBe(1)
})

test('getSimpleIconRequestType returns 1 for CharacterDevice', () => {
  const result = getSimpleIconRequestType(DirentType.CharacterDevice)
  expect(result).toBe(1)
})

test('getSimpleIconRequestType returns 1 for Socket', () => {
  const result = getSimpleIconRequestType(DirentType.Socket)
  expect(result).toBe(1)
})

test('getSimpleIconRequestType returns 1 for Symlink', () => {
  const result = getSimpleIconRequestType(DirentType.Symlink)
  expect(result).toBe(1)
})

test('getSimpleIconRequestType returns 1 for SymLinkFile', () => {
  const result = getSimpleIconRequestType(DirentType.SymLinkFile)
  expect(result).toBe(1)
})

test('getSimpleIconRequestType returns 1 for SymLinkFolder', () => {
  const result = getSimpleIconRequestType(DirentType.SymLinkFolder)
  expect(result).toBe(1)
})

test('getSimpleIconRequestType returns 1 for Unknown', () => {
  const result = getSimpleIconRequestType(DirentType.Unknown)
  expect(result).toBe(1)
})

test('getSimpleIconRequestType returns 1 for DirectoryExpanding', () => {
  const result = getSimpleIconRequestType(DirentType.DirectoryExpanding)
  expect(result).toBe(1)
})
