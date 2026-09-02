import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.result-context-menu-file-reveal-in-explorer'

export const test: Test = async ({ ContextMenu, expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.setFiles([
    { content: 'other', uri: `${tmpDir}/other.txt` },
    { content: 'find me', uri: `${tmpDir}/target.txt` },
  ])
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
