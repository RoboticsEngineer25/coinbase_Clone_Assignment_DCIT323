import { useState } from "react";
import { useApp } from "../App";

const pwStrength = (pw) => {
  if (!pw) return { level: 0, label: "", color: "" };
  let s = 0;
  if (pw.length >= 8) s++;
  if (pw.length >= 12) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  if (s <= 1) return { level: 1, label: "Weak", color: "bg-cb-red" };
  if (s <= 2) return { level: 2, label: "Fair", color: "bg-yellow-400" };
  if (s <= 3) return { level: 3, label: "Good", color: "bg-cb-blue" };
  return { level: 4, label: "Strong", color: "bg-cb-green" };
};

export default function SignUp() {
  const { navigate, setIsSignedIn } = useApp();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", agreed: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
  const strength = pwStrength(form.password);

  const handleNext = (e) => {
    e.preventDefault();
    setError("");
    if (step === 1) {
      if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim()) { setError("Please fill in all fields."); return; }
      if (!form.email.includes("@")) { setError("Please enter a valid email."); return; }
      setStep(2);
    } else {
      if (!form.password) { setError("Please create a password."); return; }
      if (form.password.length < 8) { setError("Password must be at least 8 characters."); return; }
      if (!form.agreed) { setError("Please agree to the User Agreement and Privacy Policy."); return; }
      setLoading(true);
      setTimeout(() => { setIsSignedIn(true); navigate("home"); }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-cb-bg flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-cb-border">
        <button onClick={() => navigate("home")} className="flex items-center gap-2">
          <div className="w-7 h-7 bg-cb-blue rounded-full flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M8 3C5.24 3 3 5.24 3 8C3 10.76 5.24 13 8 13C9.96 13 11.66 11.92 12.56 10.32H10.28C9.68 11.08 8.9 11.5 8 11.5C6.07 11.5 4.5 9.93 4.5 8C4.5 6.07 6.07 4.5 8 4.5C8.9 4.5 9.68 4.92 10.28 5.68H12.56C11.66 4.08 9.96 3 8 3Z" fill="white"/>
            </svg>
          </div>
          <span className="font-bold text-cb-text text-base tracking-tight">Coinbase</span>
        </button>
        <button onClick={() => navigate("signin")} className="text-sm text-cb-text-secondary hover:text-cb-text transition-colors">
          Have account? <span className="text-cb-blue font-semibold">Sign in</span>
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
                  step > s ? "bg-cb-green text-white" : step === s ? "bg-cb-blue text-white" : "bg-cb-bg-raised border border-cb-border text-cb-text-tertiary"
                }`}>
                  {step > s ? (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : s}
                </div>
                {s < 2 && <div className={`flex-1 h-px transition-colors ${step > s ? "bg-cb-blue" : "bg-cb-border"}`}></div>}
              </div>
            ))}
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-cb-text mb-1">
              {step === 1 ? "Create your account" : "Secure your account"}
            </h1>
            <p className="text-sm text-cb-text-secondary">
              {step === 1 ? "Start your crypto journey today — it's free" : `Almost there, ${form.firstName || "there"}!`}
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-sm text-red-400 flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleNext} className="space-y-4">
            {step === 1 ? (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-cb-text-secondary mb-1.5 block uppercase tracking-wider">First name</label>
                    <input type="text" value={form.firstName} onChange={(e) => set("firstName", e.target.value)} placeholder="First" className="w-full bg-cb-bg-card border border-cb-border rounded-xl px-4 py-3 text-sm text-cb-text outline-none focus:border-cb-blue transition-colors placeholder:text-cb-text-tertiary" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-cb-text-secondary mb-1.5 block uppercase tracking-wider">Last name</label>
                    <input type="text" value={form.lastName} onChange={(e) => set("lastName", e.target.value)} placeholder="Last" className="w-full bg-cb-bg-card border border-cb-border rounded-xl px-4 py-3 text-sm text-cb-text outline-none focus:border-cb-blue transition-colors placeholder:text-cb-text-tertiary" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-cb-text-secondary mb-1.5 block uppercase tracking-wider">Email address</label>
                  <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" className="w-full bg-cb-bg-card border border-cb-border rounded-xl px-4 py-3 text-sm text-cb-text outline-none focus:border-cb-blue transition-colors placeholder:text-cb-text-tertiary" />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="text-xs font-semibold text-cb-text-secondary mb-1.5 block uppercase tracking-wider">Create password</label>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => set("password", e.target.value)}
                      placeholder="Min. 8 characters"
                      className="w-full bg-cb-bg-card border border-cb-border rounded-xl px-4 py-3 text-sm text-cb-text outline-none focus:border-cb-blue transition-colors placeholder:text-cb-text-tertiary pr-16"
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-cb-text-tertiary hover:text-cb-text font-semibold">
                      {showPass ? "Hide" : "Show"}
                    </button>
                  </div>
                  {form.password && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4].map((l) => (
                          <div key={l} className={`flex-1 h-1 rounded-full transition-all ${l <= strength.level ? strength.color : "bg-cb-bg-raised border border-cb-border"}`} />
                        ))}
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-cb-text-tertiary">Password strength</span>
                        <span className={`text-xs font-semibold ${strength.level >= 4 ? "text-cb-green" : strength.level >= 3 ? "text-cb-blue" : strength.level >= 2 ? "text-yellow-400" : "text-cb-red"}`}>{strength.label}</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-start gap-3 bg-cb-bg-raised border border-cb-border rounded-xl p-4">
                  <input type="checkbox" id="agreed" checked={form.agreed} onChange={(e) => set("agreed", e.target.checked)} className="mt-0.5 w-4 h-4 accent-cb-blue flex-shrink-0" />
                  <label htmlFor="agreed" className="text-xs text-cb-text-secondary leading-relaxed cursor-pointer">
                    I agree to Coinbase's <span className="text-cb-blue hover:underline cursor-pointer">User Agreement</span> and <span className="text-cb-blue hover:underline cursor-pointer">Privacy Policy</span>. I confirm I am 18 years of age or older.
                  </label>
                </div>
              </>
            )}

            <button type="submit" disabled={loading} className="w-full py-3.5 bg-cb-blue text-white font-bold rounded-xl hover:bg-cb-blue-hover transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating account...
                </span>
              ) : step === 1 ? "Continue →" : "Create account"}
            </button>
          </form>

          {step === 1 && (
            <>
              <div className="my-5 flex items-center gap-3">
                <div className="flex-1 h-px bg-cb-border"></div>
                <span className="text-xs text-cb-text-tertiary">or sign up with</span>
                <div className="flex-1 h-px bg-cb-border"></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[{ name: "Google", i: "G", c: "text-red-400" }, { name: "Apple", i: "🍎", c: "text-cb-text" }].map((p) => (
                  <button key={p.name} className="flex items-center justify-center gap-2 py-3 bg-cb-bg-card border border-cb-border rounded-xl text-sm font-semibold text-cb-text-secondary hover:text-cb-text hover:border-cb-blue/50 transition-all">
                    <span className={`font-black ${p.c}`}>{p.i}</span>
                    {p.name}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <button type="button" onClick={() => setStep(1)} className="mt-4 w-full text-center text-sm text-cb-text-tertiary hover:text-cb-text font-medium transition-colors">
              ← Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
