import { describe, it, expect}  from "@jest/globals";

import {
  PhoneNumberPrefixLocationFRWithSpace,
  fromSlug,
  toBoolean,
  toTitle,
  trim,
  trimStart,
  trimEnd,
} from '@formatter';

describe('formatter', () => {
  describe('fromSlug', () => {
    it('should return falsy', () => {
      expect(fromSlug(undefined)).toBeFalsy();
      expect(fromSlug(null)).toBeFalsy();
      expect(fromSlug(false)).toBeFalsy();
    });
    it('should return from slug string', () => {
      expect(fromSlug('audi+a3')).toBe('audi a3');
      expect(fromSlug('volkswagen-golf')).toBe('volkswagen golf');
    });
    it('should return from slug string with replacement option', () => {
      expect(fromSlug('audi#a3')).toBe('audi#a3');
      expect(fromSlug('audi#a3', { replacement: '#' })).toBe(
        'audi a3'
      );
    });
  });
  describe('toBoolean', () => {
    it('should return true', () => {
      expect(toBoolean('true')).toBe(true);
    });
    it('should return false', () => {
      expect(toBoolean('false')).toBe(false);
    });
  });
  describe('toTitle', () => {
    it('should return falsy', () => {
      expect(toTitle(undefined)).toBeFalsy();
      expect(toTitle(null)).toBeFalsy();
      expect(toTitle(false)).toBeFalsy();
    });
    it('should return toTitle string', () => {
      expect(toTitle('audi+a3')).toBe('Audi A3');
      expect(toTitle('volkswagen-golf')).toBe('Volkswagen Golf');
    });
  });
  describe('trimStart', () => {
    it('should trimStart spaces at the start', () => {
      expect(trimStart('  String with two spaces before')).toBe(
        'String with two spaces before'
      );
    });
    it('should trimStart slash at the start', () => {
      expect(trimStart('/path/', '/')).toBe('path/');
    });
    it('should not trimStart', () => {
      const path = '/path/';
      expect(trimStart(path)).toBe(path);
    });
    it('should return empty string', () => {
      expect(trimStart(undefined)).toBe('');
      expect(trimStart(null)).toBe('');
    });
  });
  describe('trimEnd', () => {
    it('should trimEnd spaces at the end', () => {
      expect(trimEnd('String with two spaces after  ')).toBe(
        'String with two spaces after'
      );
    });
    it('should trimEnd slash at the end', () => {
      expect(trimEnd('/path/', '/')).toBe('/path');
    });
    it('should not trimEnd', () => {
      const path = '/path/';
      expect(trimEnd(path)).toBe(path);
    });
    it('should return empty string', () => {
      expect(trimEnd(undefined)).toBe('');
      expect(trimEnd(null)).toBe('');
    });
  });
  describe('trim', () => {
    it('should trim spaces at the end', () => {
      expect(trim('  String with two spaces over  ')).toBe(
        'String with two spaces over'
      );
    });
    it('should trim slash at the end', () => {
      expect(trim('/path/', '/')).toBe('path');
    });
    it('should not trim', () => {
      const path = '/path/';
      expect(trim(path)).toBe(path);
    });
    it('should return empty string', () => {
      expect(trim(undefined)).toBe('');
      expect(trim(null)).toBe('');
      expect(trim([])).toBe('');
    });
    it('should return object stringify', () => {
      expect(trim({})).toBe('[object Object]');
      expect(trim({}, ']')).toBe('[object Object');
    });
  });
  describe('PhoneNumberPrefixLocationFRWithSpace', () => {
    it('should return pretty phone number', () => {
      const test = '0102030405';
      expect(PhoneNumberPrefixLocationFRWithSpace(test)).toEqual(
        '+33 (0)1 02 03 04 05'
      );
    });
    it('should return N.C if phone provided is undefined', () => {
      const test = undefined;
      expect(PhoneNumberPrefixLocationFRWithSpace(test)).toEqual(
        'N.C'
      );
    });
    it('should return N.C if phone provided is null', () => {
      const test = null;
      expect(PhoneNumberPrefixLocationFRWithSpace(test)).toEqual(
        'N.C'
      );
    });
    it('should return N.C if phone provided is empty', () => {
      const test = '';
      expect(PhoneNumberPrefixLocationFRWithSpace(test)).toEqual(
        'N.C'
      );
    });
  });
});
