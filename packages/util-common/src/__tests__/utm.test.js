import {
  createUtmFromQuery,
  createUtmFromReferer,
  isSameUtm,
  isSameUTMs,
  StoreLegacySupport,
} from '../utm/rules.js';

import UTM from '../utm/index.js';

import {
  UTM_NAME_STORE,
  UTM_MEDIUM,
  UTM_MEDIUM_ENUM,
  UTM_SOURCE,
  UTM_CAMPAIGN,
  UTM_CONTENT,
  UTM_TERM,
  UTM_ENUM,
} from '../utm/config.js';

beforeEach(() => {
  localStorage.clear();
});

describe('UTM', () => {
  describe('createUtmFromQuery', () => {
    it('should return utm object', () => {
      expect(createUtmFromQuery({})).toBeNull();
    });
    it('should return utm object with valid keys', () => {
      expect(createUtmFromQuery({ [UTM_MEDIUM]: 'data' })).toEqual({
        medium: 'data',
      });
    });
  });
  describe('createUtmFromReferer', () => {
    it('should return utm object searchEngine', () => {
      expect(createUtmFromReferer('https://www.google.fr')).toEqual({
        marketingMedium: UTM_MEDIUM_ENUM.ORGANIC,
        leadSource: 'google',
      });
    });
    it('should return utm object socialNetwork', () => {
      expect(
        createUtmFromReferer('https://www.facebook.com')
      ).toEqual({
        marketingMedium: UTM_MEDIUM_ENUM.REFERRAL,
        leadSource: 'facebook',
      });
    });
    it('should return utm object direct', () => {
      expect(createUtmFromReferer()).toEqual({
        marketingMedium: UTM_MEDIUM_ENUM.DIRECT,
      });
    });
  });
  describe('isSameUTMs', () => {
    it('should return true', () => {
      expect(isSameUTMs({ utms: {} }, { utms: {} })).toBeTruthy();
      expect(
        isSameUTMs(
          {
            utms: {
              source: 'google',
              medium: UTM_MEDIUM_ENUM.ORGANIC,
            },
          },
          {
            utms: {
              source: 'google',
              medium: UTM_MEDIUM_ENUM.ORGANIC,
            },
          }
        )
      ).toBeTruthy();
    });
    it('should return false', () => {
      expect(isSameUTMs({ utms: {} }, { utms: {} })).toBeTruthy();
      expect(
        isSameUTMs(
          {
            utms: {
              source: 'facebook',
              medium: UTM_MEDIUM_ENUM.ORGANIC,
            },
          },
          {
            utms: {
              source: 'google',
              medium: UTM_MEDIUM_ENUM.ORGANIC,
            },
          }
        )
      ).toBeFalsy();
    });
  });
  describe('getLastTouchPoint', () => {
    const mockUTMs = [
      {
        visitedAt: '',
        utms: { medium: UTM_MEDIUM_ENUM.ORGANIC, source: 'google' },
      },
      { visitedAt: '', isMobile: false, utms: {} },
    ];
    it('should return touchpoint', () => {
      localStorage[UTM_NAME_STORE] = JSON.stringify(mockUTMs);
      expect(UTM().getLatest()).toEqual(mockUTMs[1]);
    });
    it('should return null', () => {
      expect(UTM().getLatest()).toBeNull();
    });
  });
  describe('isSameUtm', () => {
    const mockUtms = [
      { mobile: true, utms: {} },
      {
        mobile: true,
        utms: { medium: UTM_MEDIUM_ENUM.ORGANIC, source: 'google' },
      },
    ];
    localStorage[UTM_NAME_STORE] = JSON.stringify(mockUtms);
    it('should return true', () => {
      expect(isSameUtm(mockUtms[1], mockUtms[1])).toBeTruthy();
    });
    it('should return false', () => {
      expect(isSameUtm(mockUtms[0], mockUtms[1])).toBeFalsy();
      expect(isSameUtm(mockUtms[0])).toBeFalsy();
      expect(isSameUtm(null, null)).toBeFalsy();
    });
  });
  describe('StoreLegacySupport', () => {
    it('should be formatted', () => {
      const mockTouchPoints = [
        { dateTime: 'YYYY-MM-DD HH:mm:ss', mobile: true, utms: {} },
        {
          dateTime: 'YYYY-MM-DD HH:mm:ss',
          isMobile: true,
          utms: { medium: UTM_MEDIUM_ENUM.ORGANIC, source: 'google' },
        },
      ];
      const expectTouchPoints = [
        {
          visitedAt: 'YYYY-MM-DD HH:mm:ss',
          isMobile: true,
          utms: {},
        },
        {
          visitedAt: 'YYYY-MM-DD HH:mm:ss',
          isMobile: true,
          utms: {
            marketingMedium: UTM_MEDIUM_ENUM.ORGANIC,
            leadSource: 'google',
          },
        },
      ];
      expect(StoreLegacySupport(mockTouchPoints).import()).toEqual(
        expectTouchPoints
      );
    });
  });
  describe('handle', () => {
    it('should handle query params', () => {
      UTM().handle(
        {
          [UTM_MEDIUM]: 'medium',
          [UTM_SOURCE]: 'google',
          [UTM_CAMPAIGN]: 'campaign',
          [UTM_CONTENT]: 'content',
          [UTM_TERM]: 'term',
        },
        'https://www.google.fr'
      );
      expect(UTM().getLatest()).toEqual({
        visitedAt: expect.any(String),
        isMobile: false,
        utms: {
          [UTM_ENUM.MARKETING_MEDIUM]: 'medium',
          [UTM_ENUM.LEAD_SOURCE]: 'google',
          [UTM_ENUM.AD_CAMPAIGN]: 'campaign',
          [UTM_ENUM.CAMPAIGN_SUBJECT]: 'content',
          [UTM_ENUM.BROWSING_TERM]: 'term',
        },
      });
    });
    it('should handle organic utm', () => {
      UTM().handle({}, 'https://www.google.fr');
      expect(UTM().getLatest()).toEqual({
        visitedAt: expect.any(String),
        isMobile: false,
        utms: {
          [UTM_ENUM.MARKETING_MEDIUM]: 'organic',
          [UTM_ENUM.LEAD_SOURCE]: 'google',
        },
      });
    });
    it('should handle referral utm', () => {
      UTM().handle({}, 'https://www.toto.fr');
      expect(UTM().getLatest()).toEqual({
        visitedAt: expect.any(String),
        isMobile: false,
        utms: {
          [UTM_ENUM.MARKETING_MEDIUM]: 'referral',
          [UTM_ENUM.LEAD_SOURCE]: 'toto.fr',
        },
      });
    });
    it('should handle direct utm', () => {
      UTM().handle({}, '');
      expect(UTM().getLatest()).toEqual({
        visitedAt: expect.any(String),
        isMobile: false,
        utms: {
          [UTM_ENUM.MARKETING_MEDIUM]: 'direct',
        },
      });
    });
  });
});
