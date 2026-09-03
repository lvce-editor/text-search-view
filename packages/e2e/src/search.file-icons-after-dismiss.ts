import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.file-icons-after-dismiss'

export const test: Test = async ({ expect, Extension, FileSystem, IconTheme, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const iconThemeUri = import.meta.resolve('../fixtures/search-icon-theme')
  await Extension.addWebExtension(iconThemeUri)
  await IconTheme.setIconTheme('search-test-icon-theme')
  const tmpDir = await FileSystem.getTmpDir()
  const promises: Promise<void>[] = []
  for (let i = 0; i < 40; i++) {
    const extension = i < 20 ? 'css' : 'js'
    const fileName = `${String(i).padStart(3, '0')}.${extension}`
    promises.push(FileSystem.writeFile(`${tmpDir}/${fileName}`, 'abc'))
  }
  await Promise.all(promises)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('ab')
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('40 results in 40 files')
  await Search.focusIndex(50)
  const dismissedFile = viewletSearch.locator('.TreeItem[aria-label="/025.js"]')
  await expect(dismissedFile).toBeVisible()

  // act
  await Search.dismissItem()

  // assert
  await expect(message).toHaveText('39 results in 39 files')
  await expect(dismissedFile).toBeHidden()
  const nextFile = viewletSearch.locator('.TreeItem[aria-label="/026.js"]')
  await expect(nextFile).toBeVisible()
  await expect(nextFile.locator('.FileIcon[src$="/javascript.svg"]')).toHaveCount(1)
}
