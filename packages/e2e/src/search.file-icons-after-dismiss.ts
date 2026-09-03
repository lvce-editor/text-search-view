import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.file-icons-after-dismiss'

export const test: Test = async ({ expect, Extension, FileSystem, IconTheme, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const iconThemeUri = import.meta.resolve('../fixtures/search-icon-theme')
  await Extension.addWebExtension(iconThemeUri)
  await IconTheme.setIconTheme('search-test-icon-theme')
  const tmpDir = await FileSystem.getTmpDir()
  for (let i = 0; i < 40; i++) {
    const extension = i < 20 ? 'css' : 'js'
    const fileName = `${String(i).padStart(3, '0')}.${extension}`
    await FileSystem.writeFile(`${tmpDir}/${fileName}`, 'abc')
  }
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('ab')
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('40 results in 40 files')
  await Search.focusIndex(78)
  const dismissedFile = viewletSearch.locator('.TreeItem[aria-label="/039.js"]')
  await expect(dismissedFile).toBeVisible()

  // act
  await Search.dismissItem()

  // assert
  await expect(message).toHaveText('39 results in 39 files')
  await expect(dismissedFile).toBeHidden()
  const previousFile = viewletSearch.locator('.TreeItem[aria-label="/038.js"]')
  await expect(previousFile).toBeVisible()
  await expect(previousFile.locator('.FileIcon[src$="/javascript.svg"]')).toHaveCount(1)
}
