import { pageView, addToCart, purchase } from './dataLayer.js';
import { ecommerceItem } from './rules.js';
import { Try } from 'src/entity';
import { INTERNAL_FILTER_VALUES_FINANCING_TYPE } from './config.js';

const GTM = (pagesToSendToDataLayer = []) => ({
  getQueryFinancing(query) {
    if (!query) {
      return undefined;
    }
    return getFinancingLabelFromQuery(query);
  },
  getPageTemplate(route) {
    return (
      pagesToSendToDataLayer?.find(p => p.match === route)?.slug ||
      'Other'
    );
  },
  getLastPageView(route) {
    const lastPageView = window?.dataLayer?.find(
      e => e.event === 'page_view'
    );
    return lastPageView?.original_location || route;
  },
  getPageCategory(route) {
    return (
      pagesToSendToDataLayer?.find(p => p.match === route)
        ?.pageCategory || 'Other'
    );
  },
  pageViewEvent(data) {
    return Try(() => {
      pageView(
        {
          ...data,
        },
        pagesToSendToDataLayer
      );
      return this;
    }).fork(e => {
      console.error('dataLayer.pageViewEvent.error', e);
      return this;
    });
  },
  addToCartEvent(data) {
    return Try(() => {
      const { carAd = {}, source, financing } = data;
      addToCart(
        {
          items: [ecommerceItem(carAd, financing)],
          source,
        },
        pagesToSendToDataLayer
      );
      return this;
    }).fork(e => {
      console.error('dataLayer.addToCartEvent.error', e);
      return this;
    });
  },
  purchaseEvent(data) {
    return Try(() => {
      const { carAd = {}, source, options, financing } = data;
      purchase(
        {
          items: [ecommerceItem(carAd, financing, options)],
          source,
          options,
        },
        pagesToSendToDataLayer
      );
      return this;
    }).fork(e => {
      console.error('dataLayer.purcharseEvent.error', e);
      return this;
    });
  },
  getCVMIOptions(options) {
    const result = [];
    if (options.financing) {
      result.push('financing');
    }
    if (options.recovery) {
      result.push('recovery');
    }
    return result;
  },
});

export { GTM };

const getFinancingLabelFromQuery = query => {
  const ALL_FINANCING_TYPES = [
    INTERNAL_FILTER_VALUES_FINANCING_TYPE.LOA,
    INTERNAL_FILTER_VALUES_FINANCING_TYPE.LLD,
    INTERNAL_FILTER_VALUES_FINANCING_TYPE.CREDIT,
  ];

  const LEASING_TYPES = [
    INTERNAL_FILTER_VALUES_FINANCING_TYPE.LOA,
    INTERNAL_FILTER_VALUES_FINANCING_TYPE.LLD,
  ];

  if (ALL_FINANCING_TYPES.every(type => query.includes(type))) {
    return 'ALL';
  }

  if (LEASING_TYPES.every(type => query.includes(type))) {
    return 'LEASING';
  }

  return query.join();
};
