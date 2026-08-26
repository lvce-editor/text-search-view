import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.result-context-menu-nested-match-reveal-in-explorer'

export const test: Test = async ({ ContextMenu, expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.mkdir(`${tmpDir}/packages/search`)
  await FileSystem.writeFile(`${tmpDir}/packages/search/item.ts`, 'reveal this match')
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('reveal this match')

  await Search.focusIndex(1)
  await Search.handleContextMenu(-1, 0, 0)
  await ContextMenu.selectItem('Reveal in Explorer View')

  const target = Locator('.TreeItem[aria-label="item.ts"]')
  await expect(target).toBeVisible()
  await expect(target).toHaveId('TreeItemActive')
}
