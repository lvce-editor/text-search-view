import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.update-query-fewer-results'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.txt`, `alpha\nalpine`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('alp')
  const message = Locator('.Search').locator('[role="status"]')
  await expect(message).toHaveText('2 results in 1 file')

  await Search.setValue('alpha')

  await expect(message).toHaveText('1 result in 1 file')
}
