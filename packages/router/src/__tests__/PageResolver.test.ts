import { describe, it, expect } from "@jest/globals";
import { PageResolver } from '../PageResolver';

describe('PageResolver', () => {
  it('should return a page route', () => {
    const pageRoute = new PageResolver({
      name: 'product',
      page: 'product',
      match: {
        fr: {
          pathRules: [
            {
              pattern: ['/product/:productId'],
              suffix: ['.html'],
            },
          ],
        },
      },
    });

    expect(
      pageRoute.resolve('fr', '/product/123.html', {
        productId: '123',
      })
    ).toEqual({
      name: 'product',
      page: 'product',
      params: {
        productId: '123',
      },
      queryParams: {
        productId: '123',
      },
    });

    expect(
      pageRoute.resolve('en', '/product/123.html')
    ).toBeNull();

    expect(
      pageRoute.resolve('fr', '/product/123.html')
    ).toEqual({
      name: 'product',
      page: 'product',
      params: {
        productId: '123',
      },
      queryParams: {},
    });
  });

  it('should return a page route with same queryParams and path variable', () => {
    const pageRoute = new PageResolver({
      name: 'profile',
      page: 'profile',
      match: {
        fr: {
          pathRules: [
            {
              pattern: ['/:profileId/profile'],
              suffix: ['.html'],
              matchByDefault: {
                pathParams: {
                  profileId: '123',
                },
                queryParams: {},
              },
            },
          ],
        },
      },
    });

    expect(
      pageRoute.resolve('fr', '/123/profile.html')
    ).toEqual({
      name: 'profile',
      page: 'profile',
      params: {
        profileId: '123',
      },
      queryParams: {},
    });
  });
});
