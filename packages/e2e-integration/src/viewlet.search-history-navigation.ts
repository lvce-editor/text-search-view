import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'viewlet.search-history-navigation'

const waitFor = async (assertion: () => Promise<void>): Promise<void> => {
  for (let attempt = 0; attempt < 100; attempt++) {
    try {
      await assertion()
      return
    } catch (error) {
      if (attempt === 99) {
        throw error
      }
      await new Promise((resolve) => setTimeout(resolve, 50))
    }
  }
}

export const test: Test = async ({ expect, FileSystem, KeyBoard, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/alpha.txt`, 'alpha')
  await FileSystem.writeFile(`${tmpDir}/beta.txt`, 'beta')
  await Workspace.setUri(tmpDir)
  await Main.closeAllEditors()
  await Main.openUri('search-editor://1/Search')

  const input = Locator('.Main textarea[name="SearchValue"]')
  const results = Locator('.Main .Search .TreeItem')
  await waitFor(() => expect(input).toBeVisible())
  await input.click()

  await input.type('alpha')
  await waitFor(() => expect(results).toHaveCount(2))
  const alphaFile = Locator('.Main .Search .TreeItem[aria-label$="alpha.txt"]')
  const betaFile = Locator('.Main .Search .TreeItem[aria-label$="beta.txt"]')
  await waitFor(() => expect(alphaFile).toBeVisible())
  await KeyBoard.press('Enter')
  await input.type(' beta')
  await waitFor(() => expect(results).toHaveCount(0))
  await KeyBoard.press('Enter')

  await KeyBoard.press('ArrowUp')
  await waitFor(() => expect(input).toHaveValue('alpha beta'))
  await waitFor(() => expect(results).toHaveCount(0))
  await KeyBoard.press('ArrowUp')
  await waitFor(() => expect(input).toHaveValue('alpha'))
  await waitFor(() => expect(results).toHaveCount(2))
  await waitFor(() => expect(alphaFile).toBeVisible())
  await expect(betaFile).toBeHidden()

  await KeyBoard.press('ArrowDown')
  await waitFor(() => expect(input).toHaveValue('alpha beta'))
  await waitFor(() => expect(results).toHaveCount(0))
  await KeyBoard.press('ArrowDown')
  await waitFor(() => expect(input).toHaveValue(''))
  await waitFor(() => expect(results).toHaveCount(0))
  await KeyBoard.press('ArrowDown')
  await waitFor(() => expect(input).toHaveValue(''))

  await KeyBoard.press('ArrowUp')
  await waitFor(() => expect(input).toHaveValue('alpha beta'))
  await input.type(' edited')
  await waitFor(() => expect(results).toHaveCount(0))
  await KeyBoard.press('Enter')
  await KeyBoard.press('ArrowUp')
  await waitFor(() => expect(input).toHaveValue('alpha beta edited'))
}
