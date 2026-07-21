import { expect, test } from '@jest/globals'
import * as TextSearchExtension from '../src/parts/TextSearchExtension/TextSearchExtension.ts'
import * as TextSearchFetch from '../src/parts/TextSearchFetch/TextSearchFetch.ts'
import * as TextSearchHtml from '../src/parts/TextSearchHtml/TextSearchHtml.ts'
import * as TextSearchNode from '../src/parts/TextSearchNode/TextSearchNode.ts'
import { textSearchProviderMap } from '../src/parts/TextSearchProviderMap/TextSearchProviderMap.ts'
import * as TextSearchWeb from '../src/parts/TextSearchWeb/TextSearchWeb.ts'

test('getProvider - empty scheme returns node search', () => {
  expect(textSearchProviderMap['']).toBe(TextSearchNode.textSearch)
})

test('getProvider - web scheme returns web search', () => {
  expect(textSearchProviderMap['web']).toBe(TextSearchWeb.textSearch)
})

test('getProvider - fetch scheme returns fetch search', () => {
  expect(textSearchProviderMap['fetch']).toBe(TextSearchFetch.textSearch)
})

test('getProvider - html scheme returns html search', () => {
  expect(textSearchProviderMap['html']).toBe(TextSearchHtml.textSearch)
})

test('getProvider - unknown scheme returns extension search', () => {
  expect(textSearchProviderMap['default']).toBe(TextSearchExtension.textSearch)
})
