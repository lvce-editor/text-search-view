import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.open-in-editor-wrap'

export const test: Test = async ({ Command, expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const contents = 'needle\n'.repeat(12)
  for (let i = 0; i < 100; i++) {
    await FileSystem.writeFile(`${tmpDir}/test-${i}.txt`, contents)
  }
  await Workspace.setPath(tmpDir)
  await Command.execute('Layout.handleResize', 320, 720)
  await SideBar.open('Search')

  await Search.setValue('needle')

  const sideBarSearch = Locator('.Search')
  const sideBarMessage = sideBarSearch.locator('[role="status"]')
  await expect(sideBarMessage).toHaveText('1200 results in 100 files')
  const searchHeaderDetails = sideBarSearch.locator('.SearchHeaderDetails')
  await expect(searchHeaderDetails).toHaveCSS('height', '52px')
  const openInEditor = sideBarSearch.locator('button[name="OpenSearchEditor"]')
  await expect(openInEditor).toBeVisible()
}
