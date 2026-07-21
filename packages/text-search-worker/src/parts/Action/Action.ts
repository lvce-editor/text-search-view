export interface Action {
  readonly command: string
  readonly enabled?: boolean
  readonly icon: string
  readonly id: string
  readonly label?: string
  readonly type: number
}
