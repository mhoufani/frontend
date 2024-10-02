import { GTM } from './index.js';

export const dataLayerPush = obj => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(obj);
    return obj;
  }
  return null;
};

export const pageView = (data, pagesToSendToDataLayer) => {
  const isFirstVisit = !window?.dataLayer?.some(
    element => element.event === 'page_view'
  );

  return dataLayerPush({
    ...data,
    event: 'page_view',
    page_template: GTM(pagesToSendToDataLayer).getPageTemplate(
      data.page_template
    ),
    page_category: GTM(pagesToSendToDataLayer).getPageCategory(
      data.page_category
    ),
    page_category2: GTM().getQueryFinancing(data.page_category2),
    original_location: GTM().getLastPageView(data.original_location),
    spa_loaded: `${isFirstVisit}`,
  });
};

export const addToCart = (data, pagesToSendToDataLayer) => {
  return dataLayerPush({
    event: 'add_to_cart',
    ...data,
    source: GTM(pagesToSendToDataLayer).getPageTemplate(data.source),
  });
};

export const purchase = (data, pagesToSendToDataLayer) => {
  return dataLayerPush({
    event: 'purchase',
    ...data,
    source: GTM(pagesToSendToDataLayer).getPageTemplate(data.source),
  });
};
