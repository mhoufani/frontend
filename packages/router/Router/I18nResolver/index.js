import { parse } from 'node:url';

const _I18nResolver = config => ({
  parseUrl(request) {
    const { pathname, ...rest } = parse(request.url, true);

    // case for /fr/en/...
    const [, pathLocale, pathTranslation] = pathname.split('/');

    // console.log('pathLocale', pathLocale, 'pathTranslation', lang);

    const isDefaultLocale = pathLocale === config.defaultLocale;

    const lang =
      (pathTranslation &&
        (config.locales || []).find(l => l === pathTranslation)) ||
      pathLocale;

    // const lang = isDefaultLocale && !lng ? config.defaultLocale : lng;

    return {
      locale: pathLocale || config.defaultLocale,
      lang,
      // pathnameWithoutLocal: pathLocale
      //   ? pathname.replace(`/${pathLocale}`, '')
      //   : pathname,
      // pathname,
      // baseUrl: request.protocol + '://' + request.headers.host + '/',
      // ...rest
    };
  },
});

export const I18nResolver = {
  of: config => {
    // todo: check i18nConfig validity

    return _I18nResolver(config);
  },
};

export default I18nResolver;
