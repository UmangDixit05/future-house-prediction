
const localityRates = {
  Hinjewadi: 8500,
  Wakad: 9500,
  Baner: 12500,
  Balewadi: 11500,
  Kharadi: 12000,
  "Viman Nagar": 13000,
  Hadapsar: 8500,
  "Pimpri-Chinchwad": 7000,
  Kothrud: 12500,
  Magarpatta: 11000,
};

const propertyTypeFactors = {
  Apartment: 1,
  Villa: 1.35,
  "Independent House": 1.2,
};

const furnishingFactors = {
  Unfurnished: 1,
  Semi: 1.04,
  Furnished: 1.08,
};

// DEMO ONLY: This is not a trained ML model or a real market valuation.
export async function predictPropertyPrice(property) {
  const {
    locality,
    propertyType,
    area,
    bhk,
    propertyAge,
    furnishing,
  } = property;

  const areaValue = Number(area);
  const bhkValue = Number(bhk);
  const ageValue = Number(propertyAge);

  if (
    !localityRates[locality] ||
    !propertyTypeFactors[propertyType] ||
    !furnishingFactors[furnishing] ||
    !Number.isFinite(areaValue) ||
    areaValue < 200 ||
    areaValue > 20000 ||
    !Number.isFinite(bhkValue) ||
    bhkValue < 1 ||
    bhkValue > 10 ||
    !Number.isFinite(ageValue) ||
    ageValue < 0 ||
    ageValue > 100
  ) {
    throw new Error("Please enter valid property details.");
  }

  const baseRate = localityRates[locality];
  const ageFactor = Math.max(0.8, 1 - ageValue * 0.005);
  const bhkFactors = {
  1: 0.92,
  2: 0.97,
  3: 1.00,
  4: 1.05,
  5: 1.08,
  6: 1.10,
};

const bhkFactor = bhkFactors[bhkValue] ?? 1;

  const pricePerSqFt = Math.round(
    baseRate *
      propertyTypeFactors[propertyType] *
      furnishingFactors[furnishing] *
      ageFactor *
      bhkFactor
  );

  const estimatedPrice = pricePerSqFt * areaValue;

  return {
    estimatedPrice,
    pricePerSqFt,
    lowerPrice: Math.round(estimatedPrice * 0.9),
    upperPrice: Math.round(estimatedPrice * 1.1),
    isDemo: true,
  };
}
