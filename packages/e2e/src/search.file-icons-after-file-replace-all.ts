import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.file-icons-after-file-replace-all'

export const test: Test = async ({ Dialog, expect, Extension, FileSystem, IconTheme, Locator, Main, Search, SideBar, Workspace }) => {
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
  await Search.toggleReplace()
  await Search.setReplaceValue('d')
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('40 results in 40 files')
  await Search.focusIndex(50)
  const replacedFile = viewletSearch.locator('.TreeItem[aria-label="/025.js"]')
  await expect(replacedFile).toBeVisible()
  await Dialog.mockConfirm(() => true)

  // act
  await Search.replaceAll()

  // assert
  await expect(message).toHaveText("Replaced 1 occurrence across 1 file with 'd'")
  await expect(replacedFile).toBeHidden()
  const nextFile = viewletSearch.locator('.TreeItem[aria-label="/026.js"]')
  await expect(nextFile).toBeVisible()
  await expect(nextFile.locator('.FileIcon[src$="/javascript.svg"]')).toHaveCount(1)
  await Main.openUri(`${tmpDir}/025.js`)
  const editorRow = Locator('.EditorRow')
  await expect(editorRow).toHaveText('dc')
}
