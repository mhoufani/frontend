import { toQuerystring } from 'utils/url';
import { Maybe } from 'utils/entity';
import PathResolver from '../PathResolver/index.js';

export class PageResolver {
  constructor(
    { name, page, match: rules },
    authorizedPathOnDefaultLocale = []
  ) {
    if (!name || !page || !rules) {
      throw new Error(
        // todo change message
        'Missing params config for this page "'.concat(name, ' ')
      );
    }

    this._name = name;
    this._page = page;
    this._localMatchIi18n = authorizedPathOnDefaultLocale;
    this._localRules = Object.entries(rules).reduce(
      (rules, [locale, { pathRules, resolvers }]) => {
        rules[locale] = pathRules.map(PathResolver.of);
        resolvers && this.addLocalResolver(locale, resolvers);
        return rules;
      },
      {}
    );
    this._resolvers = {};
  }

  set(key, fnOrValue) {
    this[`_${key}`] =
      fnOrValue instanceof Function ? fnOrValue(this) : fnOrValue;
    return this;
  }

  hasName(name) {
    return this._name === name;
  }

  addLocalResolver(locale, config) {
    this._resolvers[locale] = {
      toValue: (p, v) =>
        Maybe(config[p])
          .map(vMap =>
            Object.entries(vMap).find(([, value]) => value === v)
          )
          .fork(
            () => v,
            ([t]) => t
          ),
      toParam: (p, v) =>
        Maybe(config[p])
          .map(vMap =>
            Object.entries(vMap).find(([, value]) => value === v)
          )
          .fork(
            () => v,
            ([t]) => t
          ),
    };
  }

  localPathResolver(path, locale) {
    // todo: maybe check if locale exists in rules
    // optimize route matching
    const matchOnDefaultLocal =
      this._localMatchIi18n.includes(locale);
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

  resolve(locale, path, queryParams) {
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

  mapRule(rule, params) {
    const paramsKeys = Object.keys(params);
    return paramsKeys.reduce(
      (res, name) => {
        Maybe(!rule.hasParam(name)).fork(
          () => (res[1][name] = params[name]),
          () => (res[0][name] = params[name])
        );
        return res;
      },
      [{}, {}]
    );
  }

  getUrlParams(params = {}, locale) {
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

  transformParamsToUrl(params = {}, locale) {
    // todo: dynamic locale
    console.log('locale: ', locale);

    const paramsI18n = Object.entries(params).reduce(
      (acc, [key, value]) => {
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

  getPath(params, locale = 'fr') {
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

export default PageResolver;
