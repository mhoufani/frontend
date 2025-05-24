import { If, Maybe, Obj } from '../entities'

/** URL manipulation methods */
export interface UrlMethods {
  map: (f: (a: string) => string) => UrlMethods;
  removeQuery: () => UrlMethods;
  removeQueryParameters: (parametersToRemove: string | string[]) => UrlMethods;
  hasQuery: () => boolean;
  parseQueryParameters: () => Record<string, string | string[]> | null;
  isAbsolute: () => boolean;
  getPath: () => string;
  getQuery: () => string | undefined;
  chain: <T>(f: (a: string) => T) => T;
  emit: () => string;
}

/**
 * Creates a URL parser and manipulator
 * @example
 * ```ts
 * const url = Url('https://example.com/path?query=value')
 * url.getPath() // '/path'
 * url.getQuery() // 'query=value'
 * url.removeQuery().emit() // 'https://example.com/path'
 * ```
 */
export const Url = (x: string): UrlMethods => ({
  map: (f) => Url(f(x)),
  removeQuery: () => Url(x.split('?')[0]),
  removeQueryParameters: (parametersToRemove) =>
    Url(
      If(Url(x).parseQueryParameters())
        .map((queryParameters) =>
          Obj(queryParameters as Record<string, string | string[]>)
            .removeProperty(parametersToRemove)
            .toArray(([k, v]) => `${k}=${v}`)
            .join('&'),
        )
        .fork(
          () => x,
          (queryParameters) =>
            `${Url(x).getPath()}${
              queryParameters ? `?${queryParameters}` : ''
            }`,
        ) as string,
    ),
  hasQuery: () => x.includes('?'),
  parseQueryParameters: () =>
    Maybe(Url(x).getQuery())
      .map(
        (x) =>
          (x as string)
            .split('&')
            .reduce((o: Record<string, unknown>, c) => {
              const [k, v] = c.split('=')
              o[k] = v
              return o
            }, {}) as Record<string, string | string[]>,
      )
      .fork(
        () => null,
        (x) => x as Record<string, string | string[]>,
      ),
  /**
   * Checks if the URL is absolute according to RFC 3986.
   * An absolute URL must:
   * 1. Start with a valid protocol (scheme) followed by "://"
   * 2. The protocol must contain only letters, numbers, "+", "-", or "."
   * Common protocols: http, https, ftp, sftp, file, ws, wss, etc.
   * @returns {boolean} True if the URL is absolute, false otherwise
   * @example
   * ```ts
   * Url('https://example.com').isAbsolute() // true
   * Url('http://example.com').isAbsolute() // true
   * Url('ftp://files.example.com').isAbsolute() // true
   * Url('//example.com').isAbsolute() // false
   * Url('/path').isAbsolute() // false
   * ```
   */
  isAbsolute: () => /^[a-zA-Z][\w+.-]*:\/\//.test(x),
  getPath: () => x.split('?')[0],
  getQuery: () => x.split('?')[1],
  chain: (f) => f(x),
  emit: () => x,
})