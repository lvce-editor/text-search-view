import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getComponentDom } from '../src/parts/GetComponentDom/GetComponentDom.ts'
import { getComponentState } from '../src/parts/GetComponentState/GetComponentState.ts'
import * as SearchViewStates from '../src/parts/SearchViewStates/SearchViewStates.ts'
import { setComponentState } from '../src/parts/SetComponentState/SetComponentState.ts'

test('gets and sets the live component state', async () => {
  const uid = 101
  const oldState = { ...createDefaultState(), uid, value: 'Before' }
  const newState = { ...oldState, value: 'After' }
  SearchViewStates.set(uid, oldState, oldState)

  expect(getComponentState(uid)).toBe(oldState)
  await setComponentState(uid, newState)

  expect(SearchViewStates.get(uid)).toEqual({ newState, oldState, scheduledState: newState })
})

test('rejects an invalid live component state', async () => {
  const uid = 102
  const state = { ...createDefaultState(), uid }
  SearchViewStates.set(uid, state, state)

  await expect(setComponentState(uid, { ...state, uid: 103 })).rejects.toThrow('Text Search state uid must remain 102')
  await expect(setComponentState(uid, [] as unknown)).rejects.toThrow('Text Search state must be an object')
})

test('inspects the current virtual DOM without advancing rendered state', () => {
  const uid = 104
  const oldState = { ...createDefaultState(), uid }
  const newState = { ...oldState, initial: false }
  SearchViewStates.set(uid, oldState, newState)
  const before = SearchViewStates.get(uid)
  const dom = getComponentDom(uid)

  expect(Array.isArray(dom)).toBe(true)
  expect(dom.length).toBeGreaterThan(0)
  expect(dom[0]).toEqual(expect.objectContaining({ childCount: expect.any(Number), type: expect.any(Number) }))
  expect(SearchViewStates.get(uid)).toEqual(before)
  expect(SearchViewStates.get(uid).oldState).toBe(oldState)
  expect(SearchViewStates.get(uid).newState).toBe(newState)
})
