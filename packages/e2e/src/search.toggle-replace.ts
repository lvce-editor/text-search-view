import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.toggle-replace'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('ab')
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('1 result in 1 file')
  // await Search.collapseDetails()
  // const details = Locator('.SearchHeaderDetailsExpandedTop')
  const replace = Locator('[name="ReplaceValue"]')
  await expect(replace).toBeHidden()

  // act
  await Search.toggleReplace()

  // assert
  await expect(replace).toBeVisible()

  // act
  await Search.toggleReplace()

  // assert
  await expect(replace).toBeHidden()
}
