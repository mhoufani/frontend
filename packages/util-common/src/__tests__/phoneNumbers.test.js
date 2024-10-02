import {
  addSpacesInPhoneNumber,
  getRawPhoneNumber,
  removeZerosFromCountryCode,
  getRawPhoneNumberWithoutCountryCode,
} from '../formatter/phoneNumbers.js';

describe('phoneNumbers', () => {
  describe('getRawPhoneNumber', () => {
    it('should return raw phone number', () => {
      expect(getRawPhoneNumber('06 12 34 56 78')).toEqual(
        '0612345678'
      );
    });
    it('should return raw phone number without spaces or special characters', () => {
      expect(getRawPhoneNumber('+33 6 12 34 56 78')).toEqual(
        '33612345678'
      );
    });
  });
  describe('addSpacesInPhoneNumber', () => {
    it('should return phone number with spaces', () => {
      expect(addSpacesInPhoneNumber('0612345678')).toEqual(
        '06 12 34 56 78'
      );
    });
    it('should return phone number with spaces even when it already has some', () => {
      expect(addSpacesInPhoneNumber('06 12 34 56 78')).toEqual(
        '06 12 34 56 78'
      );
    });
  });
  describe('removeZerosFromCountryCode', () => {
    it('should return phone number without double zeros before country code', () => {
      expect(
        removeZerosFromCountryCode('0033 6 12 34 56 78')
      ).toEqual('33 6 12 34 56 78');
    });
  });
  describe('getRawPhoneNumberWithoutCountryCode', () => {
    it('should return phone number without country code', () => {
      expect(
        getRawPhoneNumberWithoutCountryCode('+33 6 12 34 56 78')
      ).toEqual('0612345678');
    });
    it('should return phone number without country code in different format', () => {
      expect(
        getRawPhoneNumberWithoutCountryCode('0033 6 12 34 56 78')
      ).toEqual('0612345678');
    });
  });
});
