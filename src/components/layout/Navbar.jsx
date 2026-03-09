import { useState } from "react";
import { useApp } from "../../App";

const CoinbaseLogo = () => (
  <svg width="113" height="22" viewBox="0 0 113 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="11" fill="#0052FF"/>
    <path d="M11 6C8.24 6 6 8.24 6 11C6 13.76 8.24 16 11 16C12.96 16 14.66 14.92 15.56 13.32H13.28C12.68 14.08 11.9 14.5 11 14.5C9.07 14.5 7.5 12.93 7.5 11C7.5 9.07 9.07 7.5 11 7.5C11.9 7.5 12.68 7.92 13.28 8.68H15.56C14.66 7.08 12.96 6 11 6Z" fill="white"/>
    <text x="28" y="16" fill="white" fontFamily="'DM Sans', system-ui" fontSize="15" fontWeight="700" letterSpacing="-0.3">Coinbase</text>
  </svg>
);

export default function Navbar() {
  const { navigate, currentPage, isSignedIn } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const products = [
    { label: "Buy & Sell", sub: "Trade 500+ assets", icon: "↕" },
    { label: "Coinbase One", sub: "Zero-fee trading subscription", icon: "★" },
    { label: "Advanced Trade", sub: "Pro charting & order types", icon: "◈" },
    { label: "Coinbase Wallet", sub: "Self-custody wallet", icon: "◎" },
    { label: "Coinbase Card", sub: "Spend crypto, earn rewards", icon: "▦" },
    { label: "Coinbase Prime", sub: "Institutional brokerage", icon: "◆" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-cb-border glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <button onClick={() => { navigate("home"); setMobileOpen(false); }} className="flex items-center gap-0 mr-8 flex-shrink-0">
            <CoinbaseLogo />
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0 flex-1">
            {/* Products dropdown */}
            <div className="relative" onMouseEnter={() => setProductsOpen(true)} onMouseLeave={() => setProductsOpen(false)}>
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-cb-text-secondary hover:text-cb-text transition-colors rounded-lg hover:bg-cb-bg-raised">
                Products
                <svg className={`w-3 h-3 transition-transform ${productsOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {productsOpen && (
                <div className="absolute top-full left-0 mt-1 w-72 bg-cb-bg-card border border-cb-border rounded-2xl shadow-2xl shadow-black/50 py-2 z-50">
                  {products.map((p) => (
                    <button key={p.label} onClick={() => navigate("explore")} className="flex items-start gap-3 w-full px-4 py-3 hover:bg-cb-bg-raised transition-colors text-left">
                      <span className="text-cb-text-tertiary text-lg mt-0.5 w-5 flex-shrink-0">{p.icon}</span>
                      <div>
                        <div className="text-sm font-semibold text-cb-text">{p.label}</div>
                        <div className="text-xs text-cb-text-secondary mt-0.5">{p.sub}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {[
              { label: "Explore", page: "explore" },
              { label: "Learn", page: "learn" },
            ].map((link) => (
              <button
                key={link.page}
                onClick={() => navigate(link.page)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentPage === link.page
                    ? "text-cb-text bg-cb-bg-raised"
                    : "text-cb-text-secondary hover:text-cb-text hover:bg-cb-bg-raised"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-2">
            {isSignedIn ? (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cb-blue flex items-center justify-center text-white text-xs font-bold">U</div>
                <button onClick={() => navigate("explore")} className="btn-primary text-xs px-4 py-2">
                  Trade
                </button>
              </div>
            ) : (
              <>
                <button onClick={() => navigate("signin")} className="px-4 py-2 text-sm font-medium text-cb-text-secondary hover:text-cb-text transition-colors rounded-lg hover:bg-cb-bg-raised">
                  Sign in
                </button>
                <button onClick={() => navigate("signup")} className="bg-cb-blue text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-cb-blue-hover transition-colors">
                  Get started
                </button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-cb-text-secondary hover:text-cb-text rounded-lg hover:bg-cb-bg-raised transition-colors">
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-cb-border bg-cb-bg px-4 py-4 space-y-1">
          {[
            { label: "Explore", page: "explore" },
            { label: "Learn", page: "learn" },
          ].map((link) => (
            <button
              key={link.page}
              onClick={() => { navigate(link.page); setMobileOpen(false); }}
              className="block w-full text-left px-4 py-3 text-sm font-medium text-cb-text-secondary hover:text-cb-text hover:bg-cb-bg-raised rounded-xl transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-cb-border space-y-2">
            <button onClick={() => { navigate("signin"); setMobileOpen(false); }} className="block w-full text-left px-4 py-3 text-sm font-medium text-cb-text-secondary hover:text-cb-text rounded-xl hover:bg-cb-bg-raised transition-colors">
              Sign in
            </button>
            <button onClick={() => { navigate("signup"); setMobileOpen(false); }} className="block w-full px-4 py-3 bg-cb-blue text-white text-sm font-semibold rounded-xl text-center">
              Get started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
