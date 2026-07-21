export interface TreeItem {
  readonly depth: number
  readonly icon: string
  readonly label: string
  readonly posInSet: number
  readonly selected: boolean
  readonly setSize: number
  readonly uri: string
}
