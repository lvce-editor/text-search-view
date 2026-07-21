import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.replace-all-100-results'

export const test: Test = async ({ expect, FileSystem, Locator, Main, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  const promises: Promise<void>[] = []
  for (let i = 0; i < 100; i++) {
    promises.push(FileSystem.writeFile(`${tmpDir}/${i}.css`, `abc`))
  }
  await Promise.all(promises)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('ab')
  await Search.toggleReplace()
  await Search.setReplaceValue('d')
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('100 results in 100 files')

  // act
  await Search.replaceAll()

  // assert
  await Main.openUri(`${tmpDir}/0.css`)
  const row = Locator('.EditorRow')
  await expect(row).toHaveText('d')
  await Main.openUri(`${tmpDir}/99.css`)
  await expect(row).toHaveText('d')
  await expect(message).toHaveText(`Replaced 100 occurrences across 100 files with 'd'`)
}
