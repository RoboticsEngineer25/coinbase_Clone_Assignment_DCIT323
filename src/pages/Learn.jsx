import { useState } from "react";
import { useApp } from "../App";
import { learnArticles } from "../data/cryptoData";

const FAQS = [
  { q: "What is cryptocurrency?", a: "Cryptocurrency is a digital or virtual currency secured by cryptography, operating on decentralized blockchain networks rather than through governments or banks." },
  { q: "How do I buy crypto on Coinbase?", a: "Create and verify your Coinbase account, add a payment method, then navigate to any asset and complete your purchase. The process takes just minutes." },
  { q: "Is my money safe on Coinbase?", a: "Coinbase holds 98% of customer assets in offline cold storage. USD balances are FDIC-insured up to $250,000 per customer." },
  { q: "What is blockchain technology?", a: "A blockchain is a distributed ledger that records transactions across a network of computers. Data is stored in linked blocks, making it extremely difficult to alter historical records." },
  { q: "What fees does Coinbase charge?", a: "Coinbase charges approximately 0.5-1.5% depending on transaction size and payment method. Coinbase One subscribers enjoy zero trading fees." },
];

export default function Learn() {
  const { navigate } = useApp();
  const [activeCategory, setActiveCategory] = useState("All");
  const [openFaq, setOpenFaq] = useState(null);

  const categories = ["All", "Crypto Basics", "Bitcoin", "Ethereum", "DeFi", "NFTs", "Web3"];
  const filtered = activeCategory === "All" ? learnArticles : learnArticles.filter((a) => a.category === activeCategory);
  const totalRewards = learnArticles.reduce((s, a) => s + parseInt(a.reward), 0);

  return (
    <div className="bg-cb-bg min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 border border-cb-green/30 bg-cb-green-dim text-cb-green text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            🎁 Earn free crypto while you learn
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-cb-text mb-4 tracking-tight">Learn & Earn</h1>
          <p className="text-lg text-cb-text-secondary max-w-xl mx-auto leading-relaxed">
            Explore blockchain technology with educational content and earn real crypto rewards deposited to your account.
          </p>
        </div>

        {/* Rewards banner */}
        <div className="bg-cb-bg-card border border-cb-border rounded-2xl p-8 mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cb-blue opacity-5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-cb-text mb-1">Your learning rewards</h3>
              <p className="text-cb-text-secondary text-sm">Complete lessons to earn free crypto. No prior experience needed.</p>
              <div className="flex items-center gap-2 mt-4 flex-wrap">
                {learnArticles.map((a) => (
                  <div key={a.id} className="text-xs font-semibold font-mono text-cb-green bg-cb-green-dim border border-cb-green/20 px-2 py-1 rounded-lg">
                    {a.reward}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-10 flex-shrink-0">
              <div className="text-center">
                <div className="text-4xl font-mono font-black text-cb-text">$0</div>
                <div className="text-cb-text-tertiary text-xs mt-1">Earned</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-mono font-black text-cb-green">${totalRewards}</div>
                <div className="text-cb-text-tertiary text-xs mt-1">Available</div>
              </div>
            </div>
            <button onClick={() => navigate("signup")} className="flex-shrink-0 px-6 py-3 bg-cb-blue text-white font-bold text-sm rounded-xl hover:bg-cb-blue-hover transition-colors">
              Start earning
            </button>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-sm font-semibold rounded-xl whitespace-nowrap transition-all flex-shrink-0 ${
                activeCategory === cat
                  ? "bg-cb-blue text-white"
                  : "bg-cb-bg-card border border-cb-border text-cb-text-secondary hover:text-cb-text hover:border-cb-blue/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {filtered.map((article) => (
            <div
              key={article.id}
              onClick={() => navigate("signup")}
              className="bg-cb-bg-card border border-cb-border rounded-2xl overflow-hidden hover:border-cb-blue transition-all cursor-pointer group"
            >
              <div className="h-40 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-cb-bg-raised to-cb-bg-hover">
                <div className="text-6xl group-hover:scale-110 transition-transform">{article.image}</div>
                <div className="absolute top-3 right-3">
                  <div className="text-xs font-bold font-mono text-cb-green bg-cb-green-dim border border-cb-green/20 px-2.5 py-1 rounded-full">
                    +{article.reward}
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-cb-blue bg-cb-blue/10 border border-cb-blue/20 px-2.5 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-xs text-cb-text-tertiary flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {article.readTime}
                  </span>
                </div>
                <h3 className="font-bold text-cb-text mb-2 group-hover:text-cb-blue transition-colors">{article.title}</h3>
                <p className="text-sm text-cb-text-secondary leading-relaxed mb-4">{article.description}</p>
                <div className="flex items-center justify-between border-t border-cb-border pt-4">
                  <span className="text-xs font-semibold text-cb-green">Earn {article.reward} 🎁</span>
                  <span className="text-xs font-semibold text-cb-blue flex items-center gap-1">
                    Start
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-cb-text text-center mb-2">Frequently asked questions</h2>
          <p className="text-cb-text-tertiary text-center text-sm mb-8">Everything you need to know about crypto and Coinbase</p>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-cb-bg-card border border-cb-border rounded-xl overflow-hidden">
                <button
                  className="flex items-center justify-between w-full px-5 py-4 text-left font-semibold text-cb-text hover:bg-cb-bg-raised transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-sm">{faq.q}</span>
                  <svg className={`w-4 h-4 text-cb-text-tertiary transition-transform flex-shrink-0 ml-4 ${openFaq === i ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-cb-text-secondary leading-relaxed border-t border-cb-border pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
