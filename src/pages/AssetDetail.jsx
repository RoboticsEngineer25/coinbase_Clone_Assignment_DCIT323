import { useState } from "react";
import { useApp } from "../App";
import { cryptoData, formatPrice, formatMarketCap } from "../data/cryptoData";
import PriceChart from "../components/crypto/PriceChart";

export default function AssetDetail({ asset }) {
  const { navigate, watchlist, toggleWatchlist } = useApp();
  const [tab, setTab] = useState("buy");
  const [amount, setAmount] = useState("");
  const [orderType, setOrderType] = useState("market");

  const a = asset || cryptoData[0];
  const isPositive = a.change >= 0;
  const isWatched = watchlist.includes(a.symbol);
  const cryptoAmount = amount ? (parseFloat(amount) / a.price).toFixed(6) : "0.000000";
  const fee = amount ? (parseFloat(amount) * 0.015).toFixed(2) : "0.00";
  const related = cryptoData.filter((c) => c.id !== a.id).slice(0, 4);

  return (
    <div className="bg-cb-bg min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <button onClick={() => navigate("explore")} className="flex items-center gap-2 text-xs text-cb-text-tertiary hover:text-cb-text mb-6 transition-colors group">
          <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Explore
          <span className="text-cb-text-tertiary">/</span>
          <span className="text-cb-text-secondary">{a.name}</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Chart + info */}
          <div className="lg:col-span-2 space-y-4">
            {/* Asset header */}
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-lg shadow-xl" style={{ backgroundColor: a.color }}>
                  {a.symbol[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-xl font-bold text-cb-text">{a.name}</h1>
                    <span className="text-xs text-cb-text-tertiary bg-cb-bg-raised border border-cb-border px-2 py-0.5 rounded-md font-mono">{a.symbol}</span>
                    <span className="text-xs text-cb-text-tertiary bg-cb-bg-raised border border-cb-border px-2 py-0.5 rounded-md">#{a.id}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-mono font-bold text-cb-text">{formatPrice(a.price)}</span>
                    <span className={`text-sm font-semibold font-mono px-2.5 py-0.5 rounded-md ${isPositive ? "text-cb-green bg-cb-green-dim" : "text-cb-red bg-cb-red-dim"}`}>
                      {isPositive ? "+" : ""}{a.change.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => toggleWatchlist(a.symbol)}
                className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-sm font-semibold transition-all ${
                  isWatched
                    ? "border-yellow-500/40 bg-yellow-500/10 text-yellow-400"
                    : "border-cb-border bg-cb-bg-card text-cb-text-secondary hover:border-cb-blue/50 hover:text-cb-text"
                }`}
              >
                <svg className={`w-4 h-4 ${isWatched ? "fill-yellow-400 text-yellow-400" : ""}`} fill={isWatched ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                {isWatched ? "Watching" : "Add to watchlist"}
              </button>
            </div>

            {/* Chart card */}
            <div className="bg-cb-bg-card border border-cb-border rounded-2xl p-6">
              <PriceChart asset={a} />
            </div>

            {/* Stats */}
            <div className="bg-cb-bg-card border border-cb-border rounded-2xl p-6">
              <h3 className="font-bold text-cb-text mb-5 text-sm uppercase tracking-wider text-cb-text-tertiary">Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {[
                  { label: "Market cap", value: formatMarketCap(a.marketCap) },
                  { label: "24h volume", value: formatMarketCap(a.volume) },
                  { label: "Circulating supply", value: `${(a.supply / 1e6).toFixed(1)}M ${a.symbol}` },
                  { label: "All-time high (est.)", value: formatPrice(a.price * 1.34) },
                  { label: "7d change", value: `${a.change7d >= 0 ? "+" : ""}${a.change7d.toFixed(2)}%`, colored: true, positive: a.change7d >= 0 },
                  { label: "Rank on Coinbase", value: `#${a.id}` },
                ].map((stat) => (
                  <div key={stat.label} className="border-l-2 border-cb-border pl-4">
                    <div className="text-xs text-cb-text-tertiary mb-1 uppercase tracking-wider">{stat.label}</div>
                    <div className={`font-mono font-semibold text-sm ${stat.colored ? (stat.positive ? "text-cb-green" : "text-cb-red") : "text-cb-text"}`}>
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* About */}
            <div className="bg-cb-bg-card border border-cb-border rounded-2xl p-6">
              <h3 className="font-bold text-cb-text mb-3">About {a.name}</h3>
              <p className="text-sm text-cb-text-secondary leading-relaxed">
                {a.name} ({a.symbol}) is a leading cryptocurrency operating on a decentralized network secured by cryptography and maintained by a global community.
                With a market cap of {formatMarketCap(a.marketCap)}, it ranks #{a.id} on Coinbase by trading volume and continues to see growing adoption across retail and institutional investors worldwide.
              </p>
              <button className="text-cb-blue text-sm font-medium mt-4 hover:underline flex items-center gap-1">
                Read more
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right: Trade widget */}
          <div className="space-y-4">
            <div className="bg-cb-bg-card border border-cb-border rounded-2xl p-6 sticky top-20">
              {/* Tabs */}
              <div className="flex border-b border-cb-border mb-5">
                {["buy", "sell", "convert"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`flex-1 pb-3 text-sm font-semibold capitalize transition-colors relative ${
                      tab === t ? "text-cb-text" : "text-cb-text-tertiary hover:text-cb-text-secondary"
                    }`}
                  >
                    {t}
                    {tab === t && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-cb-blue rounded-full"></div>}
                  </button>
                ))}
              </div>

              {/* Order type */}
              <div className="flex gap-2 mb-4">
                {["market", "limit"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setOrderType(type)}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg capitalize transition-colors ${
                      orderType === type
                        ? "bg-cb-blue text-white"
                        : "border border-cb-border text-cb-text-secondary hover:border-cb-blue/50"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Amount */}
              <div className="mb-4">
                <label className="text-xs text-cb-text-tertiary uppercase tracking-wider mb-1.5 block">Amount (USD)</label>
                <div className="flex items-center bg-cb-bg-raised border border-cb-border rounded-xl px-4 py-3 focus-within:border-cb-blue transition-colors">
                  <span className="text-cb-text-tertiary mr-2">$</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="flex-1 text-xl font-mono font-bold text-cb-text outline-none bg-transparent"
                  />
                </div>
                <div className="flex gap-1.5 mt-2">
                  {["25", "100", "500", "1000"].map((v) => (
                    <button
                      key={v}
                      onClick={() => setAmount(v)}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-lg font-mono transition-colors ${
                        amount === v ? "bg-cb-blue text-white" : "bg-cb-bg-raised border border-cb-border text-cb-text-tertiary hover:text-cb-text hover:border-cb-blue/50"
                      }`}
                    >
                      ${v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary */}
              {amount && parseFloat(amount) > 0 && (
                <div className="bg-cb-bg-raised border border-cb-border rounded-xl p-3.5 mb-4 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-cb-text-secondary">You receive</span>
                    <span className="font-mono font-bold text-cb-text">{cryptoAmount} {a.symbol}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-cb-text-tertiary">{a.name} price</span>
                    <span className="font-mono text-cb-text-secondary">{formatPrice(a.price)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-cb-text-tertiary">Coinbase fee</span>
                    <span className="font-mono text-cb-text-secondary">${fee}</span>
                  </div>
                  <div className="border-t border-cb-border pt-2 flex justify-between text-sm font-bold">
                    <span className="text-cb-text-secondary">Total</span>
                    <span className="font-mono text-cb-text">${(parseFloat(amount) + parseFloat(fee)).toFixed(2)}</span>
                  </div>
                </div>
              )}

              <button
                onClick={() => navigate("signup")}
                className="w-full py-3.5 bg-cb-blue text-white font-bold rounded-xl hover:bg-cb-blue-hover transition-colors text-sm capitalize"
              >
                {tab} {a.symbol}
              </button>
              <p className="text-xs text-cb-text-tertiary text-center mt-3">Sign in or create account to trade</p>
            </div>

            {/* Related */}
            <div className="bg-cb-bg-card border border-cb-border rounded-2xl p-5">
              <h4 className="font-semibold text-cb-text mb-3 text-sm">Popular assets</h4>
              <div className="space-y-1">
                {related.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => navigate("asset", r)}
                    className="flex items-center gap-3 w-full text-left hover:bg-cb-bg-raised rounded-xl p-2.5 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0" style={{ backgroundColor: r.color }}>
                      {r.symbol[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-cb-text">{r.name}</div>
                      <div className="text-xs text-cb-text-tertiary font-mono">{r.symbol}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-mono font-semibold text-cb-text">{formatPrice(r.price)}</div>
                      <div className={`text-xs font-mono font-semibold ${r.change >= 0 ? "text-cb-green" : "text-cb-red"}`}>
                        {r.change >= 0 ? "+" : ""}{r.change.toFixed(2)}%
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
