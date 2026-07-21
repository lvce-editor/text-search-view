import type { TextSearchProvider } from '../TextSearchProvider/TextSearchProvider.ts'

const providers = Object.create(null)

interface TextSearchProviderMap {
  readonly [key: string]: TextSearchProvider
}

export const add = (providerMap: TextSearchProviderMap): void => {
  Object.assign(providers, providerMap)
}

export const get = (protocol: string): TextSearchProvider => {
  return providers[protocol] || providers['default']
}

export const reset = (): void => {
  for (const key of Object.keys(providers)) {
    delete providers[key]
  }
}

export const set = (providerMap: TextSearchProviderMap): void => {
  reset()
  add(providerMap)
}
