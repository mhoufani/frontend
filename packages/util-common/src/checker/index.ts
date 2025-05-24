/**
 * Validates if a string is a valid phone number.
 * Supports international format with optional '+' prefix
 * Allows spaces between digits
 * Requires 8-20 digits (excluding spaces and '+')
 * @param {string} str - The string to validate as a phone number
 * @returns {boolean} True if the string is a valid phone number
 * @example
 * isPhone('+33612345678') // true
 * isPhone('06 12 34 56 78') // true
 * isPhone('123') // false (too short)
 */
export const isPhone = (str: string): boolean => {
  if (typeof str !== 'string') return false;
  // Remove all spaces
  const cleaned = str.replace(/\s+/g, '');
  // Check format: optional '+' followed by 8-20 digits
  return /^(\+)?[0-9]{8,20}$/.test(cleaned);
}

/**
 * Checks if a value is undefined or the string 'undefined'
 * @param {unknown} predicate - The value to check
 * @returns {boolean} True if the value is undefined or the string 'undefined'
 * @example
 * isUndefined(undefined) // true
 * isUndefined('undefined') // true
 * isUndefined(null) // false
 */
export const isUndefined = (predicate: unknown): boolean =>
  typeof predicate === 'undefined' || predicate === 'undefined'

/**
 * Checks if a value is null
 * @param {unknown} value - The value to check
 * @returns {boolean} True if the value is null
 * @example
 * isNull(null) // true
 * isNull(undefined) // false
 * isNull('') // false
 */
export const isNull = (value: unknown): boolean => value === null

/**
 * Checks if a value is null, undefined, or the string 'undefined'
 * @param {unknown} value - The value to check
 * @returns {boolean} True if the value is nullable
 * @example
 * isNullable(null) // true
 * isNullable(undefined) // true
 * isNullable('undefined') // true
 * isNullable('') // false
 */
export const isNullable = (value: unknown): boolean =>
  isUndefined(value) || isNull(value)

/**
 * Checks if a value is defined (not null, undefined, or the string 'undefined')
 * @param {unknown} predicate - The value to check
 * @returns {boolean} True if the value is defined
 * @example
 * isDefined(null) // false
 * isDefined(undefined) // false
 * isDefined('undefined') // false
 * isDefined('') // true
 * isDefined(0) // true
 */
export const isDefined = (predicate: unknown): boolean =>
  !isNullable(predicate)

/**
 * Checks if a value is an array
 * @param {unknown} predicate - The value to check
 * @returns {boolean} True if the value is an array
 * @example
 * isArray([]) // true
 * isArray([1, 2, 3]) // true
 * isArray({}) // false
 * isArray('[]') // false
 */
export const isArray = (predicate: unknown): boolean =>
  Array.isArray(predicate)

/**
 * Checks if a value is a string
 * @param {unknown} predicate - The value to check
 * @returns {boolean} True if the value is a string
 * @example
 * isString('') // true
 * isString('text') // true
 * isString(123) // false
 * isString(null) // false
 */
export const isString = (predicate: unknown): boolean =>
  typeof predicate === 'string'

/**
 * Checks if a value is empty
 * - Objects: no own properties
 * - Arrays: length === 0
 * - Strings: length === 0
 * - null/undefined: true
 * - Other types: false
 * @param {unknown} predicate - The value to check
 * @returns {boolean} True if the value is empty
 * @example
 * isEmpty({}) // true
 * isEmpty([]) // true
 * isEmpty('') // true
 * isEmpty(null) // true
 * isEmpty({ a: 1 }) // false
 * isEmpty([1]) // false
 * isEmpty('text') // false
 * isEmpty(123) // false
 */
export const isEmpty = (predicate: unknown): boolean => {
  if (predicate === null || predicate === undefined) return true;
  if (typeof predicate === 'string') return predicate.length === 0;
  if (Array.isArray(predicate)) return predicate.length === 0;
  if (typeof predicate === 'object') return Object.keys(predicate).length === 0;
  return false;
}

/**
 * Checks if a value can be converted to a valid number
 * @param {unknown} predicate - The value to check
 * @returns {boolean} True if the value is or can be converted to a number
 * @example
 * isNumber(1) // true
 * isNumber('1') // true
 * isNumber('1.5') // true
 * isNumber(NaN) // false
 * isNumber('text') // false
 */
export const isNumber = (predicate: unknown): boolean =>
  !Number.isNaN(Number(predicate))

/**
 * Checks if code is running in a browser environment
 * @returns {boolean} True if running in a browser
 * @example
 * isBrowser() // true in browser, false in Node.js
 */
export const isBrowser = (): boolean => typeof window !== 'undefined'
