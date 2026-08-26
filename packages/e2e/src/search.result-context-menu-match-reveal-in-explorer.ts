import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.result-context-menu-match-reveal-in-explorer'

export const test: Test = async ({ ContextMenu, expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/result.ts`, 'const needle = true')
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('needle')

  await Search.handleContextMenu(2, 300, 124)
  await ContextMenu.selectItem('Reveal in Explorer View')

  const target = Locator('.TreeItem[aria-label="result.ts"]')
  await expect(target).toBeVisible()
  await expect(target).toHaveId('TreeItemActive')
}
