import { useState, createContext, useContext } from "react";
import WarningBanner from "./components/WarningBanner";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import AssetDetail from "./pages/AssetDetail";
import Learn from "./pages/Learn";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AccountSettings from "./pages/AccountSettings";

export const AppContext = createContext();

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [watchlist, setWatchlist] = useState(["BTC", "ETH", "SOL"]);

  const navigate = (page, data = null) => {
    setCurrentPage(page);
    if (data) setSelectedAsset(data);
    window.scrollTo(0, 0);
  };

  const toggleWatchlist = (symbol) => {
    setWatchlist((prev) =>
      prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]
    );
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":    return <Home />;
      case "explore": return <Explore />;
      case "asset":   return <AssetDetail asset={selectedAsset} />;
      case "learn":   return <Learn />;
      case "signin":  return <SignIn />;
      case "signup":  return <SignUp />;
      case "account": return <AccountSettings />;
      default:        return <Home />;
    }
  };

  return (
    <AppContext.Provider value={{ currentPage, navigate, isSignedIn, setIsSignedIn, watchlist, toggleWatchlist, selectedAsset }}>
      <div className="min-h-screen bg-cb-bg text-cb-text">
        <WarningBanner />
        <Navbar />
        <main>{renderPage()}<, "account"/main>
        {!["signin", "signup"].includes(currentPage) && <Footer />}
      </div>
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
