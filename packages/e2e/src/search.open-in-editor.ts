import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.open-in-editor'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'needle')
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')

  await Search.setValue('needle')

  const sideBarSearch = Locator('.Search')
  const sideBarMessage = sideBarSearch.locator('[role="status"]')
  await expect(sideBarMessage).toHaveText('1 result in 1 file - Open in editor')
  const openInEditor = sideBarSearch.locator('button[name="OpenSearchEditor"]')
  await expect(openInEditor).toHaveAttribute('title', 'Copy current search results to an editor (Alt+Enter)')
  await openInEditor.click()
}
