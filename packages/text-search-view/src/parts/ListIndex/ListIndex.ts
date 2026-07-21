export const first = (): number => {
  return 0
}

export const last = <T>(items: readonly T[]): number => {
  return items.length - 1
}

export const next = <T>(items: readonly T[], index: number): number => {
  return (index + 1) % items.length
}

export const previous = <T>(items: readonly T[], index: number): number => {
  return index === 0 ? items.length - 1 : index - 1
}
