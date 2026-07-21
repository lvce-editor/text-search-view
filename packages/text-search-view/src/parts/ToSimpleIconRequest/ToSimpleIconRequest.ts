import type { IconRequest } from '../IconRequest/IconRequest.ts'
import { getSimpleIconRequestType } from '../GetSimpleIconRequestType/GetSimpleIconRequestType.ts'

export interface SimpleIconRequest {
  readonly name: string
  readonly type: number
}

export const toSimpleIconRequest = (request: IconRequest): SimpleIconRequest => {
  return {
    name: request.name,
    type: getSimpleIconRequestType(request.type),
  }
}
