import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.open-in-editor'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.setFiles([
    { content: 'needle', uri: `${tmpDir}/test-a.txt` },
    { content: 'needle', uri: `${tmpDir}/test-b.txt` },
    { content: 'needle', uri: `${tmpDir}/test-c.txt` },
  ])
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')

  await Search.setValue('needle')

  const sideBarSearch = Locator('.Search')
  const sideBarTreeItems = sideBarSearch.locator('[role="treeitem"]')
  const sideBarMessage = sideBarSearch.locator('[role="status"]')
  await expect(sideBarMessage).toHaveText('3 results in 3 files')
  await expect(sideBarTreeItems).toHaveCount(6)
  const openInEditor = Locator('.SideBarTitleArea').locator('button[name="OpenSearchEditor"]')
  await expect(openInEditor).toBeVisible()
  await openInEditor.first().click()

  const searches = Locator('.Search')
  await expect(searches).toHaveCount(2)
  const editorSearch = searches.nth(1)
  const editorMessage = editorSearch.locator('[role="status"]')
  const editorSearchValue = editorSearch.locator('textarea[name="SearchValue"]')
  const editorTreeItems = editorSearch.locator('[role="treeitem"]')
  await expect(editorSearch).toBeVisible()
  await expect(editorSearchValue).toHaveValue('needle')
  await expect(editorMessage).toHaveText('3 results in 3 files')
  await expect(editorTreeItems).toHaveCount(6)
}
