// Fichier temporaire
// todo: Legacy replace this file by the future package router architecture
import { parse } from '../url/index.ts';
import React from 'react';
import * as pathToRegexp from 'path-to-regexp';
import NextLink from 'next/link';
import NextRouter from 'next/router';
import { isUndefined } from 'util-common/conditional';

class Routes {
  constructor({ Link = NextLink, Router = NextRouter } = {}) {
    this.routes = [];
    this.Link = this.getLink(Link);
    this.Router = this.getRouter(Router);
  }

  add(name, pattern, page) {
    let options;
    if (name instanceof Object) {
      options = name;
      name = options.name;
    } else {
      if (name[0] === '/') {
        page = pattern;
        pattern = name;
        name = null;
      }
      options = { name, pattern, page };
    }

    if (this.findByName(name)) {
      throw new Error(`Route "${name}" already exists`);
    }

    this.routes.push(new Route(options));
    return this;
  }

  findByName(name) {
    if (name) {
      return this.routes.filter(route => route.name === name)[0];
    }
  }

  match(url) {
    const parsedUrl = parse(url, true);
    const { pathname, query } = parsedUrl;

    // todo: not perf because we loop all routes better to match first
    return this.routes.reduce(
      (result, route) => {
        if (result.route) return result;
        const params = route.match(pathname);
        if (!params) return result;
        return {
          ...result,
          route,
          params,
          query: { ...query, ...params },
        };
      },
      { query, parsedUrl }
    );
  }

  findAndGetUrls(nameOrUrl, params) {
    const route = this.findByName(nameOrUrl);

    if (route) {
      return { route, urls: route.getUrls(params), byName: true };
    } else {
      const { route, query } = this.match(nameOrUrl);
      const href = route ? route.getHref(query) : nameOrUrl;
      const urls = { href, as: nameOrUrl };
      return { route, urls };
    }
  }

  getRequestHandler(app, customHandler) {
    const nextHandler = app.getRequestHandler();

    return (req, res) => {
      const { route, query, parsedUrl } = this.match(req.url);

      if (route) {
        if (customHandler) {
          customHandler({ req, res, route, query });
        } else {
          app.render(req, res, route.page, query);
        }
      } else {
        nextHandler(req, res, parsedUrl);
      }
    };
  }

  getLink(Link) {
    const LinkRoutes = ({
      lang: { lang },
      params = {},
      ...props
    }) => {
      const { route, to, ...newProps } = props;
      const nameOrUrl = route || to;

      if (isUndefined(params.lang) && lang)
        params = { ...params, lang };
      if (params.lang === false) delete params.lang;

      if (nameOrUrl) {
        Object.assign(
          newProps,
          this.findAndGetUrls(nameOrUrl, params).urls
        );
      }

      return React.createElement(Link, newProps);
    };
    return LinkRoutes;
  }

  getRouter(Router) {
    const wrap = method => (route, params, options) => {
      const {
        byName,
        urls: { as, href },
      } = this.findAndGetUrls(route, params);
      const { hash } = options || {};
      const asWithHash = hash ? `${as}#${hash}` : as;

      return Router[method](
        href,
        asWithHash,
        byName ? options : params
      );
    };

    Router.pushRoute = wrap('push');
    Router.replaceRoute = wrap('replace');
    Router.prefetchRoute = wrap('prefetch');
    return Router;
  }
}

const nextRoutes = opts => new Routes(opts);

export default nextRoutes;

class Route {
  constructor({ defaultParams, name, pattern, page = name }) {
    if (!name && !page) {
      throw new Error(
        `Missing page to render for route "${pattern}"`
      );
    }

    this.name = name;
    this.pattern = pattern || `/${name}`;
    this.page = page.replace(/(^|\/)index$/, '').replace(/^\/?/, '/');
    this.regex = pathToRegexp.pathToRegexp(
      this.pattern,
      (this.keys = [])
    );
    this.keyNames = this.keys.map(key => key.name);
    this.toPath = pathToRegexp.compile(this.pattern);
    this.defaultParams = defaultParams;
  }

  match(path) {
    const values = this.regex.exec(path);
    if (values) {
      return this.valuesToParams(values.slice(1));
    }
  }

  valuesToParams(values) {
    return values.reduce((params, val, i) => {
      const defaultParam =
        this.defaultParams && this.defaultParams[this.keys[i].name];
      const isDefaultParamShallow =
        defaultParam &&
        defaultParam.shallow &&
        val === defaultParam.value;

      if (val === undefined || isDefaultParamShallow) return params;
      return Object.assign(params, {
        [this.keys[i].name]: decodeURIComponent(val),
      });
    }, {});
  }

  getHref(params = {}) {
    const qs = toQuerystring(params);
    return `${this.page}${qs ? `?${qs}` : ''}`;
  }

  getAs(params = {}) {
    const as = this.toPath(params, { encode: value => value }) || '/';
    const keys = Object.keys(params);
    const qsKeys = keys.filter(
      key => this.keyNames.indexOf(key) === -1
    );

    if (!qsKeys.length) return as;

    const qsParams = qsKeys.reduce(
      (qs, key) =>
        Object.assign(qs, {
          [key]: params[key],
        }),
      {}
    );

    const qs = toQuerystring(qsParams);
    return `${as}${qs ? `?${qs}` : ''}`;
  }

  getUrls(params) {
    const { asParams, hrefParams } = replaceDefaultParams(
      params,
      this.defaultParams
    );
    const as = this.getAs(asParams);
    const href = this.getHref(hrefParams);

    return { as, href };
  }
}

export const toQuerystring = (obj, { encoded = false } = {}) =>
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

export const replaceDefaultParams = (params, defaultParams) => {
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
