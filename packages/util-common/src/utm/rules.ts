import {
  type SearchEngineDomains,
  searchEngineDomains,
  domainCorresponding,
  queryParamsUtm,
  socialNetworks,
  UTM_MEDIUM_ENUM,
  UTM_ENUM,
} from './config';

import { Domain } from '../url';

/**
 * UTM tracking data structure
 * @interface UtmData
 */
export interface UtmData {
  /** Source of the traffic */
  source?: string;
  /** Marketing medium */
  medium?: string;
  /** Campaign name */
  campaign?: string;
  /** Campaign content */
  content?: string;
  /** Search term */
  term?: string;
  /** Processed UTM parameters */
  utms?: Record<string, string>;
  /** Legacy mobile flag */
  mobile?: boolean;
  /** Mobile device flag */
  isMobile?: boolean;
  /** Dynamic UTM parameters */
  [UTM_ENUM.MARKETING_MEDIUM]?: string;
  [UTM_ENUM.LEAD_SOURCE]?: string;
  [UTM_ENUM.AD_CAMPAIGN]?: string;
  [UTM_ENUM.CAMPAIGN_SUBJECT]?: string;
  [UTM_ENUM.BROWSING_TERM]?: string;
}

/**
 * Visit tracking data structure
 * @interface VisitData
 */
export interface VisitData {
  /** Legacy date/time */
  dateTime?: string;
  /** Visit timestamp */
  visitedAt?: string;
  /** Legacy mobile flag */
  mobile?: boolean;
  /** Mobile device flag */
  isMobile?: boolean;
  /** UTM tracking data */
  utms: UtmData;
}

/**
 * Function type for mapping UTM parameters
 * @callback UtmMapper
 * @param {UtmData} utm - UTM data to map
 * @returns {string | undefined} Mapped UTM value
 */
type UtmMapper = (utm: UtmData) => string | undefined;

/**
 * UTM mapping configuration
 * @interface UtmMappingType
 */
interface UtmMappingType {
  [key: string]: UtmMapper;
}

/**
 * Maps UTM parameters to their standardized format
 * @type {Record<string, (utm: UtmData) => string | undefined>}
 */
export const utmMapping: UtmMappingType = {
  [UTM_ENUM.MARKETING_MEDIUM]: (utm: UtmData): string | undefined =>
    utm.medium || utm[UTM_ENUM.MARKETING_MEDIUM] as string,
  [UTM_ENUM.LEAD_SOURCE]: (utm: UtmData): string | undefined =>
    utm.source || utm[UTM_ENUM.LEAD_SOURCE] as string,
  [UTM_ENUM.AD_CAMPAIGN]: (utm: UtmData): string | undefined =>
    utm.campaign || utm[UTM_ENUM.AD_CAMPAIGN] as string,
  [UTM_ENUM.CAMPAIGN_SUBJECT]: (utm: UtmData): string | undefined =>
    utm.content || utm[UTM_ENUM.CAMPAIGN_SUBJECT] as string,
  [UTM_ENUM.BROWSING_TERM]: (utm: UtmData): string | undefined =>
    utm.term || utm[UTM_ENUM.BROWSING_TERM] as string,
};

/**
 * Removes 'utm_' prefix from UTM parameter names
 * @param {string} validUtm - UTM parameter name with 'utm_' prefix
 * @returns {string} UTM parameter name without prefix
 */
export const formatUtmKey = (validUtm: string): string => validUtm.replace('utm_', '');

/**
 * Compares UTM parameters between two UTM objects
 * @param {UtmData} utm - First UTM object
 * @param {UtmData} utmToCompare - Second UTM object to compare
 * @returns {boolean} True if UTM parameters match
 */
export const isSameUTMs = (utm: UtmData = {}, utmToCompare: UtmData = {}): boolean =>
  utm.utms !== undefined &&
  utmToCompare.utms !== undefined &&
  Object.entries(utm.utms).toString() ===
    Object.entries(utmToCompare.utms).toString();

/**
 * Compares device information between two UTM objects
 * @param {UtmData} utm - First UTM object
 * @param {UtmData} utmToCompare - Second UTM object to compare
 * @returns {boolean} True if device information matches
 */
export const isSameDevice = (utm: UtmData = {}, utmToCompare: UtmData = {}): boolean =>
  utm !== undefined && 
  utmToCompare !== undefined && 
  utm.mobile === utmToCompare.mobile;

/**
 * Maps UTM data to a standardized format
 * @param {UtmData} utm - UTM data to map
 * @returns {Record<string, string>} Mapped UTM parameters
 */
