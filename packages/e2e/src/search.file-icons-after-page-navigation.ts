import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.file-icons-after-page-navigation'

export const test: Test = async ({ Command, expect, Extension, FileSystem, IconTheme, Locator, Search, SideBar, Workspace }) => {
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
  await expect(viewletSearch.locator('[role="status"]')).toHaveText('40 results in 40 files')
  const firstFile = viewletSearch.locator('.TreeItem[aria-label="/000.css"]')
  const lastFile = viewletSearch.locator('.TreeItem[aria-label="/039.js"]')
  await Search.focusFirst()
  await expect(firstFile).toBeVisible()
  await expect(firstFile.locator('.FileIcon[src$="/css.svg"]')).toHaveCount(1)

  // act
  await Command.execute('Search.focusNextPage')
  await Command.execute('Search.focusNextPage')
  await Command.execute('Search.focusNextPage')
  await Command.execute('Search.focusNextPage')

  // assert
  await expect(lastFile).toBeVisible()
  await expect(lastFile.locator('.FileIcon[src$="/javascript.svg"]')).toHaveCount(1)

  // act
  await Search.focusPreviousPage()
  await Search.focusPreviousPage()
  await Search.focusPreviousPage()
  await Search.focusPreviousPage()

  // assert
  await expect(firstFile).toBeVisible()
  await expect(firstFile.locator('.FileIcon[src$="/css.svg"]')).toHaveCount(1)
}
