import { describe, expect, it } from '@jest/globals';
import { addTrailingSlashToPath, removeTrailingSlashFromPath } from '../utils';

describe('URL Utils', () => {
  describe('addTrailingSlashToPath', () => {
    it('should add trailing slash when missing', () => {
      expect(addTrailingSlashToPath('/path')).toBe('/path/');
      expect(addTrailingSlashToPath('path')).toBe('path/');
    });

    it('should not add trailing slash when already present', () => {
      expect(addTrailingSlashToPath('/path/')).toBe('/path/');
      expect(addTrailingSlashToPath('path/')).toBe('path/');
    });

    it('should handle empty string', () => {
      expect(addTrailingSlashToPath('')).toBe('/');
    });

    it('should handle root path', () => {
      expect(addTrailingSlashToPath('/')).toBe('/');
    });
  });

  describe('removeTrailingSlashFromPath', () => {
    it('should remove trailing slash when present', () => {
      expect(removeTrailingSlashFromPath('/path/')).toBe('/path');
      expect(removeTrailingSlashFromPath('path/')).toBe('path');
    });

    it('should not modify path without trailing slash', () => {
      expect(removeTrailingSlashFromPath('/path')).toBe('/path');
      expect(removeTrailingSlashFromPath('path')).toBe('path');
    });

    it('should handle empty string', () => {
      expect(removeTrailingSlashFromPath('')).toBe('');
    });

    it('should handle root path', () => {
      expect(removeTrailingSlashFromPath('/')).toBe('');
    });
  });
}); 