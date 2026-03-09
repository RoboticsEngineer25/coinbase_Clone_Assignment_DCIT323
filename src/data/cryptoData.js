// Coinbase 2026 - Everything Exchange: crypto + stocks + prediction markets
export const cryptoData = [
  { id: 1,  name: "Bitcoin",        symbol: "BTC",  price: 98420.50, change: 3.21,  change7d: 8.14,   marketCap: 1940000000000, volume: 48200000000,  supply: 19700000,       color: "#F7931A", category: "crypto",  sparkline: [88000, 90500, 87200, 92400, 94800, 97000, 98420] },
  { id: 2,  name: "Ethereum",       symbol: "ETH",  price: 4218.30,  change: 2.14,  change7d: 5.88,   marketCap: 507000000000,  volume: 18700000000,  supply: 120200000,      color: "#627EEA", category: "crypto",  sparkline: [3800, 3950, 3780, 4050, 4120, 4190, 4218] },
  { id: 3,  name: "Solana",         symbol: "SOL",  price: 210.75,   change: 5.33,  change7d: 14.22,  marketCap: 96000000000,   volume: 5200000000,   supply: 460000000,      color: "#9945FF", category: "crypto",  sparkline: [178, 188, 183, 196, 203, 208, 210] },
  { id: 4,  name: "BNB",            symbol: "BNB",  price: 528.40,   change: -0.88, change7d: 2.44,   marketCap: 76000000000,   volume: 1900000000,   supply: 145000000,      color: "#F3BA2F", category: "crypto",  sparkline: [520, 530, 522, 535, 528, 526, 528] },
  { id: 5,  name: "XRP",            symbol: "XRP",  price: 2.8412,   change: -1.44, change7d: -2.10,  marketCap: 157000000000,  volume: 8100000000,   supply: 55000000000,    color: "#00AAE4", category: "crypto",  sparkline: [3.1, 2.98, 3.05, 2.92, 2.88, 2.84, 2.84] },
  { id: 6,  name: "USD Coin",       symbol: "USDC", price: 1.0001,   change: 0.01,  change7d: 0.0,    marketCap: 62000000000,   volume: 12000000000,  supply: 62000000000,    color: "#2775CA", category: "stablecoin", sparkline: [1, 1, 1, 1, 1, 1, 1] },
  { id: 7,  name: "Cardano",        symbol: "ADA",  price: 0.9812,   change: 4.20,  change7d: 12.44,  marketCap: 34000000000,   volume: 820000000,    supply: 35000000000,    color: "#3CC8C8", category: "crypto",  sparkline: [0.84, 0.88, 0.86, 0.91, 0.95, 0.97, 0.98] },
  { id: 8,  name: "Avalanche",      symbol: "AVAX", price: 52.88,    change: 3.11,  change7d: 9.34,   marketCap: 22000000000,   volume: 680000000,    supply: 410000000,      color: "#E84142", category: "crypto",  sparkline: [46, 48, 47, 50, 51, 52, 52.9] },
  { id: 9,  name: "Dogecoin",       symbol: "DOGE", price: 0.3814,   change: 7.22,  change7d: 21.44,  marketCap: 54000000000,   volume: 3800000000,   supply: 141000000000,   color: "#C2A633", category: "crypto",  sparkline: [0.28, 0.30, 0.31, 0.33, 0.36, 0.37, 0.38] },
  { id: 10, name: "Chainlink",      symbol: "LINK", price: 22.44,    change: 2.88,  change7d: 7.12,   marketCap: 14000000000,   volume: 820000000,    supply: 600000000,      color: "#2A5ADA", category: "crypto",  sparkline: [20, 20.8, 20.4, 21.2, 21.8, 22.1, 22.4] },
  { id: 11, name: "Polygon",        symbol: "POL",  price: 1.2840,   change: 1.44,  change7d: 3.88,   marketCap: 12000000000,   volume: 420000000,    supply: 10000000000,    color: "#8247E5", category: "crypto",  sparkline: [1.19, 1.22, 1.20, 1.24, 1.26, 1.27, 1.28] },
  { id: 12, name: "Base",           symbol: "BASE", price: 0.0412,   change: 11.20, change7d: 28.44,  marketCap: 4200000000,    volume: 540000000,    supply: 100000000000,   color: "#0052FF", category: "crypto",  sparkline: [0.029, 0.031, 0.033, 0.035, 0.037, 0.040, 0.041] },
];

