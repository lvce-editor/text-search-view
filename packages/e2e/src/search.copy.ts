import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.copy'

export const test: Test = async ({ ClipBoard, FileSystem, Search, SideBar, Workspace }) => {
  // arrange
  await ClipBoard.enableMemoryClipBoard()
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('ab')
  await Search.focusIndex(1)

  // act
  await Search.copy()

  // assert
  await ClipBoard.shouldHaveText('abc')
}
