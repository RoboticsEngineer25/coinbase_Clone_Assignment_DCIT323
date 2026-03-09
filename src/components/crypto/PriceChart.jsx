import { useState, useMemo } from "react";
import { formatPrice } from "../../data/cryptoData";

const generateData = (basePrice, points, volatility) => {
  const data = [];
  let price = basePrice * 0.85;
  for (let i = 0; i < points; i++) {
    price += (Math.random() - 0.47) * volatility;
    price = Math.max(price, basePrice * 0.5);
    data.push(price);
  }
  data[data.length - 1] = basePrice;
  return data;
};

const TIMEFRAMES = ["1H", "1D", "1W", "1M", "1Y", "ALL"];

export default function PriceChart({ asset }) {
  const [timeframe, setTimeframe] = useState("1W");
  const [hoverIdx, setHoverIdx] = useState(null);

  const configs = {
    "1H": { points: 60, vol: asset.price * 0.002 },
    "1D": { points: 48, vol: asset.price * 0.008 },
    "1W": { points: 168, vol: asset.price * 0.015 },
    "1M": { points: 90, vol: asset.price * 0.04 },
    "1Y": { points: 52, vol: asset.price * 0.1 },
    "ALL": { points: 120, vol: asset.price * 0.18 },
  };

  const data = useMemo(() => {
    const cfg = configs[timeframe];
    return generateData(asset.price, cfg.points, cfg.vol);
  }, [timeframe, asset.price]);

  const isPositive = data[data.length - 1] >= data[0];
  const hoverPrice = hoverIdx !== null ? data[hoverIdx] : asset.price;
  const change = ((data[data.length - 1] - data[0]) / data[0] * 100);

  const W = 600, H = 200;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - ((v - min) / range) * (H - 24) - 12;
    return [x, y];
  });

  const pathD = `M ${pts.map(([x, y]) => `${x},${y}`).join(" L ")}`;
  const fillD = `M ${pts[0][0]},${H} L ${pts.map(([x, y]) => `${x},${y}`).join(" L ")} L ${pts[pts.length - 1][0]},${H} Z`;

  const strokeColor = isPositive ? "#05B169" : "#F05252";
  const gradId = `grad-${asset.symbol}-${timeframe}`;

  return (
    <div>
      {/* Price header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-2xl font-mono font-bold text-cb-text">{formatPrice(hoverPrice)}</div>
          <div className={`flex items-center gap-1 mt-1 text-sm font-semibold font-mono ${isPositive ? "text-cb-green" : "text-cb-red"}`}>
            <span>{isPositive ? "▲" : "▼"}</span>
            <span>{isPositive ? "+" : ""}{change.toFixed(2)}%</span>
            <span className="text-cb-text-tertiary font-normal text-xs ml-1">({timeframe})</span>
          </div>
        </div>
        <div className="flex gap-1">
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                timeframe === tf
                  ? "bg-cb-bg-hover text-cb-text"
                  : "text-cb-text-tertiary hover:text-cb-text hover:bg-cb-bg-raised"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="relative w-full" style={{ paddingBottom: "33%" }}>
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * W;
            const idx = Math.round((x / W) * (data.length - 1));
            setHoverIdx(Math.max(0, Math.min(data.length - 1, idx)));
          }}
          onMouseLeave={() => setHoverIdx(null)}
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={strokeColor} stopOpacity="0.15" />
              <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={fillD} fill={`url(#${gradId})`} />
          <path d={pathD} fill="none" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          {hoverIdx !== null && (
            <>
              <line x1={pts[hoverIdx][0]} y1="0" x2={pts[hoverIdx][0]} y2={H} stroke="#4E5563" strokeWidth="1" strokeDasharray="4,4" />
              <circle cx={pts[hoverIdx][0]} cy={pts[hoverIdx][1]} r="4" fill={strokeColor} stroke="#0A0B0D" strokeWidth="2" />
            </>
          )}
        </svg>
      </div>
    </div>
  );
}
