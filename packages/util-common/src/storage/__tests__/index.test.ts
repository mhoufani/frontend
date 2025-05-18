import { describe, expect, it, jest, beforeEach } from '@jest/globals';
import { LocalStorage, SessionStorage } from '@storage';

jest.fn(() => null)

beforeEach(() => {
  localStorage.clear()
  sessionStorage.clear()
})
describe('storage', () => {
  describe('localstorage', () => {
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
  })
  describe('localstorage', () => {
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
  })
})
