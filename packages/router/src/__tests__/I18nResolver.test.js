import { describe, it, expect } from "@jest/globals";
import { I18nResolver } from '../I18nResolver';

describe('I18nResolver', () => {
  it('should return null if no locale is passed', () => {
    const resolver = I18nResolver.of({
      defaultLocale: 'en',
      locales: ['en', 'de'],
    });

    expect(
      resolver.parseUrl({
        url: '/en/fr/',
        protocol: 'https',
        headers: { host: 'host.com' },
      })
    ).toEqual({
      lang: 'en',
      locale: 'en',
    });
  });

  it('should return locale sames as lang', () => {
    const resolver = I18nResolver.of({
      defaultLocale: 'en',
      locales: ['en', 'de'],
    });
    const { lang, locale } = resolver.parseUrl({
      url: '/en/',
      protocol: 'https',
      headers: { host: 'host.com' },
    });

    expect({ lang, locale }).toEqual({
      lang: 'en',
      locale: 'en',
    });
  });
});
