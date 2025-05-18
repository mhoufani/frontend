import { describe, it, expect } from "@jest/globals";
import PageResolver from '../PageResolver/index.js';

describe('PageResolver', () => {
  it('should return a page route', () => {
    const pageRoute = new PageResolver({
      name: 'voiture',
      page: 'voiture',
      match: {
        fr: {
          pathRules: [
            {
              pattern: ['/:carState/voiture'],
              suffix: ['.html'],
            },
          ],
          resolvers: {
            carState: {
              occasion: 'USED',
            },
          },
        },
      },
    });

    expect(
      pageRoute.resolve('/occasion/voiture.html', 'fr', {
        financingType: ['loa', 'lld'],
      })
    ).toEqual({
      name: 'voiture',
      page: 'voiture',
      params: {
        carState: 'USED',
      },
      queryParams: {
        financingType: ['loa', 'lld'],
      },
    });

    expect(
      pageRoute.resolve('/occasion/voiture.html', 'en')
    ).toBeNull();
  });

  it('should return a page route with same queryParams and path variable', () => {
    const pageRoute = new PageResolver({
      name: 'voiture',
      page: 'voiture',
      match: {
        fr: {
          pathRules: [
            {
              pattern: ['/:financingType(leasing)/voiture'],
              suffix: ['.html'],
              matchByDefault: {
                pathParams: {
                  carState: 'occasion',
                },
                queryParams: {},
              },
            },
          ],
        },
      },
    });

    expect(
      pageRoute.resolve('/leasing/voiture.html', 'fr', {
        financingType: 'credit',
      })
    ).toEqual({
      name: 'voiture',
      page: 'voiture',
      params: {
        financingType: 'leasing',
      },
      queryParams: {
        financingType: 'credit',
      },
    });
  });
});
