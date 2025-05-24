// import * as pathToRegexp from 'path-to-regexp';
// import trimStart from 'lodash/trimStart.js';
// import omit from 'lodash/omit.js';
// import omitBy from 'lodash/omitBy.js';
// import pick from 'lodash/pick.js';
import { If, Maybe, Obj } from '../entities'

export * from './domain';
export * from './url';
export * from './utils';

/**
 * Adds a trailing slash to a path if it doesn't have one
 */
export const addTrailingSlashToPath = (path: string): string =>
  path && path.endsWith('/') ? path : `${path}/`

/**
 * Removes a trailing slash from a path if it has one
 */
export const removeTrailingSlashFromPath = (path: string): string =>
  path && path.endsWith('/') ? path.slice(0, -1) : path


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
