// import * as pathToRegexp from 'path-to-regexp';
// import trimStart from 'lodash/trimStart.js';
// import omit from 'lodash/omit.js';
// import omitBy from 'lodash/omitBy.js';
// import pick from 'lodash/pick.js';
import { If, Maybe, Obj } from '@entity'

const _Domain = (x: string) => ({
  map: (f: (a: string) => string) => _Domain(f(x)),
  removeTld: () => _Domain(x.replace(`.${_Domain(x).getTld()}`, '')),
  removeSLD: () => _Domain(x.replace('www.', '')),
  getSld: () => (x.match(/www/g) || [])[0] || '',
  getTld: () => (x.split('.').length > 1 ? x.split('.').pop() : ''),
  parse: () => ({
    sld: _Domain(x).getSld(),
    tld: _Domain(x).getTld(),
    name: _Domain(x).removeTld().removeSLD().emit(),
    nameWithTld: _Domain(x).removeSLD().emit(),
    hostname: x,
  }),
  chain: (f: (a: string) => unknown) => f(x),
  emit: () => x,
})

export const Domain = (url: string) => {
  return _Domain(
    url.match('^(http|https)://') ? new URL(url).hostname : url,
  )
}

export const addTrailingSlashToPath = (path: string): string =>
  path && path.endsWith('/') ? path : `${path}/`

export const removeTrailingSlashFromPath = (path: string): string =>
  path && path.endsWith('/') ? path.slice(0, -1) : path

export const Url = (x: string) => ({
  map: (f: (a: string) => string) => Url(f(x)),
  filterQuery: () => Url(x.split('?')[0]),
  filterQueryParameters: (filteredParameters: string | string[]) =>
    Url(
      If(Url(x).toQueryParameters())
        .map((queryParameters) =>
          Obj(queryParameters as Record<string, string | string[]>)
            .removeProperty(filteredParameters)
            .toArray(([k, v]) => `${k}=${v}`)
            .join('&'),
        )
        .fork(
          () => x,
          (queryParameters) =>
            `${Url(x).getPath()}${
              queryParameters ? `?${queryParameters}` : ''
            }`,
        ) as string,
    ),
  hasQuery: () => x.includes('?'),
  toQueryParameters: () =>
    Maybe(Url(x).getQuery())
      .map(
        (x) =>
          (x as string)
            .split('&')
            .reduce((o: Record<string, unknown>, c) => {
              const [k, v] = c.split('=')
              o[k] = v
              return o
            }, {}) as Record<string, string | string[]>,
      )
      .fork(
        () => null,
        (x) => x as Record<string, string | string[]>,
      ),
  isAbsolute: () => x.startsWith('http'),
  getPath: () => x.split('?')[0],
  getQuery: () => x.split('?')[1],
  chain: (f: <T>(a: string) => T) => f(x),
  emit: () => x,
})

// todo: refacto circular dependencies with next-routes
// export const makeUrl =
//   ({ routing, languages, pathSuffix }) =>
//   (routeName, { ...params }, { withQS = true } = {}) => {
//     const route =
//       routing[routeName] || routing[trimStart(routeName, '/')];
//
//     if (route) {
//       params = omit(params, ['defaultLang', 'tld']);
//       const {
//         defaultParams,
//         pattern = routeName,
//         withoutSuffix,
//       } = route;
//
//       const langPattern = `/:lang(${languages.join('|')})?`;
//       const fullPattern = `${langPattern}${pattern}${
//         !withoutSuffix ? pathSuffix : ''
//       }`;
//
//       const keys = [];
//       pathToRegexp.pathToRegexp(fullPattern, keys);
//
//       const pathKeys = Object.keys(keys).map(key => keys[key].name);
//       let qs = omitBy(params, (value, key) => pathKeys.includes(key));
//       qs = withQS === true ? qs : pick(qs, withQS || []);
//       const qsString = toQuerystring(qs);
//
//       if (defaultParams)
//         params = replaceDefaultParams(params, defaultParams).asParams;
//
//       const toPath = pathToRegexp.compile(fullPattern);
//
//       return `${toPath(params, { encode: value => value })}${
//         qsString ? `?${qsString}` : ''
//       }`;
//     }
//
//     return null;
//   };
//
// export const toQuerystring = (obj, { encoded = false } = {}) =>
//   Object.keys(obj)
//     .filter(key => obj[key] !== null && obj[key] !== undefined)
//     .map(key => {
//       let value = obj[key];
//
//       if (Array.isArray(value)) {
//         value = value.join('/');
//       }
//       return [
//         (encoded && encodeURIComponent(key)) || key,
//         (encoded && encodeURIComponent(value)) || value,
//       ]
//         .filter(val => !!val)
//         .join('=');
//     })
//     .join('&');
//
// export const replaceDefaultParams = (params, defaultParams) => {
//   const asParams = { ...params };
//   const hrefParams = { ...params };
//   if (defaultParams) {
//     Object.keys(defaultParams).forEach(param => {
//       const { value, shallow } = defaultParams[param];
//       if (!params[param]) {
//         asParams[param] = value;
//         if (!shallow) hrefParams[param] = value;
//       } else if (value === params[param] && shallow) {
//         delete hrefParams[param];
//       }
//     });
//   }
//
//   return { asParams, hrefParams };
// };
