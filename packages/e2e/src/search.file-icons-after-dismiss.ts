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
    const fileName = `${String(i).padStart(3, '0')}.js`
    promises.push(FileSystem.writeFile(`${tmpDir}/${fileName}`, 'abc'))
  }
  await Promise.all(promises)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('ab')
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('40 results in 40 files')
  await Search.focusIndex(0)
  await Search.handleWheel(1, 10_000)
  const fileToDismiss = viewletSearch.locator('.TreeItem[aria-expanded="true"]').first()
  await expect(fileToDismiss).toBeVisible()
  await expect(fileToDismiss.locator('.FileIcon[src$="/javascript.svg"]')).toHaveCount(1)

  // act
  await Search.dismissItem()

  // assert
  await expect(message).toHaveText('39 results in 39 files')
  const visibleFile = viewletSearch.locator('.TreeItem[aria-expanded="true"]').first()
  await expect(visibleFile).toBeVisible()
  await expect(visibleFile.locator('.FileIcon[src$="/javascript.svg"]')).toHaveCount(1)
}
