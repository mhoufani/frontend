export const isPhone = (str: string): boolean => {
  const re = /^(\+)?[0-9]{8,20}$/
  str = str.replace(/ /g, '')
  return re.test(str)
}

export const isUndefined = (predicate: unknown): boolean =>
  typeof predicate === 'undefined' || predicate === 'undefined'

export const isNull = (value: unknown): boolean => value === null

export const isNullable = (value: unknown): boolean =>
  isUndefined(value) || isNull(value)

export const isDefined = (predicate: unknown): boolean => !isNullable(predicate)

export const isArray = (predicate: unknown): boolean => Array.isArray(predicate)

export const isString = (predicate: unknown): boolean =>
  typeof predicate === 'string'

export const isEmpty = (predicate: unknown) =>
  typeof predicate === 'object' && !Object.entries(predicate || {}).length

export const isNumber = (predicate: unknown): boolean =>
  !Number.isNaN(Number(predicate))

export const isBrowser = (): boolean => typeof window !== 'undefined';