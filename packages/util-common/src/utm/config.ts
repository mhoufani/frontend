/**
 * List of supported search engine domains for UTM tracking
 * Used to identify organic search traffic sources
 * @constant {readonly string[]}
 */
export const searchEngineDomains = [
  'bing.com',
  'qwant.com', 
  'yahoo.com',
  'ecosia.org',
  'duckduckgo.com',
] as const;

/**
 * Type representing valid search engine domains
 * Derived from the searchEngineDomains constant array
 * @typedef {typeof searchEngineDomains[number]} SearchEngine
 */
export type SearchEngineDomains = typeof searchEngineDomains[number];

/**
 * List of supported social network domains for UTM tracking
 * Used to identify traffic sources from social media platforms
 * @constant {readonly string[]}
 */
export const socialNetworks = [
  'facebook.com',
  't.co',
  'linkedin.com',
  'instagram.com',
  'snapchat.com',
] as const;

/**
 * Type representing valid social network domains
 * Derived from the socialNetworks constant array
 * @typedef {typeof socialNetworks[number]} SocialNetwork
 */
export type SocialNetwork = typeof socialNetworks[number];

export const domainCorresponding: Record<string, string> = {
  t: 'twitter',
};

/** Key used for storing UTM tracking data in local storage */
export const UTM_NAME_STORE = 'utm-tracking-store';

/** UTM parameter for tracking marketing medium */
export const UTM_MEDIUM = 'utm_medium' as const;
/** UTM parameter for tracking traffic source */
export const UTM_SOURCE = 'utm_source' as const;
/** UTM parameter for tracking campaign name */
export const UTM_CAMPAIGN = 'utm_campaign' as const;
/** UTM parameter for tracking campaign content */
export const UTM_CONTENT = 'utm_content' as const;
/** UTM parameter for tracking search terms */
export const UTM_TERM = 'utm_term' as const;

/** Type containing all UTM parameter keys */
export type UtmParamKey = typeof UTM_MEDIUM | typeof UTM_SOURCE | typeof UTM_CAMPAIGN | typeof UTM_CONTENT | typeof UTM_TERM;

export const queryParamsUtm: string[] = [
  UTM_MEDIUM,
  UTM_SOURCE,
  UTM_CAMPAIGN,
  UTM_CONTENT,
  UTM_TERM,
];

export const UTM_MEDIUM_ENUM = {
  DIRECT: 'direct',
  ORGANIC: 'organic',
  REFERRAL: 'referral',
} as const;

export type UtmMediumType = typeof UTM_MEDIUM_ENUM[keyof typeof UTM_MEDIUM_ENUM];

export const UTM_ENUM = {
  MARKETING_MEDIUM: 'marketingMedium',
  LEAD_SOURCE: 'leadSource',
  AD_CAMPAIGN: 'adCampaign',
  CAMPAIGN_SUBJECT: 'campaignSubject',
  BROWSING_TERM: 'browsingTerm',
} as const;

export type UtmEnumType = typeof UTM_ENUM[keyof typeof UTM_ENUM];
