import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.result-context-menu-file-reveal-in-explorer'

export const test: Test = async ({ ContextMenu, expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/other.txt`, 'other')
  await FileSystem.writeFile(`${tmpDir}/target.txt`, 'find me')
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('find me')

  await Search.focusIndex(0)
  await Search.handleContextMenu(-1, 0, 0)
  await ContextMenu.selectItem('Reveal in Explorer View')

  const target = Locator('.TreeItem[aria-label="target.txt"]')
  await expect(target).toBeVisible()
  await expect(target).toHaveId('TreeItemActive')
}
