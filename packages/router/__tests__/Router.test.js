import { Router } from '../Router';

describe('Router', () => {
  it('should return pathIgnore valid', () => {
    const router = new Router({
      i18n: {
        defaultLocale: 'fr',
        locales: ['fr', 'en'],
      },
      pathIgnore: ['/_next', '/public', '/favicon'],
      rules: [],
    });

    expect(router.pathThru('/_next/static')).toBeTruthy();
    expect(router.pathThru('/public/image.webp')).toBeTruthy();
    expect(router.pathThru('/favicon.ico')).toBeTruthy();
    expect(router.pathThru('/favicon-48x48.ico')).toBeTruthy();
    expect(router.pathThru('/')).toBeFalsy();
  });

  it('should return url from params', () => {
    const router = new Router({
      i18n: {
        defaultLocale: 'fr',
        locales: ['fr', 'en'],
      },
      pathIgnore: [],
      rules: [
        {
                name: 'home',
      page: '/home',
      match: {
        fr: {
          pathRules: [
            {
              pattern: ['/']
            }
          ]
        },
        },
      ],
    });

    expect(
      router.getUrlFromParams('test', { test: 'occasion' })
    ).toEqual('/occasion/voiture.html');
  });
});

// nextRouterConfig = {
//   protocol: 'https',
//   domaine: 'reezocar.com',
//   i18n: {
//     defaultLocale: 'fr',
//     locales: ['fr', 'en'],
//     authorizedOnDefaultLocale: ['en']
//     translatePath: true,
//     redirectOnDefaultLocale: true // todo : add redirect on default locale prefix
//   },
//   pathIgnore: [
//     '/_next',
//     '/__next',
//     '/public',
//     '/static',
//     '/chunks',
//     '/pages',
//     '/api',
//     '/assets',
//     '/images',
//     '/favicon'
//   ],
//   rules: [
//     {
//       name: 'home',
//       page: '/home',
//       match: {
//         fr: {
//           pathRules: [
//             {
//               pattern: ['/']
//             }
//           ]
//         },
//         en: {
//           pathRules: [
//             {
//               pattern: ['/']
//             }
//           ]
//         }
//       }
//     },
//     {
//       name: 'search',
//       page: '/search',
//       match: {
//         fr: {
//           pathRules: [
//             {
//               pattern: ['/recherche'],
//               suffix: '.html',
//               trailingSlash: false
//             },
//             {
//               pattern: ['/:carState(occasion|neuve)/voiture'],
//               suffix: ['.html'],
//               defaultPath: {
//                 carState: 'occasion'
//               }
//             },
//             {
//               pattern: ['/:financingType(leasing)/voiture'],
//               suffix: ['.html']
//             },
//             {
//               pattern: ['/:financingType(leasing)/:slug'],
//               suffix: ['.html']
//             }
//           ],
//           resolvers: {
//             carState: {
//               occasion: 'used',
//               neuve: 'new'
//             }
//           }
//         },
//         en: {
//           pathRules: [
//             {
//               pattern: ['/search'],
//               suffix: ['.html'],
//               trailingSlash: false
//             },
//             {
//               pattern: ['/:carState(used|new)/car'],
//               suffix: ['.html'],
//               defaultPath: {
//                 carState: 'used'
//               }
//             },
//             {
//               pattern: ['/:financingType(leasing)/car'],
//               suffix: ['.html']
//             }
//           ],
//           resolvers: {
//             carState: {
//               used: 'used',
//               new: 'used'
//             },
//             financingType: {
//               leasing: 'leasing'
//             }
//           }
//   ]
// }
// }
// },
// {
//   name: 'car',
//     page: '/standalone',
//   match: {
//   fr: {
//     pathRules: [
//       {
//         pattern:
//           '/:carState(occasion|neuve)/annonce-:make-:model-:adId',
//         suffix: ['.html']
//       }
//     ]
//   },
//   en: {
//     pathRules: [
//       {
//         pattern:
//           '/:carState(used|new)/announce-:make-:model-:adId',
//         suffix: ['.html']
//       }
//     ],
//       resolvers: {
//       carState: {
//         used: 'USED',
//           new: 'NEW'
//       }
//     }
//   ]
//   }
// }
// }
// ]
// };
