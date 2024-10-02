export const ecommerceItem = (carAd, financing, options = []) => {
  const {
    id,
    vehicle: {
      catalogSpecifications: { make, model, energyType, version },
      firstRegisteredAt,
      mileage,
    },
    isNew,
    isAvailableOnOrder,
    isLLDFinancingEligible,
    isLOAFinancingEligible,
    prices: { price, reductionAmount, lldRent } = {},
  } = carAd;

  const priceResolver = isLLDFinancingEligible
    ? lldRent?.value
    : price;

  const coupons = {
    isLoa: isLOAFinancingEligible,
    isReservableCar: isAvailableOnOrder,
    isNew,
    ...options.reduce((obj, item) => {
      obj[item] = true;
      return obj;
    }, {}),
  };

  return {
    item_id: id,
    item_name: `${make} ${model} ${version}`,
    item_brand: make,
    item_category: financing?.join() || undefined,
    item_category2: `${make} ${model}`,
    item_category3: firstRegisteredAt,
    item_category4: energyType,
    item_category5: mileage,
    price: priceResolver,
    reductionAmount,
    currency: 'EUR',
    coupon: generateTags(coupons),
    quantity: 1,
  };
};

export const generateTags = (args = {}) => {
  const tagMap = {
    isLoa: 'Éligible LOA',
    isNew: 'Neuf',
    isPreCertified: 'Véhicule pre-certifié',
    isReservableCar: 'Véhicule Réservable',
    financing: 'Financement',
    recovery: 'Reprise',
  };
  const tags = [];

  for (const key in args) {
    if (args[key] && tagMap[key]) {
      tags.push(tagMap[key]);
    }
  }
  return tags.length > 0 ? tags.join('; ') : undefined;
};
