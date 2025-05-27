import { toQuerystring } from '@mp/util-common/url';
import { Maybe } from '@mp/util-common/entities';
import { PathResolver } from '../PathResolver';
import type { PathResolver as PathResolverType } from '../PathResolver';

/**
 * PageResolver class handles page routing configuration and resolution
 * 
 * @remarks
 * This class is responsible for resolving URLs to pages and generating URLs from parameters
 * based on configured routing rules for different locales.
 * 
 * @example
 * ```ts
 * const pageRoute = new PageResolver({
 *   name: 'product',
 *   page: 'product', 
 *   match: {
 *     fr: {
 *       pathRules: [{
 *         pattern: ['/product/:productId'],
 *         suffix: ['.html']
 *       }]
 *     }
 *   }
 * });
 * ```
 * 
 * @public
 */

export interface PageResolverMethods {
  set: (key: string, fnOrValue: string | ((x: this) => string)) => this;
  addLocalResolver: (local: string, config: Record<string, unknown>) => void;
  localPathResolver: (a: string, b: string) => unknown;
  resolve: (path: string, locale: string, queryParams?: Record<string, string | string[]>) => { name: string; page: string; params: object; queryParams: object } |null;
  mapRule: (rule: PathResolver, params: Record<string, string>) => [Record<string, string>, Record<string, string>];
  getUrlParams: (params: object, locale: string) => object | null;
  transformParamsToUrl: (params: object, locale: string) => object | null;
  getPath: (locale: string, params: object) => string | null;
}

export interface PageResolverInternals {
  _name: string;
  _page: string;
  _resolvers: Record<string, any>;
  _localRules: Record<string, any[]>;
}

export interface PageResolverContructor {
  name: string;
  page: string;
  match: unknown
}


export type PageResolverClass = PageResolverInternals & PageResolverMethods;

/**
 * Interface defining methods for the PageResolver class
 * @public
 */

/**
 * Interface for internal properties of PageResolver
 * @public
 */

/**
 * Constructor parameters for PageResolver
 * @public
 */

/**
 * Combined type for PageResolver class including both methods and internals
 * @public
 */

export class PageResolver implements PageResolverClass {
  [key: `_${string}`]: any;
  _name: string;
  _page: string;
  _resolvers: Record<string, any>;
  _localRules: Record<string, any[]>;

  constructor(
    { name, page, match: rules }: PageResolverContructor
  ) {
    if (!name || !page || !rules) {
      throw new Error(
        // todo change message
        'Missing params config for this page "'.concat(name, ' ')
      );
    }

    this._name = name;
    this._page = page;
    this._localRules = Object.entries(rules).reduce(
      (rules: Record<string, any[]>, [locale, { pathRules, resolvers }]) => {
        rules[locale] = pathRules.map(PathResolver);
        resolvers && this.addLocalResolver(locale, resolvers);
        return rules;
      },
      {}
    );
    this._resolvers = {};
  }

  set(key: string, fnOrValue: string | ((x: this) => string)) {
    this[`_${key}`] =
      fnOrValue instanceof Function ? fnOrValue(this) : fnOrValue;
    return this;
  }

  hasName(name: string) {
    return this._name === name;
  }

  addLocalResolver(locale: string, config: Record<string, unknown>) {
    this._resolvers[locale] = {
      toValue: (parameter: string, v: string) =>
        Maybe(config[parameter])
          .map(vMap =>
            Object.entries(vMap as Record<string, string>).find(([, value]) => value === v)
          )
          .fork(
            () => v,
            result => result ? result[0] : v
          ),
      toParam: (parameter: string, value: string) =>
        Maybe(config[parameter])
          .map(vMap =>
            Object.entries(vMap as Record<string, string>).find(([, value]) => value === value)
          )
          .fork(
            () => value,
            result => result ? result[0] : value
          ),
    };
  }

