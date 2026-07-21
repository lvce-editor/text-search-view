import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getSearchHeaderTopVirtualDom } from '../src/parts/GetSearchHeaderTopVirtualDom/GetSearchHeaderTopVirtualDom.ts'
import { getSearchResultsVirtualDom } from '../src/parts/GetSearchResultsVirtualDom/GetSearchResultsVirtualDom.ts'
import { getSearchVirtualDom } from '../src/parts/GetSearchVirtualDom/GetSearchVirtualDom.ts'
import { getTreeItemsVirtualDom } from '../src/parts/GetTreeItemsVirtualDom/GetTreeItemsVirtualDom.ts'
import { renderCss } from '../src/parts/RenderCss/RenderCss.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

test('search header renders the replace input when expanded', () => {
  const dom = getSearchHeaderTopVirtualDom(SearchFlags.ReplaceExpanded, '', 0, 0)
  expect(dom.some((node) => node.name === 'ReplaceValue')).toBe(true)
})

test('search results render a focus outline', () => {
  const dom = getSearchResultsVirtualDom([], true, 0, 0, 0, 0, 22)
  expect(dom[0].className).toContain('FocusOutline')
})

test('search virtual DOM uses default focus and initial values', () => {
  const dom = getSearchVirtualDom([], 0, '', false, '', 0, 0, 0, 0, 22, 0, '')
  expect(dom.length).toBeGreaterThan(0)
})

test('search virtual DOM is empty during initial render', () => {
  expect(getSearchVirtualDom([], 0, '', false, '', 0, 0, 0, 0, 22, 0, '', 0, true)).toEqual([])
})

test('search virtual DOM includes an input error', () => {
  const dom = getSearchVirtualDom([], 0, '', false, 'Invalid expression', 0, 0, 0, 0, 22, 0, '')
  expect(dom.some((node) => node.text === 'Invalid expression')).toBe(true)
})

test('tree items handle a zero item height', () => {
  expect(getTreeItemsVirtualDom([], 10, 0)[0]).toMatchObject({
    className: 'TreeItems TreeItemsTop-0',
  })
})

test('renderCss handles a zero item height', () => {
  const state = {
    ...createDefaultState(),
    deltaY: 10,
    itemHeight: 0,
  }
  expect(renderCss(state, state)[2]).toContain('.TreeItemsTop-0')
})
