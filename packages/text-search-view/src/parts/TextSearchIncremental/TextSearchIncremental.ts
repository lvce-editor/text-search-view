import { RendererWorker, TextSearchWorker } from '@lvce-editor/rpc-registry'
import type { SearchState } from '../SearchState/SearchState.ts'
import type { TextSearchOptions } from '../TextSearchOptions/TextSearchOptions.ts'
import * as GetNumberOfVisibleItems from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'
import * as SearchViewStates from '../SearchViewStates/SearchViewStates.ts'
import { waitForNextFrame } from '../WaitForNextFrame/WaitForNextFrame.ts'

export const textSearchIncremental = async (
  root: string,
  query: string,
  options: TextSearchOptions,
  assetDir: string,
  platform: number,
  searchId: string,
  uid: number,
): Promise<void> => {
  const resultPromise = TextSearchWorker.searchIncremental(root, query, options, assetDir, platform, searchId, uid)
  for (let i = 0; i < 100; i++) {
    const latest = SearchViewStates.get(uid)
    const { newState } = latest
    const { headerHeight, height, itemHeight, minLineY } = newState
    const listHeight = height - headerHeight
    const numberOfVisible = GetNumberOfVisibleItems.getNumberOfVisibleItems(listHeight, itemHeight)
    const visible = await TextSearchWorker.getIncrementalResults(searchId, minLineY, minLineY + numberOfVisible)
    const latest2 = SearchViewStates.get(uid)
    if (!latest2 || latest2.newState.searchId !== searchId) {
      return
    }
    const updatedState2: SearchState = {
      ...latest2.newState,
      items: visible,
      listItems: visible,
      maxLineY: visible.length,
      minLineY: 0,
    }
    SearchViewStates.set(uid, latest2.oldState, updatedState2)
    // @ts-ignore
    await RendererWorker.invoke('Search.rerender')
    await waitForNextFrame()
  }
  await resultPromise
}