  localPathResolver(path: string, locale: string) {
    // todo: maybe check if locale exists in rules
    // optimize route matching

    return Maybe(this._localRules[locale])
      .map(rules =>
        rules.reduce(
          (match, pathRule) =>
            Maybe(path)
              .map(x => pathRule.toParams(x))
              .fork(
                () => match,
                x => x
              ),
          null
        )
      )
      .fork(
        () => null,
        params => params
      );
  }
  /**
   * Resolves a URL path to a page route with parameters
   * @param locale - The locale to resolve the path for (e.g. 'en', 'fr')
   * @param path - The URL path to resolve
   * @param queryParams - Optional query parameters to include in the resolved route
   * @returns The resolved page route object containing name, page, params and queryParams, or null if no match
   */

  resolve(locale: string, path: string, queryParams: Record<string, string | string[]> = {}) {
    const params = this.localPathResolver(path, locale);
    if (!params) return null;
    const paramsKeys = Object.keys(params);
    return paramsKeys.reduce(
      (result, key) => {
        result.params[key] = this._resolvers[locale]
          ? this._resolvers[locale].toValue(key, params[key])
          : params[key];
        return result;
      },
      {
        name: this._name,
        page: this._page,
        params,
        queryParams, // todo check if query is not in params
      }
    );
  }

  /**
   * Maps a rule to a set of parameters
   * @param rule - The rule to map
   * @param params - The parameters to map
   * @returns The mapped parameters
   */
  mapRule(rule: PathResolver, params: Record<string, string>) {
    const paramsKeys = Object.keys(params);
    return paramsKeys.reduce(
      (res: [Record<string, string>, Record<string, string>], name) => {
        Maybe(!rule.hasParam(name)).fork(
          () => (res[1][name] = params[name]),
          () => (res[0][name] = params[name])
        );
        return res;
      },
      [{}, {}]
    );
  }

  /**
   * Generates URL parameters from a set of parameters
   * @param params - The parameters to generate URL parameters from
   * @param locale - The locale to generate URL parameters for (e.g. 'en', 'fr')
   * @returns The generated URL parameters, or null if no match
   */
  getUrlParams(params = {}, locale: string) {
    // todo: dynamic locale
    return this._localRules[locale].reduce((res, rule) => {
      const [pathParams, queryParams] = this.mapRule(rule, params);
      // need to check if other route match warning
      if (Object.keys(pathParams).length === rule._keys.length)
        try {
          const path = rule.toPath(pathParams);
          return { path, queryParams };
        } catch (e) {
          console.warn(
            'page route params not valide:',
            JSON.stringify(pathParams, undefined, 2)
          );
        }
      return res;
    }, null);
  }

  /**
   * Transforms parameters to a URL format
   * @param params - The parameters to transform
   * @param locale - The locale to transform parameters for (e.g. 'en', 'fr')
   * @returns The transformed parameters, or null if no match
   */
  transformParamsToUrl(params = {}, locale: string) {
    // todo: dynamic locale
    console.log('locale: ', locale);

    const paramsI18n = Object.entries(params).reduce(
      (acc: Record<string, string>, [key, value]) => {
        acc[key] = this._resolvers[locale]
          ? this._resolvers[locale].toParam(key, value)
          : value;
        return acc;
      },
      {}
    );

    if (locale === 'en') console.log('paramsI18n', paramsI18n);

    return this._localRules[locale].reduce((url, rule) => {
      const [pathParams, queryParams] = this.mapRule(
        rule,
        paramsI18n
      );

      // need to check if other route match warning
      if (rule.hasSameKeys(Object.keys(pathParams)))
        try {
          const path = rule.toPath(pathParams);
          return { locale, path, queryParams };
        } catch (e) {
          console.warn(
            'page route params not valide:',
            JSON.stringify(pathParams, undefined, 2)
          );
        }
      return url;
    }, null);
  }

  /**
   * Generates a URL path from parameters
   * @param params - The parameters to generate a URL path from
   * @param locale - The locale to generate a URL path for (e.g. 'en', 'fr')
   * @returns The generated URL path, or null if no match
   */
  getPath(locale: string, params = {}) {
    return Maybe(this.transformParamsToUrl(params, locale)).fork(
      () => {
        console.log(
          'page: ' + this._page + ' href not found for this params',
          params
        );
        return null;
      },
      ({ path, queryParams }) => {
        return ''
          .concat(path, '?')
          .concat(toQuerystring(queryParams))
          .replace(/\?$/, '');
      }
    );
  }
}

