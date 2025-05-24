import { parse } from 'node:url';
import { isArray } from '@repo/util-common/checker';
import { PathResolver, PageResolver } from './index';
import { Maybe, Try } from '@repo/util-common/entities';
import { RequestHandler } from './RequestHandler';
import { I18nResolver } from './I18nResolver';

export interface IRouter{
  _i18n: {
    defaultLocale: string;
    authorizedOnDefaultLocale: string[];
  }
  _pages: PageResolver[];
  pathThru(path: string): boolean;
  use(fn: () => unknown): this;
  getUrlFromParams(n: string, p: object, l: string, t: object): string;
  match(o: Record<string, unknown>): string | null;
  parseUrl(): Record<string, unknown>;
  handle(match: Function, thru: Function): Function
}

export class Router implements IRouter {
   constructor({
    rules = [],
    i18n = {
      defaultLocale: null,
      authorizedOnDefaultLocale: null,
    },
    pathIgnore = [],
  } = {}) {
    // refactor
    if (!i18n.defaultLocale) {
      throw Error('i18n.defaultLocale is required');
    }
    if (!rules) {
      throw Error('rules is required');
    }
    if (pathIgnore && !isArray(pathIgnore)) {
      throw Error('pathIgnore need to be an array of strings');
    }
    // todo: check if one more pages match with the same path before start

    this._i18n = i18n;
    this._pages = rules?.map(
      pageRules =>
        new PageResolver(pageRules, i18n.authorizedOnDefaultLocale)
    );
    this._pathIgnore = pathIgnore;
    this._requestHandler = new RequestHandler();
  }

  pathThru(pathname: string) {
    return Maybe(!!this._pathIgnore.length)
      .map(() =>
        this._pathIgnore.find((path: string) => pathname.startsWith(path))
      )
      .fork(
        () => false,
        (path?: string) => !!path
      );
  }

  // doc: add callback function for handle request
  use(fnHandler) {
    this._requestHandler.add(fnHandler);
    return this;
  }

  getUrlFromParams(name: string, params: object, locale: string, translate: object) {
    //todo: translate only on default lang if option is passed
    return Maybe(this._pages.find(x => x.hasName(name)))
      .map(page =>
        page.getPath(params, locale || this._i18n.defaultLocale)
      )
      .map(path => {
        const prefixLocale = !locale ? '' : locale + '/';
        return prefixLocale + path;
      })
      .fork(
        () => {
          console.warn(
            'Can not create url from params',
            JSON.stringify(
              { name, params, locale, translate },
              null,
              2
            )
          );
          return '';
        },
        x => x
      );
  }

  match({ locale, pathnameWithoutLocal, query }, next = 0) {
    return (
      this._pages[next].resolve(
        locale,
        pathnameWithoutLocal,
        query
      ) ||
      (this._pages[next + 1] &&
        this.match(
          { locale, pathnameWithoutLocal, query },
          next + 1
        )) ||
      null
    );
  }

  parseUrl(request) {
    I18nResolver.of(this._i18n).parseUrl(request);
    const { pathname, ...args } = parse(request.url, true);
    const [, pathLocale] = pathname.split('/');
    const locale = (this._i18n.locales || []).find(
      l => l === pathLocale
    );
    return {
      locale: locale || this._i18n.defaultLocale,
      pathnameWithoutLocal: locale
        ? pathname.replace(`/${locale}`, '')
        : pathname,
      pathname,
      baseUrl: request.protocol + '://' + request.headers.host + '/',
      ...args,
    };
  }

  handle(matchHandler, nextHandler) {
    return (req, res) => {
      Try(() => {
        this._requestHandler.handle(req, res).chain(() => {
          /**
           * todo: Pass base url to match handler
           */
          const parsedUrl = this.parseUrl(req);
          return Maybe(this.pathThru(parsedUrl.pathname))
            .map(() => this.match(parsedUrl))
            .fork(
              () => nextHandler(req, res, parsedUrl),
              params =>
                matchHandler(req, res, parsedUrl, {
                  ...params,
                  i18n: {
                    locale: parsedUrl.locale,
                    locales: this._i18n.locales,
                    defaultLocale: this._i18n.defaultLocale,
                  },
                })
            );
        });
      }).fork(
        err => {
          console.error('Error occurred handling', req.url, err);
          res.statusCode = 500;
          res.end('internal server error');
        },
        () => {}
      );
    };
  }
}

export default Router;
