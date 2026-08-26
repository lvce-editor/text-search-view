import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.result-context-menu-nested-file-reveal-in-explorer'

export const test: Test = async ({ ContextMenu, expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.mkdir(`${tmpDir}/src/nested`)
  await FileSystem.writeFile(`${tmpDir}/src/nested/target.ts`, 'nested target')
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('nested target')

  await Search.handleContextMenu(2, 300, 100)
  await ContextMenu.selectItem('Reveal in Explorer View')

  const src = Locator('.TreeItem[aria-label="src"]')
  const nested = Locator('.TreeItem[aria-label="nested"]')
  const target = Locator('.TreeItem[aria-label="target.ts"]')
  await expect(src).toHaveAttribute('aria-expanded', 'true')
  await expect(nested).toHaveAttribute('aria-expanded', 'true')
  await expect(target).toBeVisible()
  await expect(target).toHaveId('TreeItemActive')
}
