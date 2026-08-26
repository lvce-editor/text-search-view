import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.result-context-menu-nested-file-reveal-in-explorer'

export const test: Test = async ({ ContextMenu, expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.mkdir(`${tmpDir}/src/nested`)
  await FileSystem.writeFile(`${tmpDir}/src/nested/target.ts`, 'nested target')
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('nested target')

  await Search.focusIndex(0)
  await Search.handleContextMenu(-1, 0, 0)
  await ContextMenu.selectItem('Reveal in Explorer View')

  const target = Locator('.TreeItem[aria-label="target.ts"]')
  await expect(target).toBeVisible()
  await expect(target).toHaveId('TreeItemActive')
}
