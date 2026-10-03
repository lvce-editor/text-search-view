export const verifyNativeFocus = async (page, testName, expect) => {
  if (!['viewlet.search-editor-open.ts', 'viewlet.search-editor-new-each-time.ts'].includes(testName)) return
  const tabs = page.locator('.MainTab')
  const initialCount = await tabs.count()
  const sidebarInput = page.locator('.SideBar textarea[name="SearchValue"]')
  const sidebarQuery = await sidebarInput.inputValue()
  const input = page.locator('.Main textarea[name="SearchValue"]')
  for (const [index, query] of ['native first query', 'native second query'].entries()) {
    await page.getByTitle('Open New Search Editor', { exact: true }).click()
    await expect(tabs).toHaveCount(initialCount + index + 1)
    await expect(tabs.last()).toHaveAttribute('aria-selected', 'true')
    await expect(input).toBeFocused()
    // Do not focus or fill a locator: type into the element selected by the application.
    await page.keyboard.type(query)
    await expect(input).toHaveValue(query)
    await expect(sidebarInput).toHaveValue(sidebarQuery)
  }
  await tabs.nth(initialCount).click()
  console.error(
    '[DEBUG-tab-state]',
    await tabs.evaluateAll((elements) =>
      elements.map((element) => ({ selected: element.getAttribute('aria-selected'), index: element.getAttribute('data-index') })),
    ),
  )
  await expect(tabs.nth(initialCount)).toHaveAttribute('aria-selected', 'true')
  await expect(input).toHaveValue('native first query')
  await tabs.nth(initialCount + 1).click()
  await expect(input).toHaveValue('native second query')
}
