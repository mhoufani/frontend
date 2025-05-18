  import { describe, it, expect}  from "@jest/globals";

import {
  PhoneNumberPrefixLocationFRWithSpace,
  addLeadingDotToFileExtension,
  fromSlug,
  toBoolean,
  toTitle,
} from '../';

describe('formatter', () => {
  describe('fromSlug', () => {
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
    it('should return toTitle string', () => {
      expect(toTitle('audi+a3')).toBe('Audi A3');
      expect(toTitle('volkswagen-golf')).toBe('Volkswagen Golf');
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
  describe('addLeadingDotToFileExtension', () => {
    it('should return file extension with leading dot', () => {
      expect(addLeadingDotToFileExtension('')).toEqual('.');
      expect(addLeadingDotToFileExtension('.')).toEqual('.');
      expect(addLeadingDotToFileExtension('jpg')).toEqual('.jpg');
      expect(addLeadingDotToFileExtension('.jpg')).toEqual('.jpg');
    });
  });
});
