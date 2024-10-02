import {
  domainCorresponding,
  queryParamsUtm,
  searchEngines,
  socialNetworks,
  UTM_MEDIUM_ENUM,
  UTM_ENUM,
} from './config.js';

import { Domain } from '../url/index.js';

export const utmMapping = {
  [UTM_ENUM.MARKETING_MEDIUM]: utm =>
    utm.medium || utm[UTM_ENUM.MARKETING_MEDIUM],
  [UTM_ENUM.LEAD_SOURCE]: utm =>
    utm.source || utm[UTM_ENUM.LEAD_SOURCE],
  [UTM_ENUM.AD_CAMPAIGN]: utm =>
    utm.campaign || utm[UTM_ENUM.AD_CAMPAIGN],
  [UTM_ENUM.CAMPAIGN_SUBJECT]: utm =>
    utm.content || utm[UTM_ENUM.CAMPAIGN_SUBJECT],
  [UTM_ENUM.BROWSING_TERM]: utm =>
    utm.term || utm[UTM_ENUM.BROWSING_TERM],
};

export const formatUtmKey = validUtm => validUtm.replace('utm_', '');

export const isSameUTMs = (utm = {}, utmToCompare = {}) =>
  utm.utms &&
  utmToCompare.utms &&
  Object.entries(utm.utms).toString() ===
    Object.entries(utmToCompare.utms).toString();

export const isSameDevice = (utm = {}, utmToCompare = {}) =>
  utm && utmToCompare && utm.mobile === utmToCompare.mobile;

const utmMapper = utm =>
  Object.entries(utmMapping).reduce((utmMapped, [keyMap, mapper]) => {
    const value = mapper(utm);
    if (value) utmMapped[keyMap] = value;
    return utmMapped;
  }, {});

export const isUtmQueryParam = queryParam =>
  queryParamsUtm.includes(queryParam);

// todo: rework rules for check only domain name and dynamic list on back
export const isSearchEngine = (domainName, domainWithTld) =>
  domainName === 'google' || searchEngines.includes(domainWithTld);

// todo: rework rules for check only domain name and dynamic list on back
export const isSocialNetwork = (domainName, domainWithTld) =>
  domainName === 'pinterest' ||
  socialNetworks.includes(domainWithTld);

export const isSameUtm = (utm, utmToCompare) =>
  isSameDevice(utm, utmToCompare) && isSameUTMs(utm, utmToCompare);

export const createUtmFromQuery = (query = {}) =>
  Object.entries(query).reduce((utmQuery, [queryParam, value]) => {
    if (isUtmQueryParam(queryParam) && value) {
      if (utmQuery) {
        utmQuery[formatUtmKey(queryParam)] = value;
      } else {
        return { [formatUtmKey(queryParam)]: value };
      }
    }
    return utmQuery;
  }, null);

export const createUtmFromReferer = referer => {
  const utms = {};
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

export const StoreLegacySupport = (store = []) => ({
  import() {
    return store.reduce(
      (acc, { dateTime, visitedAt = '', mobile, isMobile, utms }) =>
        acc.push({
          isMobile: mobile || isMobile || false,
          visitedAt: dateTime || visitedAt || '',
          utms: utmMapper(utms),
        }) && acc,
      []
    );
  },
});
