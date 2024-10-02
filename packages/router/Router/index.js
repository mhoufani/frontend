import { parse } from 'node:url';
import { isArray } from 'utils/checkers';
import { Maybe, Try } from 'utils/entity';
import { PageResolver } from './PageResolver';
import { RequestHandler } from './RequestHandler';
import { I18nResolver } from './i18nResolver';

export class Router {
  constructor({
    rules = [],
    i18n = {
      authorizedOnDefaultLocale: null,
    },
    pathIgnore = [],
  } = {}) {
    // refactor
    if (!i18n.defaultLocale) {
      throw new Error('i18n.defaultLocale is required');
    }
    if (!rules) {
      throw new Error('rules is required');
    }
    if (pathIgnore && !isArray(pathIgnore)) {
      throw new Error('pathIgnore need to be an array of strings');
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

  pathThru(pathname) {
    return Maybe(!!this._pathIgnore.length)
      .map(() =>
        this._pathIgnore.find(path => pathname.startsWith(path))
      )
      .fork(
        () => false,
        path => !!path
      );
  }

  // doc: add callback function for handle request
  use(fnHandler) {
    this._requestHandler.add(fnHandler);
    return this;
  }

  getUrlFromParams(name, params, locale, translate) {
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
