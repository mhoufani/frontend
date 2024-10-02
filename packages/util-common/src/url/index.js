import * as pathToRegexp from 'path-to-regexp';
import trimStart from 'lodash/trimStart.js';
import omit from 'lodash/omit.js';
import omitBy from 'lodash/omitBy.js';
import pick from 'lodash/pick.js';
import { If, Maybe, Obj } from 'util-common/entity';
import {
  toQuerystring,
  replaceDefaultParams,
} from 'util-common/next-routes';

const _Domain = x => ({
  map: f => _Domain(f(x)),
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
  chain: f => f(x),
  emit: () => x,
});

export const Domain = url => {
  return _Domain(
    url.match('^(http|https)://') ? new URL(url).hostname : url
  );
};

export const addTrailingSlashToPath = path =>
  path && path.endsWith('/') ? path : `${path}/`;

export const removeTrailingSlashFromPath = path =>
  path && path.endsWith('/') ? path.slice(0, -1) : path;

export const addLeadingDotToFileExtension = fileExtension =>
  fileExtension && fileExtension.startsWith('.')
    ? fileExtension
    : `.${fileExtension}`;

export const Url = x => ({
  map: f => Url(f(x)),
  filterQuery: () => Url(x.split('?')[0]),
  filterQueryParameters: filteredParameters =>
    Url(
      If(Url(x).toQueryParameters())
        .map(queryParameters =>
          Obj(queryParameters)
            .removeProperty(filteredParameters)
            .toArray(([k, v]) => `${k}=${v}`)
            .join('&')
        )
        .fork(
          () => x,
          queryParameters =>
            `${Url(x).getPath()}${
              queryParameters ? `?${queryParameters}` : ''
            }`
        )
    ),
  hasQuery: () => x.includes('?'),
  toQueryParameters: () =>
    Maybe(Url(x).getQuery())
      .map(x =>
        x.split('&').reduce((o, c) => {
          const [k, v] = c.split('=');
          o[k] = v;
          return o;
        }, {})
      )
      .fork(
        () => null,
        x => x
      ),
  isAbsolute: () => x.startsWith('http'),
  getPath: () => x.split('?')[0],
  getQuery: () => x.split('?')[1],
  chain: f => f(x),
  emit: () => x,
});

// todo: refacto circular dependencies with next-routes
export const makeUrl =
  ({ routing, languages, pathSuffix }) =>
  (routeName, { ...params }, { withQS = true } = {}) => {
    const route =
      routing[routeName] || routing[trimStart(routeName, '/')];

    if (route) {
      params = omit(params, ['defaultLang', 'tld']);
      const {
        defaultParams,
        pattern = routeName,
        withoutSuffix,
      } = route;

      const langPattern = `/:lang(${languages.join('|')})?`;
      const fullPattern = `${langPattern}${pattern}${
        !withoutSuffix ? pathSuffix : ''
      }`;

      const keys = [];
      pathToRegexp.pathToRegexp(fullPattern, keys);

      const pathKeys = Object.keys(keys).map(key => keys[key].name);
      let qs = omitBy(params, (value, key) => pathKeys.includes(key));
      qs = withQS === true ? qs : pick(qs, withQS || []);
      const qsString = toQuerystring(qs);

      if (defaultParams)
        params = replaceDefaultParams(params, defaultParams).asParams;

      const toPath = pathToRegexp.compile(fullPattern);

      return `${toPath(params, { encode: value => value })}${
        qsString ? `?${qsString}` : ''
      }`;
    }

    return null;
  };
