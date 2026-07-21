import { expect, test } from '@jest/globals'
import * as GetSearchHeaderTopVirtualDom from '../src/parts/GetSearchHeaderTopVirtualDom/GetSearchHeaderTopVirtualDom.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

test.skip('getSearchHeaderTopVirtualDom - replace all button disabled when no results', () => {
  const flags = SearchFlags.ReplaceExpanded
  const searchInputErrorMessage = ''
  const matchCount = 0
  const focus = 0
  const dom = GetSearchHeaderTopVirtualDom.getSearchHeaderTopVirtualDom(flags, searchInputErrorMessage, matchCount, focus)
  const replaceField = dom.find((node) => node.name === 'ReplaceValue')
  expect(replaceField).toBeDefined()
  const replaceAllButton = dom.find((node) => node.name === 'ReplaceAll')
  expect(replaceAllButton?.disabled).toBe(true)
})

test.skip('getSearchHeaderTopVirtualDom - replace all button enabled when results exist', () => {
  const flags = SearchFlags.ReplaceExpanded
  const searchInputErrorMessage = ''
  const matchCount = 5
  const focus = 0
  const dom = GetSearchHeaderTopVirtualDom.getSearchHeaderTopVirtualDom(flags, searchInputErrorMessage, matchCount, focus)
  const replaceField = dom.find((node) => node.name === 'ReplaceValue')
  expect(replaceField).toBeDefined()
  const replaceAllButton = dom.find((node) => node.name === 'ReplaceAll')
  expect(replaceAllButton?.disabled).toBe(false)
})
