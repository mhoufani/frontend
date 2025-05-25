import { Maybe } from '../entities';
import { makeUrl } from './makeUrl';

interface CanonicalOptions {
  hostname?: string;
  query?: Record<string, unknown>;
  route: string;
  languages: string[];
  pathSuffix?: string;
  routing: Record<string, unknown>;
  withQS?: boolean;
}

interface HrefLangOptions {
  languages: string[];
  pathSuffix?: string;
  routing: Record<string, unknown>;
}

interface HrefLangParams {
  currentTld: string;
  defaultLang: string;
  hostname: string;
  lang: string;
  protocol?: string;
  query: Record<string, unknown>;
  route: string;
  tld: string;
  withQS?: boolean;
}

interface DomainLangConfig {
  defaultLang: string;
  hrefLangTld?: string;
  hrefLangTldExcl?: string[];
  langs: string[];
}

interface HrefLangObject {
  rel: 'alternate';
  hrefLang: string;
  href: string;
}

interface HrefLangObjectsOptions {
  hostname: string;
  protocol?: string;
  query: Record<string, unknown>;
  route: string;
  domainLang: Record<string, DomainLangConfig>;
  pathSuffix?: string;
  routing: Record<string, unknown>;
  tld: string;
  languages: string[];
  withQS?: boolean;
}

interface UrlInfo {
  protocol: string;
  hostname: string;
  tld: string;
}

interface HrefLangFromCanonicalOptions {
  relativeUrlCanonical: string;
  url: UrlInfo;
  domainLang?: Record<string, DomainLangConfig>;
}


export const makeCanonical = ({
  hostname,
  query = {},
  route,
  languages,
  pathSuffix,
  routing,
  withQS = false,
}: CanonicalOptions): string => {
  const routeName = route.replace(/^\/+/, '');
  const path = makeUrl({ pathSuffix: pathSuffix || '', routing, languages })(
    routeName,
    query,
    { withQS }
  );
  return `${hostname ? `https://${hostname}` : ''}${path}`;
};

export const makeHrefLang =
  ({ languages, pathSuffix, routing }: HrefLangOptions) =>
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
  }: HrefLangParams): string => {
    const host = tld
      ? `${hostname.replace(new RegExp(`\\.${currentTld}$`), '')}.${tld}`
      : hostname;
    const hrefLang = lang === defaultLang ? null : lang;
    const path = makeUrl({ languages, pathSuffix: pathSuffix || '', routing })(
      route,
      { ...query, lang: hrefLang },
      { withQS }
    );

    return `${protocol || 'https'}://${host ? `${host}` : ''}${path}`;
  };

/**
 * This function is used to make hreflang tags for a given canonical url.
 * @param options Configuration options for generating hreflang objects
 * @returns Array of hreflang objects with rel, hrefLang, and href properties
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
}: HrefLangObjectsOptions): HrefLangObject[] => {
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

        return { rel: 'alternate' as const, hrefLang, href };
      });
    })
    .reduce<HrefLangObject[]>((a, b) => [...a, ...b], []);
};

export const makeHrefLangFromCanonicalRel = ({
  relativeUrlCanonical,
  url,
  domainLang = {},
}: HrefLangFromCanonicalOptions): HrefLangObject[] => {
  return Maybe(domainLang[url?.tld])
    .map(({ defaultLang, langs }: DomainLangConfig) =>
      langs.map((lang: string) => {
        const hrefLang = defaultLang === lang ? 'x-default' : lang;
        const href = `${url.protocol}://${url.hostname}${
          lang === defaultLang ? '' : `/${lang}`
        }${relativeUrlCanonical}`;
        return { rel: 'alternate' as const, hrefLang, href };
      })
    )
    .fork(
      () => [],
      (domaineHrefLangs: HrefLangObject[]) => {
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