import { expect, test } from '@jest/globals'
import { AriaRoles } from '@lvce-editor/constants'
import { ClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as GetIconsVirtualDom from '../src/parts/GetIconsVirtualDom/GetIconsVirtualDom.ts'

test('getIconsVirtualDom - returns array with icon virtual dom when icon is provided', () => {
  const icon = 'test-icon.svg'
  expect(GetIconsVirtualDom.getIconsVirtualDom(icon)).toEqual([
    {
      childCount: 0,
      className: ClassNames.FileIcon,
      role: AriaRoles.None,
      src: icon,
      type: VirtualDomElements.Img,
    },
  ])
})

test('getIconsVirtualDom - returns empty array when icon is empty string', () => {
  expect(GetIconsVirtualDom.getIconsVirtualDom('')).toEqual([])
})

test('getIconsVirtualDom - returns correct virtual dom for different icon strings', () => {
  const icon = 'folder-icon.png'
  const result = GetIconsVirtualDom.getIconsVirtualDom(icon)
  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    childCount: 0,
    className: ClassNames.FileIcon,
    role: AriaRoles.None,
    src: icon,
    type: VirtualDomElements.Img,
  })
})
