import { describe, expect, it } from '@jest/globals'
import {
  isEmpty,
  isUndefined,
  isPhone,
  isNull,
  isNumber,
  isArray,
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

    it('should return false if object is not empty', () => {
      expect(isEmpty({ a: 1 })).toBe(false)
    })

    it('should return false if array is not empty', () => {
      expect(isEmpty([1])).toBe(false)
    })

    it('should return false if string is not empty', () => {
      expect(isEmpty(' ')).toBe(false)
    })
  })
  describe('isUndefined', () => {
    it('should return true if value is undefined', () => {
      expect(isUndefined(undefined)).toBe(true)
    })

    it('should return false if value is not undefined', () => {
      expect(isUndefined(null)).toBe(false)
    })
  })
  describe('isPhone', () => {
    it('should return true if value is phone', () => {
      expect(isPhone('+33612345678')).toBe(true)
    })

    it('should return false if value is not phone', () => {
      expect(isPhone('not a phone')).toBe(false)
    })
  })
  describe('isNull', () => {
    it('should return true if value is null', () => {
      expect(isNull(null)).toBe(true)
    })
  })
  describe('isNumber', () => {
    it('should return true if value is number', () => {
      expect(isNumber(1)).toBe(true)
    })

    it('should return false if value is not number', () => {
      expect(isNumber('not a number')).toBe(false)
    })
  })
  describe('isArray', () => {
    it('should return true if value is array', () => {
      expect(isArray([])).toBe(true)
    })
  })
})
