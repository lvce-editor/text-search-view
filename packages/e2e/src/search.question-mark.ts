import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.question-mark'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.txt`, `ready?`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')

  await Search.setValue('?')

  const message = Locator('.Search').locator('[role="status"]')
  await expect(message).toHaveText('1 result in 1 file')
}
