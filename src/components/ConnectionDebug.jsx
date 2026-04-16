import { useState, useEffect } from "react";

export default function ConnectionDebug() {
  const [status, setStatus] = useState("checking");
  const [results, setResults] = useState({});
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      const checks = {};

      // Check 1: Backend URL
      const backendUrl = import.meta.env.VITE_API_URL;
      checks.backendUrl = backendUrl || "NOT SET";

      // Check 2: Health check
      try {
        const healthResponse = await fetch(
          `${backendUrl.replace("/api", "")}/api/health`,
          { 
            method: "GET",
            headers: { "Content-Type": "application/json" }
          }
        );
        checks.healthStatus = healthResponse.status;
        checks.healthOk = healthResponse.ok;
        const healthData = await healthResponse.json();
        checks.healthData = healthData;
      } catch (err) {
        checks.healthError = err.message;
      }

      // Check 3: Try login endpoint (without credentials)
      try {
        const loginResponse = await fetch(
          `${backendUrl}/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: "test@test.com", password: "test" }),
          }
        );
        checks.loginStatus = loginResponse.status;
        checks.loginHeaders = Object.fromEntries(loginResponse.headers);
      } catch (err) {
        checks.loginError = err.message;
      }

      // Check 4: CORS headers
      try {
        const corsCheck = await fetch(
          `${backendUrl.replace("/api", "")}/api/health`,
          {
            method: "OPTIONS",
          }
        );
        checks.corsHeaders = {
          "access-control-allow-origin": corsCheck.headers.get(
            "access-control-allow-origin"
          ),
          "access-control-allow-methods": corsCheck.headers.get(
            "access-control-allow-methods"
          ),
          "access-control-allow-credentials": corsCheck.headers.get(
            "access-control-allow-credentials"
          ),
        };
      } catch (err) {
        checks.corsError = err.message;
      }

      setResults(checks);
      setStatus(
        checks.healthOk ? "connected" : "disconnected"
      );
    };

    checkConnection();
  }, []);

  if (!showDebug) {
    return (
      <button
        onClick={() => setShowDebug(true)}
        className="fixed bottom-4 right-4 px-3 py-1.5 bg-cb-blue/30 text-cb-blue text-xs font-semibold rounded-lg hover:bg-cb-blue/50 transition-colors z-40 border border-cb-blue/50"
      >
        🔧 Debug Connection
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-cb-bg-card border border-cb-border rounded-lg shadow-2xl z-50 max-h-96 overflow-y-auto p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-cb-text text-sm">Backend Connection Debug</h3>
        <button
          onClick={() => setShowDebug(false)}
          className="text-cb-text-secondary hover:text-cb-text text-lg font-bold"
        >
          ×
        </button>
      </div>

      <div className={`mb-3 p-2 rounded text-xs font-semibold ${
        status === "connected"
          ? "bg-green-500/20 text-green-400 border border-green-500/30"
          : "bg-red-500/20 text-red-400 border border-red-500/30"
      }`}>
        Status: {status.toUpperCase()}
      </div>

      <div className="space-y-2 text-xs text-cb-text-secondary">
        {/* Backend URL */}
        <div>
          <p className="font-semibold text-cb-text mb-1">Backend URL:</p>
          <code className="bg-cb-bg p-1.5 rounded block break-words text-[10px]">
            {results.backendUrl}
          </code>
        </div>

        {/* Health Check */}
        <div>
          <p className="font-semibold text-cb-text mb-1">Health Check:</p>
          <code className="bg-cb-bg p-1.5 rounded block text-[10px]">
            Status: {results.healthStatus}
            <br />
            {results.healthError && `Error: ${results.healthError}`}
            {results.healthData &&
              `Data: ${JSON.stringify(results.healthData).substring(0, 50)}`}
          </code>
        </div>

        {/* CORS Headers */}
        <div>
          <p className="font-semibold text-cb-text mb-1">CORS Headers:</p>
          <code className="bg-cb-bg p-1.5 rounded block text-[10px] break-words">
            {results.corsHeaders ? (
              <>
                Allow-Origin: {results.corsHeaders["access-control-allow-origin"] || "❌ MISSING"}
                <br />
                Allow-Methods: {results.corsHeaders["access-control-allow-methods"] || "❌ MISSING"}
                <br />
                Allow-Credentials: {results.corsHeaders["access-control-allow-credentials"] || "❌ MISSING"}
              </>
            ) : results.corsError ? (
              `Error: ${results.corsError}`
            ) : (
              "Checking..."
            )}
          </code>
        </div>

        {/* Login Endpoint */}
        <div>
          <p className="font-semibold text-cb-text mb-1">Login Endpoint Test:</p>
          <code className="bg-cb-bg p-1.5 rounded block text-[10px]">
            Status: {results.loginStatus}
            <br />
            {results.loginError && `Error: ${results.loginError}`}
          </code>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-cb-border text-[11px] text-cb-text-tertiary">
        <p className="mb-2">
          <strong>⚠️ Common Issues:</strong>
        </p>
        <ul className="space-y-1 list-disc pl-4">
          <li>Backend not running or deployed</li>
          <li>CORS not enabled on backend</li>
          <li>Wrong backend URL in .env.local</li>
          <li>Backend API endpoints not implemented</li>
        </ul>
      </div>
    </div>
  );
}
