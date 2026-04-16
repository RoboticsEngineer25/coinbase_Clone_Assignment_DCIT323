import { useState } from "react";
import { useApp } from "../App";

export default function SignIn() {
  const { navigate, setIsSignedIn } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) { setError("Please fill in all fields."); return; }
    if (!email.includes("@")) { setError("Please enter a valid email."); return; }
    setLoading(true);
    setError("");
    setTimeout(() => { setIsSignedIn(true); navigate("home"); }, 1200);
  };

  return (
    <div className="min-h-screen bg-cb-bg flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-cb-border">
        <button onClick={() => navigate("home")} className="flex items-center gap-2 group">
          <div className="w-7 h-7 bg-cb-blue rounded-full flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M8 3C5.24 3 3 5.24 3 8C3 10.76 5.24 13 8 13C9.96 13 11.66 11.92 12.56 10.32H10.28C9.68 11.08 8.9 11.5 8 11.5C6.07 11.5 4.5 9.93 4.5 8C4.5 6.07 6.07 4.5 8 4.5C8.9 4.5 9.68 4.92 10.28 5.68H12.56C11.66 4.08 9.96 3 8 3Z" fill="white"/>
            </svg>
          </div>
          <span className="font-bold text-cb-text text-base tracking-tight">Crypto App</span>
        </button>
        <button onClick={() => navigate("signup")} className="text-sm text-cb-text-secondary hover:text-cb-text transition-colors">
          No account? <span className="text-cb-blue font-semibold">Sign up</span>
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-cb-blue rounded-xl flex items-center justify-center mx-auto mb-5 shadow-lg glow-blue">
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                <path d="M8 3C5.24 3 3 5.24 3 8C3 10.76 5.24 13 8 13C9.96 13 11.66 11.92 12.56 10.32H10.28C9.68 11.08 8.9 11.5 8 11.5C6.07 11.5 4.5 9.93 4.5 8C4.5 6.07 6.07 4.5 8 4.5C8.9 4.5 9.68 4.92 10.28 5.68H12.56C11.66 4.08 9.96 3 8 3Z" fill="white"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-cb-text mb-1">Welcome back</h1>
            <p className="text-sm text-cb-text-secondary">Sign in to your account</p>
          </div>

          <div className="mb-6 p-3.5 bg-orange-500/10 border border-orange-500/30 rounded-xl text-sm text-orange-400 flex items-center gap-2">
            <span className="text-lg flex-shrink-0">📌</span>
            <span className="font-semibold">Demo app – do not use your real password</span>
          </div>

          {error && (
            <div className="mb-5 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-sm text-red-400 flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-cb-text-secondary mb-1.5 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-cb-bg-card border border-cb-border rounded-xl px-4 py-3 text-sm text-cb-text outline-none focus:border-cb-blue transition-colors placeholder:text-cb-text-tertiary"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-semibold text-cb-text-secondary">Password</label>
                <button type="button" className="text-xs text-cb-blue hover:underline font-medium">Forgot password?</button>
              </div>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-cb-bg-card border border-cb-border rounded-xl px-4 py-3 text-sm text-cb-text outline-none focus:border-cb-blue transition-colors placeholder:text-cb-text-tertiary pr-16"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-cb-text-tertiary hover:text-cb-text font-semibold">
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-cb-blue text-white font-bold rounded-xl hover:bg-cb-blue-hover transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </span>
              ) : "Sign in"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-cb-border"></div>
            <span className="text-xs text-cb-text-tertiary font-medium">or</span>
            <div className="flex-1 h-px bg-cb-border"></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "Google", initial: "G", color: "text-red-400" },
              { name: "Apple", initial: "🍎", color: "text-cb-text" },
            ].map((p) => (
              <button key={p.name} className="flex items-center justify-center gap-2 py-3 bg-cb-bg-card border border-cb-border rounded-xl text-sm font-semibold text-cb-text-secondary hover:text-cb-text hover:border-cb-blue/50 transition-all">
                <span className={`font-black ${p.color}`}>{p.initial}</span>
                {p.name}
              </button>
            ))}
          </div>

          <p className="text-xs text-cb-text-tertiary text-center mt-8">
            By continuing you agree to our{" "}
            <span className="text-cb-blue cursor-pointer hover:underline">Terms</span> and{" "}
            <span className="text-cb-blue cursor-pointer hover:underline">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
