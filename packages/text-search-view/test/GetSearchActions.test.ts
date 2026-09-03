import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getActions } from '../src/parts/GetSearchActions/GetSearchActions.ts'

test('getSearchActions - should return array of search actions', () => {
  const state = {
    ...createDefaultState(),
  }
  expect(getActions(state)).toEqual([
    {
      command: 'refresh',
      enabled: false,
      icon: 'Refresh',
      id: 'Refresh',
      label: 'Refresh',
      type: 1,
    },
    {
      command: 'clearSearchResults',
      enabled: false,
      icon: 'ClearAll',
      id: 'ClearAll',
      label: 'Clear Search Results',
      type: 1,
    },
    {
      command: '',
      enabled: true,
      icon: 'NewFile',
      id: 'OpenSearchEditor',
      label: 'Open New Search Editor',
      type: 1,
    },
    {
      command: '',
      enabled: true,
      icon: 'ListFlat',
      id: 'ViewAsTree',
      label: 'View as Tree',
      type: 1,
    },
    {
      command: '',
      enabled: false,
      icon: 'CollapseAll',
      id: 'CollapseAll',
      label: 'Collapse All',
      type: 1,
    },
  ])
})

test('getSearchActions - enables actions for a search pattern and results', () => {
  const state = {
    ...createDefaultState(),
    items: [{ end: 0, lineNumber: 0, start: 0, text: 'file.txt', type: 1 }],
    value: 'test',
  }
  expect(getActions(state).map(({ enabled }) => enabled)).toEqual([true, true, true, true, true])
})
