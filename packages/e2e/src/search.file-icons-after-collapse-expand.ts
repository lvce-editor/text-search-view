import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.file-icons-after-collapse-expand'

export const test: Test = async ({ expect, Extension, FileSystem, IconTheme, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const iconThemeUri = import.meta.resolve('../fixtures/search-icon-theme')
  await Extension.addWebExtension(iconThemeUri)
  await IconTheme.setIconTheme('search-test-icon-theme')
  const tmpDir = await FileSystem.getTmpDir()
  const promises: Promise<void>[] = []
  for (let i = 0; i < 40; i++) {
    const extension = i < 10 ? 'css' : 'js'
    const fileName = `${String(i).padStart(3, '0')}.${extension}`
    promises.push(FileSystem.writeFile(`${tmpDir}/${fileName}`, 'abc'))
  }
  await Promise.all(promises)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('ab')
  const viewletSearch = Locator('.Search')
  await expect(viewletSearch.locator('[role="status"]')).toHaveText('40 results in 40 files')

  // act
  await Search.collapseAll()

  // assert
  const file = viewletSearch.locator('.TreeItem[aria-label="/015.js"]')
  await expect(file).toBeVisible()
  await expect(file).toHaveAttribute('aria-expanded', 'false')
  await expect(file.locator('.FileIcon[src$="/javascript.svg"]')).toHaveCount(1)

  // act
  await Search.focusIndex(15)
  await Search.selectIndex(15)

  // assert
  await expect(file).toHaveAttribute('aria-expanded', 'true')
  await expect(file.locator('.FileIcon[src$="/javascript.svg"]')).toHaveCount(1)
  await expect(viewletSearch.locator('.TreeItem[aria-label="abc"]')).toBeVisible()

  // act
  await Search.selectIndex(15)

  // assert
  await expect(file).toHaveAttribute('aria-expanded', 'false')
  await expect(file.locator('.FileIcon[src$="/javascript.svg"]')).toHaveCount(1)
}
