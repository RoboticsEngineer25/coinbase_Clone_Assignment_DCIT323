import { useApp } from "../../App";

const SECTIONS = [
  { title: "Products",  links: ["Buy & Sell", "Stocks", "Futures & Perps", "Prediction Markets", "Coinbase One", "Coinbase Card"] },
  { title: "Base",      links: ["Base Network", "Base App", "Onchain Summer", "Developer Docs", "Base Bridge", "Base Explorer"] },
  { title: "Company",   links: ["About", "Careers", "Blog", "Press", "Investors", "Legal"] },
  { title: "Support",   links: ["Help Center", "Contact Us", "ID Verification", "Privacy Policy", "Status", "Cookie Policy"] },
];

export default function Footer() {
  const { navigate } = useApp();
  return (
    <footer className="bg-cb-bg-card border-t border-cb-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <button onClick={() => navigate("home")} className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-cb-blue rounded-full flex items-center justify-center">
                <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none">
                  <path d="M16 6C10.477 6 6 10.477 6 16C6 21.523 10.477 26 16 26C19.84 26 23.187 23.893 25.012 20.75H20.5C19.24 22.007 17.71 22.75 16 22.75C12.272 22.75 9.25 19.728 9.25 16C9.25 12.272 12.272 9.25 16 9.25C17.71 9.25 19.24 9.993 20.5 11.25H25.012C23.187 8.107 19.84 6 16 6Z" fill="white"/>
                </svg>
              </div>
              <span className="text-lg font-bold text-white">Coinbase</span>
            </button>
            <p className="text-sm text-cb-text-secondary leading-relaxed mb-5 max-w-xs">
              The most trusted platform for digital finance. Trade crypto, stocks, and more.
            </p>
            <div className="flex gap-2">
              {["𝕏", "f", "in", "▶"].map((icon, i) => (
                <div key={i} className="w-8 h-8 bg-cb-bg-raised border border-cb-border rounded-lg flex items-center justify-center cursor-pointer hover:border-cb-blue/40 transition-colors">
                  <span className="text-cb-text-secondary text-xs font-bold">{icon}</span>
                </div>
              ))}
            </div>
          </div>

          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h4 className="text-sm font-bold text-white mb-4">{s.title}</h4>
              <ul className="space-y-2.5">
                {s.links.map((l) => (
                  <li key={l}>
                    <span className="text-sm text-cb-text-secondary hover:text-white cursor-pointer transition-colors">{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* App badges */}
        <div className="border-t border-cb-border pt-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-sm font-semibold text-white mb-3">Get the Coinbase app</p>
              <div className="flex gap-3">
                {[{ os: "🍎", store: "App Store", sub: "Download on the" }, { os: "▶", store: "Google Play", sub: "Get it on" }].map((a) => (
                  <div key={a.store} className="flex items-center gap-2.5 bg-cb-bg-raised border border-cb-border rounded-xl px-4 py-2.5 cursor-pointer hover:border-cb-blue/40 transition-colors">
                    <span className="text-xl">{a.os}</span>
                    <div>
                      <div className="text-[10px] text-cb-text-tertiary">{a.sub}</div>
                      <div className="text-sm font-bold text-white">{a.store}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              {["🔐 FDIC Insured", "🛡️ Cold Storage", "✅ Nasdaq Listed"].map((b) => (
                <span key={b} className="text-xs text-cb-text-tertiary">{b}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-cb-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cb-text-tertiary">© 2026 Coinbase, Inc. All rights reserved.</p>
          <div className="flex gap-5">
            {["Privacy", "Terms", "Cookies", "Accessibility"].map((l) => (
              <span key={l} className="text-xs text-cb-text-tertiary hover:text-white cursor-pointer transition-colors">{l}</span>
            ))}
          </div>
        </div>
        <p className="mt-6 text-xs text-cb-text-tertiary leading-relaxed">
          Crypto is risky. Prices can go up or down. Not investment advice. Stock trading subject to regulatory approval. 
          This is an educational clone — not the real Coinbase. Not affiliated with Coinbase Global, Inc.
        </p>
      </div>
    </footer>
  );
}
