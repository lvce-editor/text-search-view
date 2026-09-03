import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.file-icons-after-theme-change'

export const test: Test = async ({ expect, Extension, FileSystem, IconTheme, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const iconThemeUri = import.meta.resolve('../fixtures/search-icon-theme')
  await Extension.addWebExtension(iconThemeUri)
  await IconTheme.setIconTheme('search-test-icon-theme')
  const tmpDir = await FileSystem.getTmpDir()
  const promises: Promise<void>[] = []
  for (let i = 0; i < 60; i++) {
    const extension = i < 30 ? 'css' : 'js'
    const fileName = `${String(i).padStart(3, '0')}.${extension}`
    promises.push(FileSystem.writeFile(`${tmpDir}/${fileName}`, 'abc'))
  }
  await Promise.all(promises)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('ab')
  const viewletSearch = Locator('.Search')
  await expect(viewletSearch.locator('[role="status"]')).toHaveText('60 results in 60 files')
  await Search.handleWheel(1, 10_000)
  const lastFile = viewletSearch.locator('.TreeItem[aria-label="/059.js"]')
  await expect(lastFile).toBeVisible()
  await expect(lastFile.locator('.FileIcon[src$="/javascript.svg"]')).toHaveCount(1)

  // act
  await IconTheme.setIconTheme('search-test-icon-theme-alternate')

  // assert
  await expect(lastFile.locator('.FileIcon[src$="/javascript-alternate.svg"]')).toHaveCount(1)

  // act
  await Search.handleWheel(1, -10_000)

  // assert
  const firstFile = viewletSearch.locator('.TreeItem[aria-label="/000.css"]')
  await expect(firstFile).toBeVisible()
  await expect(firstFile.locator('.FileIcon[src$="/css-alternate.svg"]')).toHaveCount(1)
}
