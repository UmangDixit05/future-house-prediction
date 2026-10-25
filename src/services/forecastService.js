
const localityData = {
  Hinjewadi: { currentRate: 8500, annualGrowth: 7.2 },
  Wakad: { currentRate: 9500, annualGrowth: 6.8 },
  Baner: { currentRate: 12500, annualGrowth: 7.8 },
  Balewadi: { currentRate: 11500, annualGrowth: 7.4 },
  Kharadi: { currentRate: 12000, annualGrowth: 8.1 },
  "Viman Nagar": { currentRate: 13000, annualGrowth: 6.9 },
  Hadapsar: { currentRate: 8500, annualGrowth: 6.4 },
  "Pimpri-Chinchwad": { currentRate: 7000, annualGrowth: 6.2 },
  Kothrud: { currentRate: 12500, annualGrowth: 6.7 },
  Magarpatta: { currentRate: 11000, annualGrowth: 7.1 },
};

export const forecastLocalities = Object.keys(localityData);

export const forecastPeriods = [
  { label: "3 months", value: 3 },
  { label: "6 months", value: 6 },
  { label: "1 year", value: 12 },
];

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function getMonthLabel(offset) {
  const date = new Date();
  date.setDate(1);
  date.setMonth(date.getMonth() + offset);

  return `${monthNames[date.getMonth()]} ${String(date.getFullYear()).slice(-2)}`;
}

function roundToNearest50(value) {
  return Math.round(value / 50) * 50;
}

// DEMO ONLY: illustrative assumptions, not verified market data
// and not predictions from a trained machine-learning model.
export async function getForecastData(locality, forecastMonths = 6) {
  const selectedLocality = localityData[locality];
  const months = Number(forecastMonths);

  if (!selectedLocality) {
    throw new Error("Please select a valid Pune locality.");
  }

  if (![3, 6, 12].includes(months)) {
    throw new Error("Please select a supported forecast period.");
  }

  const { currentRate, annualGrowth } = selectedLocality;
  const monthlyGrowth =
    Math.pow(1 + annualGrowth / 100, 1 / 12) - 1;

  const history = [];

  for (let offset = -5; offset <= 0; offset += 1) {
    const rate = currentRate * Math.pow(1 + monthlyGrowth, offset);

    history.push({
      month: getMonthLabel(offset),
      historicalPrice: roundToNearest50(rate),
      forecastPrice: offset === 0 ? currentRate : null,
    });
  }

  const forecast = [];

  for (let month = 1; month <= months; month += 1) {
    const rate = currentRate * Math.pow(1 + monthlyGrowth, month);

    forecast.push({
      month: getMonthLabel(month),
      historicalPrice: null,
      forecastPrice: roundToNearest50(rate),
    });
  }

  const projectedRate = roundToNearest50(
    currentRate * Math.pow(1 + monthlyGrowth, months)
  );

  return {
    locality,
    forecastMonths: months,
    currentRate,
    projectedRate,
    annualGrowth,
    projectedChange: projectedRate - currentRate,
    projectedChangePercent:
      ((projectedRate - currentRate) / currentRate) * 100,
    chartData: [...history, ...forecast],
    isDemo: true,
  };
}

export async function getLocalityComparison() {
  return Object.entries(localityData)
    .map(([locality, data]) => ({
      locality,
      currentRate: data.currentRate,
      annualGrowth: data.annualGrowth,
    }))
    .sort((a, b) => b.annualGrowth - a.annualGrowth);
}