const utmMapper = (utm: UtmData): Record<string, string> =>
  Object.entries(utmMapping).reduce((utmMapped: Record<string, string>, [keyMap, mapper]) => {
    const value = mapper(utm);
    if (value) utmMapped[keyMap] = value;
    return utmMapped;
  }, {});

/**
 * Checks if a query parameter is a UTM parameter
 * @param {string} queryParam - Query parameter to check
 * @returns {boolean} True if parameter is a UTM parameter
 */
export const isUtmQueryParam = (queryParam: string): boolean =>
  queryParamsUtm.includes(queryParam);

/**
 * Checks if a domain is a search engine
 * @param {string} domainName - Domain name without TLD
 * @param {string} domainWithTld - Full domain with TLD
 * @returns {boolean} True if domain is a search engine
 */
export const isSearchEngine = (domainName: string, domainWithTld: string): boolean =>
  domainName === 'google' || searchEngineDomains.includes(domainWithTld as typeof searchEngineDomains[number]);

/**
 * Checks if a domain is a social network
 * @param {string} domainName - Domain name without TLD
 * @param {string} domainWithTld - Full domain with TLD
 * @returns {boolean} True if domain is a social network
 */
export const isSocialNetwork = (domainName: string, domainWithTld: string): boolean =>
  domainName === 'pinterest' ||
  socialNetworks.includes(domainWithTld as typeof socialNetworks[number]);

/**
 * Compares two UTM objects for equality
 * @param {VisitData | null} utm - First UTM object
 * @param {VisitData | null} utmToCompare - Second UTM object to compare
 * @returns {boolean} True if UTM objects are equal
 */
export const isSameUtm = (utm: VisitData | null, utmToCompare: VisitData | null): boolean =>
  isSameDevice(utm?.utms, utmToCompare?.utms) && isSameUTMs(utm?.utms, utmToCompare?.utms);

/**
 * Creates UTM parameters from query parameters
 * @param {Record<string, string>} query - Query parameters
 * @returns {Record<string, string> | null} UTM parameters or null if none found
 */
export const createUtmFromQuery = (query: Record<string, string> = {}): Record<string, string> | null =>
  Object.entries(query).reduce<Record<string, string> | null>((utmQuery, [queryParam, value]) => {
    if (isUtmQueryParam(queryParam) && value) {
      if (utmQuery) {
        utmQuery[formatUtmKey(queryParam)] = value;
        return utmQuery;
      } else {
        return { [formatUtmKey(queryParam)]: value };
      }
    }
    return utmQuery;
  }, null);

/**
 * Creates UTM parameters from referrer URL
 * @param {string | null} referer - Referrer URL
 * @returns {Record<string, string>} UTM parameters
 */
export const createUtmFromReferer = (referer: string | null): Record<string, string> => {
  const utms: Record<string, string> = {};
  if (!referer) {
    utms[UTM_ENUM.MARKETING_MEDIUM] = UTM_MEDIUM_ENUM.DIRECT;
  } else {
    const { name, nameWithTld } = Domain(referer).parse();
    if (
      isSearchEngine(name, nameWithTld) ||
      isSocialNetwork(name, nameWithTld)
    ) {
      utms[UTM_ENUM.MARKETING_MEDIUM] = isSearchEngine(
        name,
        nameWithTld
      )
        ? UTM_MEDIUM_ENUM.ORGANIC
        : UTM_MEDIUM_ENUM.REFERRAL;
      utms[UTM_ENUM.LEAD_SOURCE] = domainCorresponding[name]
        ? domainCorresponding[name]
        : name;
    } else {
      utms[UTM_ENUM.MARKETING_MEDIUM] = UTM_MEDIUM_ENUM.REFERRAL;
      utms[UTM_ENUM.LEAD_SOURCE] = nameWithTld;
    }
  }
  return utms;
};

interface StoreLegacyType {
  import(): Array<{
    isMobile: boolean;
    visitedAt: string;
    utms: Record<string, string>;
  }>;
}

/**
 * Legacy support for importing old UTM data format
 * @param {VisitData[]} store - Array of visit data to import
 * @returns {StoreLegacyType} Legacy store interface
 */
export const StoreLegacySupport = (store: VisitData[] = []): StoreLegacyType => ({
  import(): Array<{
    isMobile: boolean;
    visitedAt: string;
    utms: Record<string, string>;
  }> {
    return store.reduce<Array<{
      isMobile: boolean;
      visitedAt: string;
      utms: Record<string, string>;
    }>>((acc, { dateTime, visitedAt = '', mobile, isMobile, utms }) => {
      acc.push({
        isMobile: mobile || isMobile || false,
        visitedAt: dateTime || visitedAt || '',
        utms: utmMapper(utms),
      });
      return acc;
    }, []);
  },
}); 