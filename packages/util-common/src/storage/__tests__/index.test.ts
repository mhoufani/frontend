import { describe, expect, it, jest, beforeEach } from '@jest/globals';
import { LocalStorage, SessionStorage, Storage } from '..';

jest.fn(() => null)

beforeEach(() => {
  localStorage.clear()
  sessionStorage.clear()
})

describe('storage', () => {
  describe('localstorage', () => {
    it('should check availability', () => {
      expect(LocalStorage.isAvailable()).toBe(true)
    })

    it('should return value', () => {
      expect(LocalStorage.get('test')).toBeNull()
      LocalStorage.set('test', 'test')
      expect(LocalStorage.get('test')).toEqual('test')
    })

    it('should chain storage setItem', () => {
      LocalStorage.set('test', 'test').set('test2', 'test2')
      expect(LocalStorage.get('test')).toEqual('test')
      expect(LocalStorage.get('test2')).toEqual('test2')
    })

    it('should chain storage action', () => {
      LocalStorage.set('test', 'test')
        .set('test2', 'test2')
        .remove('test')
        .remove('test2')
        .set('test2', 'test2')
        .clear()
      expect(LocalStorage.get('test')).toBeNull()
      expect(LocalStorage.get('test2')).toBeNull()
    })

    it('should store type Object', () => {
      LocalStorage.set('test', { test: 'test' }).set('test2', [1, 2, 3])
      expect(LocalStorage.get('test')).toEqual({ test: 'test' })
      expect(LocalStorage.get('test2')).toEqual([1, 2, 3])
    })

    it('should handle invalid JSON gracefully', () => {
      // Manually set invalid JSON
      window.localStorage.setItem('invalid', '{invalid json}')
      expect(LocalStorage.get('invalid')).toBeNull()
    })

    it('should return all items', () => {
      LocalStorage.set('test1', 'value1')
      LocalStorage.set('test2', 'value2')
      const all = LocalStorage.all()
      expect(all).toBeTruthy()
    })

    it('should handle errors when storage is not available', () => {
      const mockError = new Error('Storage not available')
      const originalSetItem = window.localStorage.setItem
      window.localStorage.setItem = jest.fn().mockImplementation(() => {
        throw mockError
      })

      expect(() => LocalStorage.set('test', 'value')).not.toThrow()
      expect(LocalStorage.get('test')).toBeNull()

      window.localStorage.setItem = originalSetItem
    })
  })

  describe('sessionstorage', () => {
    it('should check availability', () => {
      expect(SessionStorage.isAvailable()).toBe(true)
    })

    it('should return value', () => {
      expect(SessionStorage.get('test')).toBeNull()
      SessionStorage.set('test', 'test')
      expect(SessionStorage.get('test')).toEqual('test')
    })

    it('should chain storage setItem', () => {
      SessionStorage.set('test', 'test').set('test2', 'test2')
      expect(SessionStorage.get('test')).toEqual('test')
      expect(SessionStorage.get('test2')).toEqual('test2')
    })

    it('should chain storage action', () => {
      SessionStorage.set('test', 'test')
        .set('test2', 'test2')
        .remove('test')
        .remove('test2')
        .set('test2', 'test2')
        .clear()
      expect(SessionStorage.get('test')).toBeNull()
      expect(SessionStorage.get('test2')).toBeNull()
    })

    it('should store type Object', () => {
      SessionStorage.set('test', { test: 'test' }).set('test2', [1, 2, 3])
      expect(SessionStorage.get('test')).toEqual({ test: 'test' })
      expect(SessionStorage.get('test2')).toEqual([1, 2, 3])
    })

    it('should handle invalid JSON gracefully', () => {
      window.sessionStorage.setItem('invalid', '{invalid json}')
      expect(SessionStorage.get('invalid')).toBeNull()
    })

    it('should handle errors when storage is not available', () => {
      const mockError = new Error('Storage not available')
      const originalSetItem = window.sessionStorage.setItem
      window.sessionStorage.setItem = jest.fn().mockImplementation(() => {
        throw mockError
      })

      expect(() => SessionStorage.set('test', 'value')).not.toThrow()
      expect(SessionStorage.get('test')).toBeNull()

      window.sessionStorage.setItem = originalSetItem
    })
  })

  describe('storage availability', () => {
    it('should handle quota exceeded errors', () => {
      const quotaError = new DOMException('Quota exceeded', 'QuotaExceededError')
      const originalSetItem = window.localStorage.setItem
      window.localStorage.setItem = jest.fn().mockImplementation(() => {
        throw quotaError
      })

      expect(() => LocalStorage.set('test', 'value')).not.toThrow()
      window.localStorage.setItem = originalSetItem
    })
  })
})
