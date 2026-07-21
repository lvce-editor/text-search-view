import { expect, test } from '@jest/globals'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as GetRenderer from '../src/parts/GetRenderer/GetRenderer.ts'
import * as RenderFocus from '../src/parts/RenderFocus/RenderFocus.ts'
import * as RenderFocusContext from '../src/parts/RenderFocusContext/RenderFocusContext.ts'
import { renderSelections } from '../src/parts/RenderSelections/RenderSelections.ts'
import * as RenderValue from '../src/parts/RenderValue/RenderValue.ts'

test('getRenderer - focus type', () => {
  const renderer = GetRenderer.getRenderer(DiffType.RenderFocus)
  expect(renderer).toBe(RenderFocus.renderFocus)
})

test('getRenderer - value type', () => {
  const renderer = GetRenderer.getRenderer(DiffType.RenderValue)
  expect(renderer).toBe(RenderValue.renderValue)
})

test('getRenderer - replace value type', () => {
  const renderer = GetRenderer.getRenderer(DiffType.RenderReplaceValue)
  expect(renderer).toBe(RenderValue.renderReplacement)
})

test('getRenderer - include value type', () => {
  const renderer = GetRenderer.getRenderer(DiffType.RenderIncludeValue)
  expect(renderer).toBe(RenderValue.renderIncludeValue)
})

test('getRenderer - exclude value type', () => {
  const renderer = GetRenderer.getRenderer(DiffType.RenderExcludeValue)
  expect(renderer).toBe(RenderValue.renderExcludeValue)
})

test('getRenderer - focus context type', () => {
  const renderer = GetRenderer.getRenderer(DiffType.RenderFocusContext)
  expect(renderer).toBe(RenderFocusContext.renderFocusContext)
})

test('getRenderer - selections type', () => {
  const renderer = GetRenderer.getRenderer(DiffType.RenderSelections)
  expect(renderer).toBe(renderSelections)
})

test('getRenderer - invalid type', () => {
  expect(() => GetRenderer.getRenderer(999)).toThrow('unknown renderer')
})
