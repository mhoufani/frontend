import { If, Maybe, Obj } from '../entities'

/** Domain parser result interface */
export interface DomainParseResult {
  sld: string;
  tld: string;
  name: string;
  nameWithTld: string;
  hostname: string;
  isIp: boolean;
}

/** Domain manipulation methods */
export interface DomainMethods {
  map: (f: (a: string) => string) => DomainMethods;
  removeTld: () => DomainMethods;
  removeSLD: () => DomainMethods;
  getSld: () => string;
  getTld: () => string;
  parse: () => DomainParseResult;
  chain: (f: (a: string) => unknown) => unknown;
  emit: () => string;
  isIp: () => boolean;
}

/**
 * Checks if a string is a valid IP address
 */
const isIpAddress = (str: string): boolean => {
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (!ipv4Regex.test(str)) return false;
  const parts = str.split('.').map(Number);
  return parts.every(part => part >= 0 && part <= 255);
};

/**
 * Internal domain parser implementation
 */
const _Domain = (x: string): DomainMethods => ({
  map: (f) => _Domain(f(x)),
  removeTld: () => _Domain(isIpAddress(x) ? x : x.replace(`.${_Domain(x).getTld()}`, '')),
  removeSLD: () => _Domain(isIpAddress(x) ? x : x.replace('www.', '')),
  getSld: () => isIpAddress(x) ? '' : (x.match(/www/g) || [])[0] || '',
  getTld: () => isIpAddress(x) ? '' : (x.split('.').length > 1 ? x.split('.').pop() ?? '' : ''),
  parse: () => {
    if (isIpAddress(x)) {
      return {
        sld: '',
        tld: '',
        name: x,
        nameWithTld: x,
        hostname: x,
        isIp: true
      };
    }
    return {
      sld: _Domain(x).getSld(),
      tld: _Domain(x).getTld(),
      name: _Domain(x).removeTld().removeSLD().emit(),
      nameWithTld: _Domain(x).removeSLD().emit(),
      hostname: x,
      isIp: false
    };
  },
  chain: (f) => f(x),
  emit: () => x,
  isIp: () => isIpAddress(x)
})

/**
 * Creates a domain parser that handles URLs, domain strings, and IP addresses
 * @example
 * ```ts
 * const domain = Domain('https://www.example.com')
 * domain.parse() // { sld: 'www', tld: 'com', name: 'example', ... }
 * 
 * const ip = Domain('192.168.1.1')
 * ip.isIp() // true
 * ip.parse() // { name: '192.168.1.1', isIp: true, ... }
 * ```
 */
export const Domain = (url: string): DomainMethods => {
  const cleanUrl = url.match('^(http|https)://') ? new URL(url).hostname : url;
  return _Domain(cleanUrl);
} 