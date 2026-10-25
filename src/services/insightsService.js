
const localityMarketData = [
  { locality: "Kharadi", rate: 12000, change: 8.1, sentiment: "Positive" },
  { locality: "Baner", rate: 12500, change: 7.8, sentiment: "Positive" },
  { locality: "Balewadi", rate: 11500, change: 7.4, sentiment: "Positive" },
  { locality: "Hinjewadi", rate: 8500, change: 7.2, sentiment: "Positive" },
  { locality: "Magarpatta", rate: 11000, change: 7.1, sentiment: "Neutral" },
  { locality: "Viman Nagar", rate: 13000, change: 6.9, sentiment: "Positive" },
  { locality: "Wakad", rate: 9500, change: 6.8, sentiment: "Neutral" },
  { locality: "Kothrud", rate: 12500, change: 6.7, sentiment: "Neutral" },
  { locality: "Hadapsar", rate: 8500, change: 6.4, sentiment: "Neutral" },
  { locality: "Pimpri-Chinchwad", rate: 7000, change: 6.2, sentiment: "Positive" },
];

const marketTrendData = [
  { month: "May", residential: 8900, demand: 62 },
  { month: "Jun", residential: 9050, demand: 66 },
  { month: "Jul", residential: 9180, demand: 64 },
  { month: "Aug", residential: 9300, demand: 71 },
  { month: "Sep", residential: 9460, demand: 75 },
  { month: "Oct", residential: 9600, demand: 78 },
];

const sentimentData = [
  { name: "Positive", value: 58 },
  { name: "Neutral", value: 27 },
  { name: "Negative", value: 15 },
];

const newsData = [
  {
    id: 1,
    category: "Infrastructure",
    title: "Infrastructure developments and connectivity shape Pune's property outlook",
    summary:
      "Transport links and infrastructure projects can influence buyer interest across different parts of the city.",
    source: "Demo news summary",
    time: "Illustrative",
    sentiment: "Positive",
  },
  {
    id: 2,
    category: "Residential Market",
    title: "Homebuyer demand remains an important indicator for local markets",
    summary:
      "Buyer activity, available inventory, and affordability are useful factors to review when comparing localities.",
    source: "Demo news summary",
    time: "Illustrative",
    sentiment: "Neutral",
  },
  {
    id: 3,
    category: "Technology Hubs",
    title: "Employment hubs can influence housing demand in nearby areas",
    summary:
      "Areas near major employment centres may attract renters and homebuyers, depending on pricing and connectivity.",
    source: "Demo news summary",
    time: "Illustrative",
    sentiment: "Positive",
  },
];

const discussionData = [
  {
    id: 1,
    topic: "Connectivity and commute",
    summary:
      "Illustrative discussion about commute times, road access, and access to public transport.",
    sentiment: "Positive",
    mentions: 124,
  },
  {
    id: 2,
    topic: "Property affordability",
    summary:
      "Illustrative discussion about home prices, rental costs, and value for money.",
    sentiment: "Negative",
    mentions: 89,
  },
  {
    id: 3,
    topic: "Local amenities",
    summary:
      "Illustrative discussion about schools, shopping, healthcare, and everyday convenience.",
    sentiment: "Neutral",
    mentions: 67,
  },
];

export async function getMarketInsights() {
  // Replace this demo response with your team's real API integration later.
  return {
    localityMarketData,
    marketTrendData,
    sentimentData,
    newsData,
    discussionData,
    isDemo: true,
  };
}
