import { useState } from "react";
import { useApp } from "../App";
import { cryptoData, formatPrice, formatMarketCap } from "../data/cryptoData";
import CryptoRow from "../components/crypto/CryptoRow";

const TICKER_DATA = [...cryptoData, ...cryptoData];

// Coinbase 2026: dark bg, bold type, CDS-style minimalism
export default function Home() {
  const { navigate } = useApp();
  const [buyAmount, setBuyAmount] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(cryptoData[0]);
  const [activeTab, setActiveTab] = useState("buy");

  const cryptoAmt = buyAmount ? (parseFloat(buyAmount) / selectedAsset.price).toFixed(6) : "";
  const fee = buyAmount ? (parseFloat(buyAmount) * 0.015).toFixed(2) : "0.00";

  return (
    <div className="bg-cb-bg min-h-screen pt-14">

      {/* Ticker */}
      <div className="border-b border-cb-border overflow-hidden bg-cb-bg-card">
        <div className="animate-ticker py-2 text-xs flex">
          {TICKER_DATA.map((asset, i) => (
            <span key={i} className="inline-flex items-center gap-2 mx-6 flex-shrink-0">
              <span className="font-semibold text-cb-text font-mono">{asset.symbol}</span>
              <span className="text-cb-text-secondary font-mono">{formatPrice(asset.price)}</span>
              <span className={`font-mono font-semibold ${asset.change >= 0 ? "text-cb-green" : "text-cb-red"}`}>
                {asset.change >= 0 ? "+" : ""}{asset.change.toFixed(2)}%
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Grid bg */}
        <div className="absolute inset-0 grid-overlay opacity-100 pointer-events-none"></div>
        {/* Blue glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cb-blue rounded-full opacity-[0.04] blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left copy */}
            <div className="max-w-xl">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 border border-cb-border bg-cb-bg-card text-cb-text-secondary text-xs font-medium px-3 py-1.5 rounded-full mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-cb-green animate-pulse"></span>
                Markets open · 500+ assets trading
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-cb-text leading-[1.08] tracking-tight mb-6">
                The platform
                <br />
                <span className="text-gradient-blue">built for crypto.</span>
              </h1>

              <p className="text-lg text-cb-text-secondary leading-relaxed mb-10 max-w-md">
                Buy, sell, and manage crypto with confidence. Start with $1 on the most regulated and trusted exchange in the US.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-14">
                <button onClick={() => navigate("signup")} className="px-6 py-3.5 bg-cb-blue text-white font-semibold rounded-xl hover:bg-cb-blue-hover transition-colors text-sm glow-blue">
                  Create free account
                </button>
                <button onClick={() => navigate("explore")} className="px-6 py-3.5 bg-cb-bg-raised border border-cb-border text-cb-text font-semibold rounded-xl hover:bg-cb-bg-hover transition-colors text-sm">
                  View live prices
                </button>
              </div>

              {/* Stats row */}
              <div className="flex items-center gap-8 pt-8 border-t border-cb-border">
                {[
                  { v: "100M+", l: "Verified users" },
                  { v: "$580B+", l: "Trading volume" },
                  { v: "100+", l: "Countries" },
                  { v: "13y", l: "In operation" },
                ].map((s) => (
                  <div key={s.v}>
                    <div className="text-xl font-bold text-cb-text font-mono">{s.v}</div>
                    <div className="text-xs text-cb-text-tertiary mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Buy widget */}
            <div>
              <div className="bg-cb-bg-card border border-cb-border rounded-2xl p-6 shadow-2xl shadow-black/50">
                {/* Tabs */}
                <div className="flex border-b border-cb-border mb-6">
                  {["buy", "sell", "convert"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 pb-3 text-sm font-semibold capitalize transition-colors relative ${
                        activeTab === tab
                          ? "text-cb-text"
                          : "text-cb-text-tertiary hover:text-cb-text-secondary"
                      }`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-cb-blue rounded-full"></div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Amount */}
                <div className="mb-4">
                  <label className="text-xs text-cb-text-tertiary uppercase tracking-wider font-medium mb-2 block">Spend</label>
                  <div className="flex items-center bg-cb-bg-raised border border-cb-border rounded-xl px-4 py-4 focus-within:border-cb-blue transition-colors">
                    <span className="text-cb-text-tertiary text-xl mr-2">$</span>
                    <input
                      type="number"
                      value={buyAmount}
                      onChange={(e) => setBuyAmount(e.target.value)}
                      placeholder="0.00"
                      className="flex-1 text-3xl font-bold text-cb-text outline-none bg-transparent font-mono"
                    />
                    <span className="text-xs text-cb-text-tertiary font-medium bg-cb-bg-hover px-2 py-1 rounded-lg">USD</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {["25", "100", "250", "1000"].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setBuyAmount(amt)}
                        className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors font-mono ${
                          buyAmount === amt
                            ? "bg-cb-blue text-white"
                            : "bg-cb-bg-raised border border-cb-border text-cb-text-secondary hover:text-cb-text hover:border-cb-blue"
                        }`}
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Asset selector */}
                <div className="mb-5">
                  <label className="text-xs text-cb-text-tertiary uppercase tracking-wider font-medium mb-2 block">Receive</label>
                  <div className="flex gap-2 flex-wrap">
                    {cryptoData.slice(0, 5).map((asset) => (
                      <button
                        key={asset.symbol}
                        onClick={() => setSelectedAsset(asset)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                          selectedAsset.symbol === asset.symbol
                            ? "border-cb-blue bg-cb-blue/10 text-cb-text"
                            : "border-cb-border bg-cb-bg-raised text-cb-text-secondary hover:border-cb-blue/50 hover:text-cb-text"
                        }`}
                      >
                        <div className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[8px] font-black" style={{ backgroundColor: asset.color }}>
                          {asset.symbol[0]}
                        </div>
                        {asset.symbol}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Order summary */}
                {buyAmount && parseFloat(buyAmount) > 0 && (
                  <div className="bg-cb-bg-raised border border-cb-border rounded-xl p-4 mb-4 space-y-2.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-cb-text-secondary">You receive</span>
                      <span className="font-mono font-semibold text-cb-text">{cryptoAmt} {selectedAsset.symbol}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-cb-text-tertiary">{selectedAsset.name} price</span>
                      <span className="font-mono text-cb-text-secondary">{formatPrice(selectedAsset.price)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-cb-text-tertiary">Coinbase fee</span>
                      <span className="font-mono text-cb-text-secondary">${fee}</span>
                    </div>
                    <div className="border-t border-cb-border pt-2.5 flex justify-between text-sm">
                      <span className="font-semibold text-cb-text">Total</span>
                      <span className="font-mono font-bold text-cb-text">${(parseFloat(buyAmount) + parseFloat(fee)).toFixed(2)}</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => navigate("signup")}
                  className="w-full py-4 bg-cb-blue text-white font-bold rounded-xl hover:bg-cb-blue-hover transition-colors text-sm capitalize"
                >
                  {activeTab === "buy" ? `Buy ${selectedAsset.symbol}` : activeTab === "sell" ? `Sell ${selectedAsset.symbol}` : "Convert"}
                </button>

                <p className="text-xs text-cb-text-tertiary text-center mt-3">
                  New to Coinbase?{" "}
                  <button onClick={() => navigate("signup")} className="text-cb-blue hover:underline">
                    Create a free account
                  </button>
                </p>
              </div>

              {/* Trust indicators */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { icon: "🏦", label: "FDIC Insured" },
                  { icon: "🔒", label: "Cold Storage" },
                  { icon: "⚖️", label: "FINRA Member" },
                ].map((t) => (
                  <div key={t.label} className="flex items-center gap-2 bg-cb-bg-card border border-cb-border rounded-xl px-3 py-2.5">
                    <span className="text-sm">{t.icon}</span>
                    <span className="text-xs text-cb-text-secondary font-medium">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live prices table */}
      <section className="py-16 px-4 border-t border-cb-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-cb-text">Today's prices</h2>
              <p className="text-sm text-cb-text-tertiary mt-0.5">Buy crypto starting at $1</p>
            </div>
            <button onClick={() => navigate("explore")} className="flex items-center gap-1 text-sm text-cb-blue hover:text-cb-text font-medium transition-colors">
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="bg-cb-bg-card border border-cb-border rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-cb-border">
                  <th className="py-3 pl-4 w-10"></th>
                  <th className="py-3 text-left text-xs font-semibold text-cb-text-tertiary uppercase tracking-wider">Name</th>
                  <th className="py-3 text-right text-xs font-semibold text-cb-text-tertiary uppercase tracking-wider">Price</th>
                  <th className="py-3 text-right text-xs font-semibold text-cb-text-tertiary uppercase tracking-wider px-4">24h</th>
                  <th className="py-3 text-left text-xs font-semibold text-cb-text-tertiary uppercase tracking-wider pl-4 hidden sm:table-cell">7D Chart</th>
                  <th className="py-3 pr-4"></th>
                </tr>
              </thead>
              <tbody>
                {cryptoData.slice(0, 6).map((asset) => (
                  <CryptoRow key={asset.id} asset={asset} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Features — CDS card grid style */}
      <section className="py-16 px-4 border-t border-cb-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Big feature card */}
            <div className="bg-cb-bg-card border border-cb-border rounded-2xl p-8 flex flex-col justify-between min-h-[280px] relative overflow-hidden group hover:border-cb-blue transition-colors">
              <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-cb-blue opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity"></div>
              <div>
                <div className="w-10 h-10 bg-cb-blue/10 border border-cb-blue/20 rounded-xl flex items-center justify-center mb-4 text-cb-blue text-xl">★</div>
                <h3 className="text-xl font-bold text-cb-text mb-2">Coinbase One</h3>
                <p className="text-cb-text-secondary text-sm leading-relaxed">
                  Zero trading fees, boosted rewards, and priority support. Subscribe once and trade as much as you want without paying fees.
                </p>
              </div>
              <button onClick={() => navigate("signup")} className="self-start mt-6 px-5 py-2.5 bg-cb-blue text-white text-sm font-semibold rounded-xl hover:bg-cb-blue-hover transition-colors">
                Learn more →
              </button>
            </div>

            {/* Right column — 2 small cards */}
            <div className="flex flex-col gap-4">
              {[
                {
                  icon: "💳",
                  title: "Coinbase Card",
                  desc: "Spend crypto anywhere Visa is accepted and earn up to 4% back in crypto rewards on every purchase.",
                  badge: "4% back",
                },
                {
                  icon: "◎",
                  title: "Coinbase Wallet",
                  desc: "Your keys, your crypto. Self-custody wallet for DeFi, NFTs, and 100,000+ token support across all chains.",
                  badge: "Self-custody",
                },
              ].map((f) => (
                <div key={f.title} className="bg-cb-bg-card border border-cb-border rounded-2xl p-6 flex gap-5 group hover:border-cb-blue transition-colors">
                  <div className="text-2xl flex-shrink-0">{f.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <h3 className="font-bold text-cb-text">{f.title}</h3>
                      <span className="text-xs text-cb-blue bg-cb-blue/10 border border-cb-blue/20 px-2 py-0.5 rounded-full font-medium">{f.badge}</span>
                    </div>
                    <p className="text-sm text-cb-text-secondary leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom row of feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {[
              { icon: "🔐", title: "Secure by design", desc: "98% of assets in cold storage, FDIC-insured USD balances up to $250K, and advanced account protection.", badge: null },
              { icon: "📈", title: "Advanced Trade", desc: "Professional charts, multiple order types, and real-time market data. Same low fees on any device.", badge: "Pro" },
              { icon: "🎓", title: "Learning rewards", desc: "Watch short videos, answer quiz questions, and earn free crypto deposited directly to your account.", badge: "Earn crypto" },
            ].map((f) => (
              <div key={f.title} className="bg-cb-bg-card border border-cb-border rounded-2xl p-6 group hover:border-cb-blue transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-2xl">{f.icon}</div>
                  {f.badge && <span className="text-xs text-cb-green bg-cb-green-dim px-2 py-0.5 rounded-full font-medium">{f.badge}</span>}
                </div>
                <h3 className="font-bold text-cb-text mb-2">{f.title}</h3>
                <p className="text-sm text-cb-text-secondary leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learn & Earn CTA */}
      <section className="py-16 px-4 border-t border-cb-border">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-cb-blue via-blue-600 to-blue-800 rounded-2xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/20 text-white/90 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                  🎁 Limited availability
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">Earn free crypto</h2>
                <p className="text-blue-100 text-base max-w-lg">
                  Learn about blockchain technology and earn real cryptocurrency rewards, deposited straight into your Coinbase account.
                </p>
                <div className="flex gap-3 mt-5">
                  {cryptoData.slice(0, 4).map((asset) => (
                    <div key={asset.symbol} className="flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-2.5 py-1">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: asset.color }}></div>
                      <span className="text-white text-xs font-semibold font-mono">{asset.symbol}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => navigate("learn")} className="flex-shrink-0 px-7 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors text-sm shadow-xl">
                Start learning →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 border-t border-cb-border">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-cb-text mb-4 tracking-tight">
            The world's most trusted <br />
            <span className="text-gradient-blue">crypto platform.</span>
          </h2>
          <p className="text-cb-text-secondary mb-10 text-lg leading-relaxed">
            Join over 100 million people who trust Coinbase to buy, sell, and manage their crypto.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => navigate("signup")} className="px-8 py-4 bg-cb-blue text-white font-bold rounded-xl hover:bg-cb-blue-hover transition-colors text-sm glow-blue">
              Create free account
            </button>
            <button onClick={() => navigate("explore")} className="px-8 py-4 bg-cb-bg-raised border border-cb-border text-cb-text font-semibold rounded-xl hover:bg-cb-bg-hover transition-colors text-sm">
              Explore assets
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
