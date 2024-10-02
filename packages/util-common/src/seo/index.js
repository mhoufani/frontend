import trimEnd from 'lodash/trimEnd.js';
import trimStart from 'lodash/trimStart.js';
import { makeUrl } from 'util-common/url';
import { Maybe } from 'util-common/entity';

// todo: refactor
export const makeCanonical = ({
  hostname,
  query = {},
  route,
  languages,
  pathSuffix,
  routing,
  withQS = false,
}) => {
  const routeName = trimStart(route, '/');
  const path = makeUrl({ pathSuffix, routing, languages })(
    routeName,
    query,
    { withQS }
  );
  return `${hostname ? `https://${hostname}` : ''}${path}`;
};

export const makeHrefLang =
  ({ languages, pathSuffix, routing }) =>
  ({
    currentTld,
    defaultLang,
    hostname,
    lang,
    protocol,
    query,
    route,
    tld,
    withQS = true,
  }) => {
    const host = tld
      ? `${trimEnd(hostname, `.${currentTld}`)}.${tld}`
      : hostname;
    const hrefLang = lang === defaultLang ? null : lang;
    const path = makeUrl({ languages, pathSuffix, routing })(
      route,
      { ...query, lang: hrefLang },
      { withQS }
    );

    return `${protocol || 'https'}://${host ? `${host}` : ''}${path}`;
  };

/**
 * This function is used to make hreflang tags for a given canonical url.
 * @param relativeUrlCanonical from seo service
 * @param url from hoc withUrl
 * @returns {*}
 */

export const makeHrefLangObjects = ({
  hostname,
  protocol,
  query,
  route,
  domainLang,
  pathSuffix,
  routing,
  tld: currentTld,
  languages,
  withQS = true,
}) => {
  return Object.keys(domainLang)
    .filter(tld => tld === 'com')
    .map(tld => {
      const {
        defaultLang,
        hrefLangTld,
        hrefLangTldExcl = [],
        langs,
      } = domainLang[tld];

      return langs.map(lang => {
        const hrefLangCountry = hrefLangTld
          ? `-${hrefLangTld.toUpperCase()}`
          : '';
        const hrefLang =
          tld === currentTld && defaultLang === lang
            ? 'x-default'
            : !hrefLangTldExcl.includes(lang)
              ? `${lang}${hrefLangCountry}`
              : lang;

        const href = makeHrefLang({
          languages,
          pathSuffix,
          routing,
        })({
          currentTld,
          defaultLang,
          hostname,
          lang,
          protocol,
          query,
          route,
          tld,
          withQS,
        });

        return { rel: 'alternate', hrefLang, href };
      });
    })
    .reduce((a, b) => [...a, ...b]);
};

// todo: move on util-common package
export const makeHrefLangFromCanonicalRel = ({
  relativeUrlCanonical,
  url,
  domainLang = {},
}) => {
  return Maybe(domainLang[url?.tld])
    .map(({ defaultLang, langs }) =>
      langs.map(lang => {
        const hrefLang = defaultLang === lang ? 'x-default' : lang;
        const href = `${url.protocol}://${url.hostname}${
          lang === defaultLang ? '' : `/${lang}`
        }${relativeUrlCanonical}`;
        return { rel: 'alternate', hrefLang, href };
      })
    )
    .fork(
      () => [],
      domaineHrefLangs => {
        const xDefault = domaineHrefLangs.find(
          ({ hrefLang }) => hrefLang === 'x-default'
        );
        if (xDefault) {
          domaineHrefLangs.push({ ...xDefault, hrefLang: 'fr' });
        }
        return domaineHrefLangs;
      }
    );
};
