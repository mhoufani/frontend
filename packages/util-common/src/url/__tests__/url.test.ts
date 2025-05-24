import { describe, expect, it } from '@jest/globals';
import { Url } from '../url';

describe('Url', () => {
  describe('basic operations', () => {
    it('should get path correctly', () => {
      expect(Url('https://example.com/path').getPath()).toBe('https://example.com/path');
      expect(Url('https://example.com/path?query=1').getPath()).toBe('https://example.com/path');
    });

    it('should get query correctly', () => {
      expect(Url('https://example.com/path?query=1').getQuery()).toBe('query=1');
      expect(Url('https://example.com/path').getQuery()).toBeUndefined();
    });

    it('should check if URL has query', () => {
      expect(Url('https://example.com/path?query=1').hasQuery()).toBe(true);
      expect(Url('https://example.com/path').hasQuery()).toBe(false);
    });

    it('should check if URL is absolute', () => {
      expect(Url('https://example.com').isAbsolute()).toBe(true);
      expect(Url('/path').isAbsolute()).toBe(false);
    });
  });

  describe('query parameters', () => {
    it('should parse query parameters', () => {
      const result = Url('https://example.com/path?a=1&b=2').parseQueryParameters();
      expect(result).toEqual({ a: '1', b: '2' });
    });

    it('should handle missing query parameters', () => {
      const result = Url('https://example.com/path').parseQueryParameters();
      expect(result).toBeNull();
    });

    it('should remove specific query parameters', () => {
      const url = Url('https://example.com/path?a=1&b=2&c=3');
      expect(url.removeQueryParameters(['b']).emit())
        .toBe('https://example.com/path?a=1&c=3');
    });

    it('should remove all query parameters', () => {
      const url = Url('https://example.com/path?a=1&b=2');
      expect(url.removeQuery().emit()).toBe('https://example.com/path');
    });
  });

  describe('transformations', () => {
    it('should map over URL string', () => {
      const url = Url('https://example.com');
      expect(url.map(x => x.toUpperCase()).emit())
        .toBe('HTTPS://EXAMPLE.COM');
    });

    it('should chain transformations', () => {
      const url = Url('https://example.com/path?query=1');
      const result = url
        .removeQuery()
        .map(x => x.toUpperCase());
      expect(result.emit()).toBe('HTTPS://EXAMPLE.COM/PATH');
    });

    it('should allow custom transformations with chain', () => {
      const url = Url('https://example.com/path?a=1&b=2');
      const result = url.chain(x => x.split('?').length);
      expect(result).toBe(2);
    });
  });

  describe('error cases', () => {
    it('should handle empty string', () => {
      const url = Url('');
      expect(url.getPath()).toBe('');
      expect(url.getQuery()).toBeUndefined();
      expect(url.parseQueryParameters()).toBeNull();
    });

    it('should handle malformed URLs', () => {
      const url = Url('not-a-url?a=1&?b=2');
      expect(url.getPath()).toBe('not-a-url');
      expect(url.getQuery()).toBe('a=1&?b=2');
    });

    it('should handle malformed query parameters', () => {
      const url = Url('https://example.com?a=&=2&c');
      const params = url.parseQueryParameters();
      expect(params).toEqual({ a: '', '': '2', c: undefined });
    });
  });

  describe('isAbsolute', () => {
    it('should identify absolute URLs with common protocols', () => {
      expect(Url('https://example.com').isAbsolute()).toBe(true);
      expect(Url('http://example.com').isAbsolute()).toBe(true);
      expect(Url('ftp://files.example.com').isAbsolute()).toBe(true);
      expect(Url('sftp://secure.example.com').isAbsolute()).toBe(true);
      expect(Url('ws://socket.example.com').isAbsolute()).toBe(true);
      expect(Url('wss://secure.socket.example.com').isAbsolute()).toBe(true);
      expect(Url('file:///path/to/file').isAbsolute()).toBe(true);
    });

    it('should identify absolute URLs with custom protocols', () => {
      expect(Url('custom+protocol://example.com').isAbsolute()).toBe(true);
      expect(Url('git+ssh://git@github.com').isAbsolute()).toBe(true);
      expect(Url('my.protocol://custom.example.com').isAbsolute()).toBe(true);
    });

    it('should identify non-absolute URLs', () => {
      expect(Url('//example.com').isAbsolute()).toBe(false);
      expect(Url('/absolute/path').isAbsolute()).toBe(false);
      expect(Url('relative/path').isAbsolute()).toBe(false);
      expect(Url('./relative/path').isAbsolute()).toBe(false);
      expect(Url('../relative/path').isAbsolute()).toBe(false);
      expect(Url('path?query=value').isAbsolute()).toBe(false);
      expect(Url('?query=value').isAbsolute()).toBe(false);
      expect(Url('#fragment').isAbsolute()).toBe(false);
    });

    it('should handle invalid protocol formats', () => {
      expect(Url('://example.com').isAbsolute()).toBe(false);
      expect(Url('123://example.com').isAbsolute()).toBe(false);
      expect(Url('-protocol://example.com').isAbsolute()).toBe(false);
      expect(Url('@protocol://example.com').isAbsolute()).toBe(false);
    });
  });
}); 