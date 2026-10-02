import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.file-icons-after-keyboard-scroll'

export const test: Test = async ({ Command, expect, Extension, FileSystem, IconTheme, Locator, Search, SideBar, Workspace }) => {
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
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('60 results in 60 files')
  const initialFile = viewletSearch.locator('.TreeItem[aria-expanded="true"]').first()
  const initialFileCssIcon = initialFile.locator('.FileIcon[src$="/css.svg"]')
  await expect(initialFileCssIcon).toHaveCount(1)

  // act
  await Search.focusIndex(119)

  // assert
  const lastFile = viewletSearch.locator('.TreeItem[aria-label="/059.js"]')
  await expect(lastFile).toBeVisible()
  const lastFileIcon = lastFile.locator('.FileIcon')
  await expect(lastFileIcon).toHaveCount(1)
  const lastFileJavaScriptIcon = lastFile.locator('.FileIcon[src$="/javascript.svg"]')
  await expect(lastFileJavaScriptIcon).toHaveCount(1)

  // act
  await Search.focusIndex(0)
  await Command.execute('Search.handleScrollBarClick', 10_000)

  // assert
  await expect(lastFile).toBeVisible()
  await expect(lastFileJavaScriptIcon).toHaveCount(1)
}
