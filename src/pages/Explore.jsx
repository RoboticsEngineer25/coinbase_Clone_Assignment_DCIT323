import { useState } from "react";
import { cryptoData, formatPrice, formatMarketCap } from "../data/cryptoData";
import CryptoRow from "../components/crypto/CryptoRow";
import { useApp } from "../App";

export default function Explore() {
  const { watchlist } = useApp();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("marketCap");
  const [sortDir, setSortDir] = useState("desc");
  const [filter, setFilter] = useState("all");

  const filters = [
    { id: "all", label: "All assets" },
    { id: "gainers", label: "Top gainers" },
    { id: "losers", label: "Top losers" },
    { id: "watchlist", label: "Watchlist" },
  ];

  const filtered = cryptoData
    .filter((a) => {
      const q = search.toLowerCase();
      const match = a.name.toLowerCase().includes(q) || a.symbol.toLowerCase().includes(q);
      if (filter === "gainers") return match && a.change > 0;
      if (filter === "losers") return match && a.change < 0;
      if (filter === "watchlist") return match && watchlist.includes(a.symbol);
      return match;
    })
    .sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      return (a[sortBy] - b[sortBy]) * dir;
    });

  const handleSort = (field) => {
    if (sortBy === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortBy(field); setSortDir("desc"); }
  };

  const SortIcon = ({ field }) => (
    <span className="ml-1 text-cb-text-tertiary text-xs">
      {sortBy === field ? (sortDir === "asc" ? "↑" : "↓") : "↕"}
    </span>
  );

  const totalMktCap = cryptoData.reduce((s, a) => s + a.marketCap, 0);
  const totalVol = cryptoData.reduce((s, a) => s + a.volume, 0);

  return (
    <div className="bg-cb-bg min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-cb-text mb-1">Explore assets</h1>
          <p className="text-cb-text-secondary">Discover, research, and buy cryptocurrencies.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Global Market Cap", value: formatMarketCap(totalMktCap), change: "+1.2%", up: true },
            { label: "24h Volume", value: formatMarketCap(totalVol), change: "+4.5%", up: true },
            { label: "BTC Dominance", value: `${((cryptoData[0].marketCap / totalMktCap) * 100).toFixed(1)}%`, change: "-0.2%", up: false },
            { label: "Assets tracked", value: "500+", change: null },
          ].map((s) => (
            <div key={s.label} className="bg-cb-bg-card border border-cb-border rounded-xl p-4">
              <div className="text-xs text-cb-text-tertiary uppercase tracking-wider font-medium mb-2">{s.label}</div>
              <div className="font-bold text-cb-text text-lg font-mono">{s.value}</div>
              {s.change && (
                <div className={`text-xs font-semibold font-mono mt-1 ${s.up ? "text-cb-green" : "text-cb-red"}`}>{s.change}</div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cb-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search assets..."
              className="w-full pl-10 pr-10 py-2.5 bg-cb-bg-card border border-cb-border text-cb-text text-sm rounded-xl outline-none focus:border-cb-blue transition-colors placeholder:text-cb-text-tertiary"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-cb-text-tertiary hover:text-cb-text">
                ✕
              </button>
            )}
          </div>
          <div className="flex gap-2 flex-wrap">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${
                  filter === f.id
                    ? "bg-cb-blue text-white"
                    : "bg-cb-bg-card border border-cb-border text-cb-text-secondary hover:text-cb-text hover:border-cb-blue/50"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-cb-bg-card border border-cb-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-cb-border">
                  <th className="py-3.5 pl-4 w-10"></th>
                  <th className="py-3.5 text-left text-xs font-semibold text-cb-text-tertiary uppercase tracking-wider w-8">#</th>
                  <th className="py-3.5 text-left text-xs font-semibold text-cb-text-tertiary uppercase tracking-wider">Name</th>
                  <th className="py-3.5 text-right text-xs font-semibold text-cb-text-tertiary uppercase tracking-wider cursor-pointer hover:text-cb-text select-none" onClick={() => handleSort("price")}>
                    Price <SortIcon field="price" />
                  </th>
                  <th className="py-3.5 text-right text-xs font-semibold text-cb-text-tertiary uppercase tracking-wider px-4 cursor-pointer hover:text-cb-text select-none" onClick={() => handleSort("change")}>
                    24h <SortIcon field="change" />
                  </th>
                  <th className="py-3.5 text-right text-xs font-semibold text-cb-text-tertiary uppercase tracking-wider hidden lg:table-cell cursor-pointer hover:text-cb-text select-none" onClick={() => handleSort("marketCap")}>
                    Market Cap <SortIcon field="marketCap" />
                  </th>
                  <th className="py-3.5 text-left text-xs font-semibold text-cb-text-tertiary uppercase tracking-wider pl-4 hidden sm:table-cell">7D</th>
                  <th className="py-3.5 pr-4"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((asset, i) => (
                  <CryptoRow key={asset.id} asset={asset} rank={i + 1} showMarketCap />
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-20">
                <div className="text-4xl mb-4">🔍</div>
                <p className="font-semibold text-cb-text">No assets found</p>
                <p className="text-sm text-cb-text-tertiary mt-1">Try adjusting your search or filters</p>
                <button onClick={() => { setSearch(""); setFilter("all"); }} className="mt-4 text-sm text-cb-blue hover:underline font-medium">Clear filters</button>
              </div>
            )}
          </div>
        </div>
        {filtered.length > 0 && (
          <p className="text-xs text-cb-text-tertiary mt-3 text-right">Showing {filtered.length} of {cryptoData.length} assets</p>
        )}
      </div>
    </div>
  );
}
