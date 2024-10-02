import { GTM } from 'util-common/tracking';
import { dataLayerPush } from 'util-common/tracking/dataLayer';
import { ecommerceItem } from 'util-common/tracking/rules';

beforeEach(() => {
  window.dataLayer = undefined;
});

describe('GTM', () => {
  describe('page_view events', () => {
    it('should return page_view event on home page with git at true', () => {
      const mockPageViewParams = {
        page_template: '/',
        page_category: '/',
        page_category2: null,
        page_category3: undefined,
        original_location: '/',
      };
      const mockPageViewParamsResult = {
        page_template: 'HP',
        page_category: 'HP',
        page_category2: undefined,
        page_category3: undefined,
        original_location: '/',
        event: 'page_view',
        spa_loaded: 'true',
      };
      const mockPageViewParamsResultSecond = {
        page_template: 'HP',
        page_category: 'HP',
        page_category2: undefined,
        page_category3: undefined,
        original_location: '/',
        event: 'page_view',
        spa_loaded: 'false',
      };
      GTM(pagesToSendToDataLayer)
        .pageViewEvent(mockPageViewParams)
        .pageViewEvent(mockPageViewParams);
      expect(window.dataLayer[0]).toEqual(mockPageViewParamsResult);
      expect(window.dataLayer[1]).toEqual(
        mockPageViewParamsResultSecond
      );
    });
    it('should return page_view event on first page with page_category2 defined', () => {
      const mockPageViewParams = {
        page_template: '/recherche.html',
        page_category: '/recherche.html',
        page_category2: ['loa', 'lld'],
        page_category3: undefined,
        original_location: '/recherche.html',
      };
      const mockPageViewParamsResult = {
        page_template: 'Search',
        page_category: 'Search',
        page_category2: 'LEASING',
        page_category3: undefined,
        original_location: '/recherche.html',
        event: 'page_view',
        spa_loaded: 'true',
      };
      GTM(pagesToSendToDataLayer).pageViewEvent(mockPageViewParams);
      expect(window.dataLayer[0]).toEqual(mockPageViewParamsResult);
    });
    it('should return ALL for page_category2 if all financials query are selected', () => {
      const mockPageViewParams = {
        page_template: '/recherche.html',
        page_category: '/recherche.html',
        page_category2: ['loa', 'lld', 'credit'],
        page_category3: undefined,

        original_location: '/recherche.html',
      };
      const mockPageViewParamsResult = {
        page_template: 'Search',
        page_category: 'Search',
        page_category2: 'ALL',
        page_category3: undefined,
        original_location: '/recherche.html',
        event: 'page_view',
        spa_loaded: 'true',
      };
      GTM(pagesToSendToDataLayer).pageViewEvent(mockPageViewParams);
      expect(window.dataLayer[0]).toEqual(mockPageViewParamsResult);
    });
    it('should return undefined for isStock if isStock input not exist', () => {
      const mockPageViewParams = {
        page_template: '/recherche.html',
        page_category: '/recherche.html',
        page_category2: ['loa', 'lld', 'credit'],
        page_category3: undefined,
        original_location: '/recherche.html',
      };
      const mockPageViewParamsResult = {
        page_template: 'Search',
        page_category: 'Search',
        page_category2: 'ALL',
        page_category3: undefined,
        isStock: undefined,
        original_location: '/recherche.html',
        event: 'page_view',
        spa_loaded: 'true',
      };
      GTM(pagesToSendToDataLayer).pageViewEvent(mockPageViewParams);
      expect(window.dataLayer[0]).toEqual(mockPageViewParamsResult);
    });
  });

  describe('add_to_cart events', () => {
    const mockAddToCartParams = {
      carAd: {
        id: 'RZCSTKFR20941',
        images: [
          {
            width: 'W660',
            urls: [
              'https://www.reezocar.com/660/reezocorp-stock.fr/RZCSTKFR20941/PEUGEOT-208-00.webp',
              'https://www.reezocar.com/660/reezocorp-stock.fr/RZCSTKFR20941/PEUGEOT-208-01.webp',
              'https://www.reezocar.com/660/reezocorp-stock.fr/RZCSTKFR20941/PEUGEOT-208-02.webp',
              'https://www.reezocar.com/660/reezocorp-stock.fr/RZCSTKFR20941/PEUGEOT-208-03.webp',
            ],
          },
        ],
        tag: '',
        isLOAFinancingEligible: true,
        isLLDFinancingEligible: false,
        isCreditFinancingEligible: false,
        isAvailableOnOrder: false,
        isNew: false,
        prices: {
          price: 27290,
          discountPercentage: null,
          reductionAmount: 0,
          loaRent: null,
          creditRent: {
            value: 375,
            isVATExcluded: false,
          },
          lldRent: null,
        },
        vehicle: {
          catalogSpecifications: {
            make: 'PEUGEOT',
            model: '208',
            version: 'ELECTRIQUE 50 KWH 136CH GT',
            energyType: 'ELECTRIC',
            gearboxType: 'AUTOMATIC',
          },
          firstRegisteredAt: '2021-06-01T00:00:00Z',
          mileage: 5213,
          appearance: {
            ExteriorColors: ['BLACK'],
          },
        },
      },
      financing: ['loa'],
      source: '/recherche.html',
    };

    const mockAddToCartParamsResult = {
      event: 'add_to_cart',
      items: [
        {
          item_id: 'RZCSTKFR20941',
          item_name: 'PEUGEOT 208 ELECTRIQUE 50 KWH 136CH GT',
          item_brand: 'PEUGEOT',
          item_category: 'loa',
          item_category2: 'PEUGEOT 208',
          item_category3: '2021-06-01T00:00:00Z',
          item_category4: 'ELECTRIC',
          item_category5: 5213,
          price: 27290,
          reductionAmount: 0,
          currency: 'EUR',
          coupon: 'Éligible LOA',
          quantity: 1,
        },
      ],
      source: 'Search',
    };
    it('should send add_cart event', () => {
      GTM(pagesToSendToDataLayer).addToCartEvent(mockAddToCartParams);
      expect(window.dataLayer[0]).toEqual(mockAddToCartParamsResult);
    });
  });
  describe('purchase events', () => {
    const mockAddToCartParams = {
      carAd: {
        id: 'RZCSTKFR20941',
        images: [
          {
            width: 'W660',
            urls: [
              'https://www.reezocar.com/660/reezocorp-stock.fr/RZCSTKFR20941/PEUGEOT-208-00.webp',
              'https://www.reezocar.com/660/reezocorp-stock.fr/RZCSTKFR20941/PEUGEOT-208-01.webp',
              'https://www.reezocar.com/660/reezocorp-stock.fr/RZCSTKFR20941/PEUGEOT-208-02.webp',
              'https://www.reezocar.com/660/reezocorp-stock.fr/RZCSTKFR20941/PEUGEOT-208-03.webp',
            ],
          },
        ],
        tag: '',
        isLOAFinancingEligible: false,
        isLLDFinancingEligible: false,
        isCreditFinancingEligible: true,
        isAvailableOnOrder: false,
        isNew: false,
        prices: {
          price: 27290,
          discountPercentage: null,
          reductionAmount: 0,
          loaRent: null,
          creditRent: {
            value: 375,
            isVATExcluded: false,
          },
          lldRent: null,
        },
        vehicle: {
          catalogSpecifications: {
            make: 'PEUGEOT',
            model: '208',
            version: 'ELECTRIQUE 50 KWH 136CH GT',
            energyType: 'ELECTRIC',
            gearboxType: 'AUTOMATIC',
          },
          firstRegisteredAt: '2021-06-01T00:00:00Z',
          mileage: 5213,
          appearance: {
            ExteriorColors: ['BLACK'],
          },
        },
      },
      options: ['financing'],
      source: '/recherche.html',
    };

    const mockAddToCartParamsResult = {
      event: 'purchase',
      items: [
        {
          item_id: 'RZCSTKFR20941',
          item_name: 'PEUGEOT 208 ELECTRIQUE 50 KWH 136CH GT',
          item_brand: 'PEUGEOT',
          item_category: undefined,
          item_category2: 'PEUGEOT 208',
          item_category3: '2021-06-01T00:00:00Z',
          item_category4: 'ELECTRIC',
          item_category5: 5213,
          price: 27290,
          reductionAmount: 0,
          currency: 'EUR',
          coupon: 'Financement',
          quantity: 1,
        },
      ],
      options: ['financing'],
      source: 'Search',
    };
    it('should send add_cart event', () => {
      GTM(pagesToSendToDataLayer).purchaseEvent(mockAddToCartParams);
      expect(window.dataLayer[0]).toEqual(mockAddToCartParamsResult);
    });
  });

  describe('dataLayers helpers functions', () => {
    it('should return ALL', () => {
      const mockFinancingFilters = ['loa', 'lld', 'credit'];
      const mockFinancingFiltersResult = 'ALL';
      const event = GTM().getQueryFinancing(mockFinancingFilters);
      expect(event).toEqual(mockFinancingFiltersResult);
    });
    it('should return LOA,LLD', () => {
      const mockFinancingFilters = ['loa', 'lld'];
      const mockFinancingFiltersResult = 'LEASING';
      const event = GTM().getQueryFinancing(mockFinancingFilters);
      expect(event).toEqual(mockFinancingFiltersResult);
    });
    it('should return right ecommerceItem values', () => {
      const mockCarAd = {
        id: 'RZCSTKFR20941',
        images: [
          {
            width: 'W660',
            urls: [
              'https://www.reezocar.com/660/reezocorp-stock.fr/RZCSTKFR20941/PEUGEOT-208-00.webp',
              'https://www.reezocar.com/660/reezocorp-stock.fr/RZCSTKFR20941/PEUGEOT-208-01.webp',
              'https://www.reezocar.com/660/reezocorp-stock.fr/RZCSTKFR20941/PEUGEOT-208-02.webp',
              'https://www.reezocar.com/660/reezocorp-stock.fr/RZCSTKFR20941/PEUGEOT-208-03.webp',
            ],
          },
        ],
        tag: '',
        isLLDFinancingEligible: false,
        isLOAFinancingEligible: true,
        isCreditFinancingEligible: true,
        isNew: true,
        isAvailableOnOrder: false,
        prices: {
          price: 27290,
          discountPercentage: null,
          reductionAmount: 0,
          loaRent: null,
          creditRent: {
            value: 375,
            isVATExcluded: false,
          },
          lldRent: null,
        },
        vehicle: {
          catalogSpecifications: {
            make: 'PEUGEOT',
            model: '208',
            version: 'ELECTRIQUE 50 KWH 136CH GT',
            energyType: 'ELECTRIC',
            gearboxType: 'AUTOMATIC',
          },
          firstRegisteredAt: '2021-06-01T00:00:00Z',
          mileage: 5213,
          appearance: {
            ExteriorColors: ['BLACK'],
          },
        },
      };

      const mockEcommerceItemOutputParams = {
        coupon: 'Éligible LOA; Neuf',
        currency: 'EUR',
        item_brand: 'PEUGEOT',
        item_category: undefined,
        item_category2: 'PEUGEOT 208',
        item_category3: '2021-06-01T00:00:00Z',
        item_category4: 'ELECTRIC',
        item_category5: 5213,
        item_id: 'RZCSTKFR20941',
        item_name: 'PEUGEOT 208 ELECTRIQUE 50 KWH 136CH GT',
        price: 27290,
        quantity: 1,
        reductionAmount: 0,
      };
      const item = ecommerceItem(mockCarAd);
      expect(item).toEqual(mockEcommerceItemOutputParams);
    });
    it('should return undefined if window is no dataLayer found', () => {
      Object.defineProperty(globalThis, 'window', {
        value: undefined,
      });
      const event = dataLayerPush({});
      expect(event).toEqual(null);
    });
  });
});

const pagesToSendToDataLayer = [
  { match: '/', slug: 'HP', pageCategory: 'HP' },
  {
    match: '/recherche.html',
    slug: 'Search',
    pageCategory: 'Search',
  },
  {
    match: '/annonce/[...slug]',
    slug: 'Standalone',
    pageCategory: 'Standalone',
  },
];
