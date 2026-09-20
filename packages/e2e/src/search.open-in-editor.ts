import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.open-in-editor'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'needle')
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')

  await Search.setValue('needle')

  const sideBarMessage = Locator('#SideBar .Search [role="status"]')
  await expect(sideBarMessage).toHaveText('1 result in 1 file - Open in editor')
  const openInEditor = sideBarMessage.locator('button[name="OpenSearchEditor"]')
  await expect(openInEditor).toHaveAttribute('title', 'Copy current search results to an editor (Alt+Enter)')
  await openInEditor.click()

  const editorSearch = Locator('#Main .Search')
  const editorInput = editorSearch.locator('textarea[name="SearchValue"]')
  const editorMessage = editorSearch.locator('[role="status"]')
  const editorResults = editorSearch.locator('[role="treeitem"]')
  await expect(editorSearch).toBeVisible()
  await expect(editorInput).toHaveValue('needle')
  await expect(editorMessage).toHaveText('1 result in 1 file - Open in editor')
  await expect(editorResults).toHaveCount(2)
}
