import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.open-in-editor'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'needle')
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')

  await Search.setValue('needle')

  const sideBarSearch = Locator('.Search')
  const sideBarTreeItems = sideBarSearch.locator('[role="treeitem"]')
  await expect(sideBarTreeItems).toHaveCount(2)
  const sideBarMessage = sideBarSearch.locator('[role="status"]')
  await expect(sideBarMessage).toHaveText('1 result in 1 file')
  const openInEditor = sideBarSearch.locator('button[name="OpenSearchEditor"]')
  await expect(openInEditor).toHaveAttribute('title', 'Copy current search results to an editor (Alt+Enter)')
  await openInEditor.click()

  const searches = Locator('.Search')
  await expect(searches).toHaveCount(2)
  const editorSearch = searches.nth(1)
  const editorMessage = editorSearch.locator('[role="status"]')
  const editorSearchValue = editorSearch.locator('textarea[name="SearchValue"]')
  const editorTreeItems = editorSearch.locator('[role="treeitem"]')
  await expect(editorSearch).toBeVisible()
  await expect(editorSearchValue).toHaveValue('needle')
  await expect(editorMessage).toHaveText('1 result in 1 file')
  await expect(editorTreeItems).toHaveCount(2)
}
