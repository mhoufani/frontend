import { describe, expect, it } from '@jest/globals'
import {
  isEmpty,
  isUndefined,
  isPhone,
  isNull,
  isNumber,
  isArray,
  isString,
  isDefined,
  isNullable,
  isBrowser,
} from '../index'

describe('checker', () => {
  describe('isEmpty', () => {
    it('should return true if object is empty', () => {
      expect(isEmpty({})).toBe(true)
    })

    it('should return true if array is empty', () => {
      expect(isEmpty([])).toBe(true)
    })

    it('should return true if string is empty', () => {
      expect(isEmpty('')).toBe(true)
    })

    it('should return true for null and undefined', () => {
      expect(isEmpty(null)).toBe(true)
      expect(isEmpty(undefined)).toBe(true)
    })

    it('should return false if object is not empty', () => {
      expect(isEmpty({ a: 1 })).toBe(false)
    })

    it('should return false if array is not empty', () => {
      expect(isEmpty([1])).toBe(false)
    })

    it('should return false if string is not empty', () => {
      expect(isEmpty('text')).toBe(false)
    })

    it('should return false for non-empty-able types', () => {
      expect(isEmpty(123)).toBe(false)
      expect(isEmpty(true)).toBe(false)
    })
  })

  describe('isUndefined', () => {
    it('should return true if value is undefined', () => {
      expect(isUndefined(undefined)).toBe(true)
      expect(isUndefined('undefined')).toBe(true)
    })

    it('should return false if value is not undefined', () => {
      expect(isUndefined(null)).toBe(false)
      expect(isUndefined('')).toBe(false)
      expect(isUndefined(0)).toBe(false)
      expect(isUndefined(false)).toBe(false)
    })
  })

  describe('isPhone', () => {
    it('should return true if value is phone', () => {
      expect(isPhone('+33612345678')).toBe(true)
      expect(isPhone('33612345678')).toBe(true)
      expect(isPhone('0612345678')).toBe(true)
      expect(isPhone('06 12 34 56 78')).toBe(true)
    })

    it('should return false if value is not phone', () => {
      expect(isPhone('not a phone')).toBe(false)
      expect(isPhone('123')).toBe(false)
      expect(isPhone('+')).toBe(false)
      expect(isPhone('+abc12345678')).toBe(false)
    })
  })

  describe('isNull', () => {
    it('should return true if value is null', () => {
      expect(isNull(null)).toBe(true)
    })

    it('should return false if value is not null', () => {
      expect(isNull(undefined)).toBe(false)
      expect(isNull('')).toBe(false)
      expect(isNull(0)).toBe(false)
      expect(isNull(false)).toBe(false)
    })
  })

  describe('isNullable', () => {
    it('should return true for null or undefined values', () => {
      expect(isNullable(null)).toBe(true)
      expect(isNullable(undefined)).toBe(true)
      expect(isNullable('undefined')).toBe(true)
    })

    it('should return false for non-nullable values', () => {
      expect(isNullable('')).toBe(false)
      expect(isNullable(0)).toBe(false)
      expect(isNullable(false)).toBe(false)
      expect(isNullable({})).toBe(false)
    })
  })

  describe('isDefined', () => {
    it('should return false for null or undefined values', () => {
      expect(isDefined(null)).toBe(false)
      expect(isDefined(undefined)).toBe(false)
      expect(isDefined('undefined')).toBe(false)
    })

    it('should return true for defined values', () => {
      expect(isDefined('')).toBe(true)
      expect(isDefined(0)).toBe(true)
      expect(isDefined(false)).toBe(true)
      expect(isDefined({})).toBe(true)
    })
  })

  describe('isNumber', () => {
    it('should return true if value is number', () => {
      expect(isNumber(1)).toBe(true)
      expect(isNumber('1')).toBe(true)
      expect(isNumber(-1)).toBe(true)
      expect(isNumber('1.5')).toBe(true)
    })

    it('should return false if value is not number', () => {
      expect(isNumber('not a number')).toBe(false)
      expect(isNumber(NaN)).toBe(false)
      expect(isNumber(undefined)).toBe(false)
      expect(isNumber(null)).toBe(false)
    })
  })

  describe('isArray', () => {
    it('should return true if value is array', () => {
      expect(isArray([])).toBe(true)
      expect(isArray([1, 2, 3])).toBe(true)
    })

    it('should return false if value is not array', () => {
      expect(isArray(null)).toBe(false)
      expect(isArray(undefined)).toBe(false)
      expect(isArray({})).toBe(false)
      expect(isArray('[]')).toBe(false)
    })
  })

  describe('isString', () => {
    it('should return true if value is string', () => {
      expect(isString('')).toBe(true)
      expect(isString('text')).toBe(true)
      expect(isString(String(123))).toBe(true)
    })

    it('should return false if value is not string', () => {
      expect(isString(null)).toBe(false)
      expect(isString(undefined)).toBe(false)
      expect(isString(123)).toBe(false)
      expect(isString({})).toBe(false)
      expect(isString([])).toBe(false)
    })
  })
})
