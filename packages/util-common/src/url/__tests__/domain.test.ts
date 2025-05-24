import { describe, expect, it } from '@jest/globals';
import { Domain } from '../domain';

describe('Domain', () => {
  describe('parsing URLs', () => {
    it('should extract hostname from full URL', () => {
      const domain = Domain('https://www.example.com');
      expect(domain.emit()).toBe('www.example.com');
    });

    it('should handle URLs without www', () => {
      const domain = Domain('https://example.com');
      expect(domain.emit()).toBe('example.com');
    });

    it('should handle direct domain strings', () => {
      const domain = Domain('example.com');
      expect(domain.emit()).toBe('example.com');
    });
  });

  describe('domain components', () => {
    it('should get TLD correctly', () => {
      expect(Domain('www.example.com').getTld()).toBe('com');
      expect(Domain('example.co.uk').getTld()).toBe('uk');
      expect(Domain('example').getTld()).toBe('');
    });

    it('should get SLD correctly', () => {
      expect(Domain('www.example.com').getSld()).toBe('www');
      expect(Domain('example.com').getSld()).toBe('');
    });

    it('should remove TLD correctly', () => {
      const domain = Domain('www.example.com');
      expect(domain.removeTld().emit()).toBe('www.example');
    });

    it('should remove SLD correctly', () => {
      const domain = Domain('www.example.com');
      expect(domain.removeSLD().emit()).toBe('example.com');
    });
  });

  describe('parse method', () => {
    it('should parse full domain correctly', () => {
      const result = Domain('www.example.com').parse();
      expect(result).toEqual({
        sld: 'www',
        tld: 'com',
        name: 'example',
        nameWithTld: 'example.com',
        hostname: 'www.example.com'
      });
    });

    it('should parse domain without www correctly', () => {
      const result = Domain('example.com').parse();
      expect(result).toEqual({
        sld: '',
        tld: 'com',
        name: 'example',
        nameWithTld: 'example.com',
        hostname: 'example.com'
      });
    });

    it('should parse domain without TLD correctly', () => {
      const result = Domain('example').parse();
      expect(result).toEqual({
        sld: '',
        tld: '',
        name: 'example',
        nameWithTld: 'example',
        hostname: 'example'
      });
    });
  });

  describe('utility methods', () => {
    it('should map over domain string', () => {
      const domain = Domain('example.com');
      const result = domain.map(x => x.toUpperCase());
      expect(result.emit()).toBe('EXAMPLE.COM');
    });

    it('should chain transformations', () => {
      const domain = Domain('www.example.com');
      const result = domain
        .removeSLD()
        .map(x => x.toUpperCase());
      expect(result.emit()).toBe('EXAMPLE.COM');
    });

    it('should allow custom transformations with chain', () => {
      const domain = Domain('www.example.com');
      const result = domain.chain(x => x.split('.').length);
      expect(result).toBe(3);
    });
  });

  describe('IP address handling', () => {
    it('should detect IP addresses correctly', () => {
      expect(Domain('192.168.1.1').isIp()).toBe(true);
      expect(Domain('example.com').isIp()).toBe(false);
      expect(Domain('256.256.256.256').isIp()).toBe(false);
      expect(Domain('192.168.1').isIp()).toBe(false);
    });

    it('should parse IP addresses correctly', () => {
      const result = Domain('192.168.1.1').parse();
      expect(result).toEqual({
        sld: '',
        tld: '',
        name: '192.168.1.1',
        nameWithTld: '192.168.1.1',
        hostname: '192.168.1.1',
        isIp: true
      });
    });

    it('should handle IP addresses in URLs', () => {
      const result = Domain('http://192.168.1.1/path').parse();
      expect(result).toEqual({
        sld: '',
        tld: '',
        name: '192.168.1.1',
        nameWithTld: '192.168.1.1',
        hostname: '192.168.1.1',
        isIp: true
      });
    });

    it('should preserve IP addresses in transformations', () => {
      const domain = Domain('192.168.1.1');
      expect(domain.removeTld().emit()).toBe('192.168.1.1');
      expect(domain.removeSLD().emit()).toBe('192.168.1.1');
      expect(domain.getTld()).toBe('');
      expect(domain.getSld()).toBe('');
    });
  });

  describe('error cases', () => {
    it('should handle invalid URLs gracefully', () => {
      const domain = Domain('not-a-valid-url://example.com');
      expect(domain.emit()).toBe('not-a-valid-url://example.com');
    });

    it('should handle empty string input', () => {
      const domain = Domain('');
      expect(domain.emit()).toBe('');
      expect(domain.getTld()).toBe('');
      expect(domain.getSld()).toBe('');
      expect(domain.parse()).toEqual({
        sld: '',
        tld: '',
        name: '',
        nameWithTld: '',
        hostname: '',
        isIp: false
      });
    });

    it('should handle malformed domains', () => {
      const domain = Domain('example..com');
      expect(domain.getTld()).toBe('com');
      expect(domain.parse().name).toBe('example.');
      expect(domain.parse().isIp).toBe(false);
    });

    it('should handle domains with special characters', () => {
      const domain = Domain('example!@#.com');
      expect(domain.getTld()).toBe('com');
      expect(domain.parse().name).toBe('example!@#');
      expect(domain.parse().isIp).toBe(false);
    });
  });
}); 