export const stockData = [
  { id: 101, name: "NVIDIA",         symbol: "NVDA",  price: 1124.88, change: 1.44,  change7d: 4.20,  marketCap: 2760000000000, volume: 42000000000,  color: "#76B900", category: "stock", sparkline: [1080, 1095, 1088, 1102, 1110, 1118, 1124] },
  { id: 102, name: "Apple",          symbol: "AAPL",  price: 228.44,  change: 0.88,  change7d: 2.14,  marketCap: 3500000000000, volume: 58000000000,  color: "#555555", category: "stock", sparkline: [222, 224, 221, 225, 226, 227, 228] },
  { id: 103, name: "Tesla",          symbol: "TSLA",  price: 348.20,  change: -2.11, change7d: -3.44, marketCap: 1120000000000, volume: 31000000000,  color: "#CC0000", category: "stock", sparkline: [362, 358, 355, 352, 350, 349, 348] },
  { id: 104, name: "Microsoft",      symbol: "MSFT",  price: 488.80,  change: 0.62,  change7d: 1.88,  marketCap: 3630000000000, volume: 22000000000,  color: "#00A4EF", category: "stock", sparkline: [480, 482, 481, 484, 486, 487, 488] },
  { id: 105, name: "Coinbase",       symbol: "COIN",  price: 388.50,  change: 4.22,  change7d: 11.88, marketCap: 96000000000,   volume: 3200000000,   color: "#0052FF", category: "stock", sparkline: [358, 365, 371, 376, 381, 384, 388] },
];

export const predictionData = [
  { id: 201, name: "BTC above $120K by June 2026?", symbol: "BTC-120K",  price: 0.62, change: 8.20,  volume: 4200000, category: "prediction", color: "#F7931A", expires: "Jun 30, 2026" },
  { id: 202, name: "Fed cuts rates in Q2 2026?",    symbol: "FED-Q2CUT", price: 0.44, change: -5.10, volume: 2800000, category: "prediction", color: "#2775CA", expires: "Jun 30, 2026" },
  { id: 203, name: "ETH above $8K in 2026?",        symbol: "ETH-8K",    price: 0.29, change: 12.40, volume: 1900000, category: "prediction", color: "#627EEA", expires: "Dec 31, 2026" },
  { id: 204, name: "S&P 500 above 6500 by July?",   symbol: "SPX-6500",  price: 0.71, change: 2.80,  volume: 5100000, category: "prediction", color: "#76B900", expires: "Jul 31, 2026" },
];

export const learnArticles = [
  { id: 1, category: "Crypto Basics",     title: "What is cryptocurrency?",          description: "Learn the fundamentals of digital currency and how blockchain technology works.",                              readTime: "5 min",  image: "🔐", reward: "2 USDC" },
  { id: 2, category: "Bitcoin",           title: "What is Bitcoin?",                 description: "Explore the world's first decentralized digital currency and its revolutionary impact.",                     readTime: "8 min",  image: "₿",  reward: "3 USDC" },
  { id: 3, category: "Ethereum",          title: "What is Ethereum?",                description: "Discover smart contracts, DeFi, and the programmable blockchain powering Web3.",                            readTime: "7 min",  image: "◊",  reward: "3 USDC" },
  { id: 4, category: "Base",             title: "What is Base?",                    description: "Explore Coinbase's L2 network — fast, low-cost, and built for onchain activity at scale.",                  readTime: "6 min",  image: "🔵", reward: "5 USDC" },
  { id: 5, category: "DeFi",             title: "Introduction to DeFi",            description: "Understand decentralized finance and how it's reshaping the global financial system.",                        readTime: "10 min", image: "🏦", reward: "5 USDC" },
  { id: 6, category: "Stablecoins",      title: "What are stablecoins?",           description: "Learn how USDC and other stablecoins work as digital dollars for payments and savings.",                     readTime: "5 min",  image: "💵", reward: "2 USDC" },
];

// Format helpers
export const formatPrice = (price, category) => {
  if (category === "prediction") return `$${price.toFixed(2)}`;
  if (price >= 1000) return `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (price >= 1) return `$${price.toFixed(2)}`;
  if (price >= 0.01) return `$${price.toFixed(4)}`;
  return `$${price.toFixed(6)}`;
};

export const formatMarketCap = (cap) => {
  if (cap >= 1e12) return `$${(cap / 1e12).toFixed(2)}T`;
  if (cap >= 1e9)  return `$${(cap / 1e9).toFixed(2)}B`;
  if (cap >= 1e6)  return `$${(cap / 1e6).toFixed(2)}M`;
  return `$${cap.toLocaleString()}`;
};

export const formatChange = (v) => `${v >= 0 ? "+" : ""}${v.toFixed(2)}%`;

export const allAssets = [...cryptoData, ...stockData];
