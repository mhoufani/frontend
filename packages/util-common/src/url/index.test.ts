import { describe, it, expect } from '@jest/globals'
import {
  Domain,
  addTrailingSlashToPath,
  removeTrailingSlashFromPath,
  Url,
} from '.'

describe('url', () => {
  describe('Domain', () => {
    it('should return domain', () => {
      expect(Domain('https://www.google.com').emit()).toEqual(
        'www.google.com',
      )
      expect(Domain('https://www.google.com').getSld()).toEqual('www')
      expect(Domain('https://www.google.com').getTld()).toEqual('com')
      expect(
        Domain('https://www.google.com').removeSLD().emit(),
      ).toEqual('google.com')
      expect(
        Domain('https://www.google.com').removeTld().emit(),
      ).toEqual('www.google')
      expect(Domain('https://www.google.com').parse()).toEqual({
        sld: 'www',
        tld: 'com',
        name: 'google',
        nameWithTld: 'google.com',
        hostname: 'www.google.com',
      })
      expect(
        Domain('https://www.google.com').chain((x) => x),
      ).toEqual('www.google.com')
      expect(Domain('http://localhost').parse()).toEqual({
        hostname: 'localhost',
        name: 'localhost',
        nameWithTld: 'localhost',
        sld: '',
        tld: '',
      })
      expect(Domain('localhost').parse()).toEqual({
        hostname: 'localhost',
        name: 'localhost',
        nameWithTld: 'localhost',
        sld: '',
        tld: '',
      })
      // todo: not enter in this case
      expect(Domain('127.0.0.1').parse()).toEqual({
        hostname: '127.0.0.1',
        name: '127.0.0.1',
        nameWithTld: '127.0.0.1',
        sld: '',
        tld: '1',
      })
    })
  })
  describe('addTrailingSlashToPath', () => {
    it('should return path with trailing slash', () => {
      expect(addTrailingSlashToPath('')).toEqual('/')
      expect(addTrailingSlashToPath('/')).toEqual('/')
      expect(addTrailingSlashToPath('/test')).toEqual('/test/')
      expect(addTrailingSlashToPath('/test/')).toEqual('/test/')
    })
  })
  describe('removeTrailingSlashFromPath', () => {
    it('should return path without trailing slash', () => {
      expect(removeTrailingSlashFromPath('')).toEqual('')
      expect(removeTrailingSlashFromPath('/')).toEqual('')
      expect(removeTrailingSlashFromPath('/test')).toEqual('/test')
      expect(removeTrailingSlashFromPath('/test/')).toEqual('/test')
    })
  })
  describe('Url', () => {
    it('should return url', () => {
      expect(
        Url('http://localhost:3000/test?test=1')
          .map((x) => x)
          .emit(),
      ).toEqual('http://localhost:3000/test?test=1')
      expect(
        Url('http://localhost:3000/test?test=1').filterQuery().emit(),
      ).toEqual('http://localhost:3000/test')
      expect(
        Url('http://localhost:3000/test?test=1')
          .filterQueryParameters('test')
          .emit(),
      ).toEqual('http://localhost:3000/test')
      expect(
        Url('http://localhost:3000/test?test=1').hasQuery(),
      ).toEqual(true)
      expect(
        Url('http://localhost:3000/test?test=1').toQueryParameters(),
      ).toEqual({ test: '1' })
      expect(
        Url('http://localhost:3000/test?test=1').toQueryParameters(),
      ).toEqual({ test: '1' })
    })
  })
})
