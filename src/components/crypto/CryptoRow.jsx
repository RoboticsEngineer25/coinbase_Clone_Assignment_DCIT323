import { useApp } from "../../App";
import Sparkline from "./Sparkline";
import { formatPrice, formatMarketCap } from "../../data/cryptoData";

export default function CryptoRow({ asset, rank, showMarketCap = false }) {
  const { navigate, watchlist, toggleWatchlist } = useApp();
  const isPositive = asset.change >= 0;
  const isWatched = watchlist.includes(asset.symbol);

  return (
    <tr
      className="border-b border-cb-border hover:bg-cb-bg-raised transition-colors cursor-pointer group"
      onClick={() => navigate("asset", asset)}
    >
      {/* Star */}
      <td className="py-4 pl-4 w-10">
        <button
          onClick={(e) => { e.stopPropagation(); toggleWatchlist(asset.symbol); }}
          className="text-cb-text-tertiary hover:text-yellow-400 transition-colors"
        >
          <svg className={`w-4 h-4 ${isWatched ? "fill-yellow-400 text-yellow-400" : ""}`} fill={isWatched ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </button>
      </td>

      {/* Rank */}
      {rank !== undefined && (
        <td className="py-4 text-sm text-cb-text-tertiary font-mono w-8">{rank}</td>
      )}

      {/* Asset name */}
      <td className="py-4 pr-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow-md" style={{ backgroundColor: asset.color }}>
            {asset.symbol[0]}
          </div>
          <div>
            <div className="text-sm font-semibold text-cb-text">{asset.name}</div>
            <div className="text-xs text-cb-text-tertiary font-mono">{asset.symbol}</div>
          </div>
        </div>
      </td>

      {/* Price */}
      <td className="py-4 text-sm font-mono font-semibold text-cb-text text-right">
        {formatPrice(asset.price)}
      </td>

      {/* 24h change */}
      <td className="py-4 text-right px-4">
        <span className={`text-xs font-semibold font-mono px-2 py-1 rounded-md ${
          isPositive ? "text-cb-green bg-cb-green-dim" : "text-cb-red bg-cb-red-dim"
        }`}>
          {isPositive ? "+" : ""}{asset.change.toFixed(2)}%
        </span>
      </td>

      {/* Market cap */}
      {showMarketCap && (
        <td className="py-4 text-sm text-cb-text-secondary text-right font-mono hidden lg:table-cell">
          {formatMarketCap(asset.marketCap)}
        </td>
      )}

      {/* Sparkline */}
      <td className="py-4 pl-4 hidden sm:table-cell">
        <Sparkline data={asset.sparkline} positive={isPositive} />
      </td>

      {/* Buy CTA */}
      <td className="py-4 pl-6 pr-4">
        <button
          onClick={(e) => { e.stopPropagation(); navigate("asset", asset); }}
          className="px-3 py-1.5 bg-cb-blue text-white text-xs font-semibold rounded-lg hover:bg-cb-blue-hover transition-colors opacity-0 group-hover:opacity-100"
        >
          Buy
        </button>
      </td>
    </tr>
  );
}
