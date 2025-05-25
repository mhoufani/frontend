import pathToRegexp from "path-to-regexp"
import { Obj } from "../entities/Obj"
/**
 * Options for configuring URL generation
 * @interface MakeUrlOptions
 * @property {Record<string, any>} routing - Route configuration object mapping route names to their definitions
 * @property {string[]} languages - Array of supported language codes
 * @property {string} pathSuffix - Suffix to append to generated URLs (e.g. '.html')
 */
export interface MakeUrlOptions {
  routing: Record<string, any>;
  languages: string[];
  pathSuffix: string;
}

/**
 * Converts an object to a URL query string
 * @param {Record<string, any>} obj - Object to convert to query string
 * @param {Object} [options] - Options for query string generation
 * @param {boolean} [options.encoded=false] - Whether values should be URI encoded
 * @returns {string} Query string without leading '?' character
 * @example
 * toQuerystring({ foo: 'bar', num: 123 }) // 'foo=bar&num=123'
 * toQuerystring({ name: 'John Doe' }, { encoded: true }) // 'name=John%20Doe'
 */
export const makeUrl =
  ({ routing, languages, pathSuffix }: MakeUrlOptions) =>
  (routeName: string, { ...params }: Record<string, any>, { withQS = true } = {}) => {
    const route =
      routing[routeName] || routing[(routeName || '').replace(/^\/+/, '')];

    if (route) {
      params = Object.fromEntries(
        Object.entries(params).filter(([key]) => !['defaultLang', 'tld'].includes(key))
      );
      const {
        defaultParams,
        pattern = routeName,
        withoutSuffix,
      } = route;

      const langPattern = `/:lang(${languages.join('|')})?`;
      const fullPattern = `${langPattern}${pattern}${
        !withoutSuffix ? pathSuffix : ''
      }`;

      const keys: any[] = [];
      pathToRegexp.pathToRegexp(fullPattern, keys);

      const pathKeys = Object.keys(keys).map((key) => keys[parseInt(key)].name);
      let qs = Object.fromEntries(Object.entries(params).filter(([key]) => !pathKeys.includes(key)));

      qs = withQS === true ? qs : Obj(qs).pick(withQS || []).emit();
      const qsString = toQuerystring(qs);

      if (defaultParams)
        params = replaceDefaultParams(params, defaultParams).asParams;

      const toPath = pathToRegexp.compile(fullPattern);

      return `${toPath(params)}${
        qsString ? `?${qsString}` : ''
      }`;
    }
    return null;
  };

  
export const toQuerystring = (obj: Record<string, any>, { encoded = false } = {}) =>
  Object.keys(obj)
    .filter(key => obj[key] !== null && obj[key] !== undefined)
    .map(key => {
      let value = obj[key];

      if (Array.isArray(value)) {
        value = value.join('/');
      }
      return [
        (encoded && encodeURIComponent(key)) || key,
        (encoded && encodeURIComponent(value)) || value,
      ]
        .filter(val => !!val)
        .join('=');
    })
    .join('&');


export const replaceDefaultParams = (params: Record<string, any>, defaultParams: Record<string, any>) => {
  const asParams = { ...params };
  const hrefParams = { ...params };
  if (defaultParams) {
    Object.keys(defaultParams).forEach(param => {
      const { value, shallow } = defaultParams[param];
      if (!params[param]) {
        asParams[param] = value;
        if (!shallow) hrefParams[param] = value;
      } else if (value === params[param] && shallow) {
        delete hrefParams[param];
      }
    });
  }

  return { asParams, hrefParams };

};