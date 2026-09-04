type ObjectWithProperty<Key extends string, Value = unknown> = {
  [key in Key]: Value
}

export const hasProperty = <K extends string>(object: unknown, key: K): object is ObjectWithProperty<K> => {
  return !!object && typeof object === 'object' && key in object
}

export const hasStringProperty = <K extends string>(object: unknown, key: K): object is ObjectWithProperty<K, string> => {
  return hasProperty(object, key) && typeof object[key] === 'string'
}
