export default function WarningBanner() {
  return (
    <div className="bg-yellow-500/10 border-b border-yellow-500/30 px-4 py-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-start gap-3">
        <div className="text-yellow-500 font-bold text-lg flex-shrink-0 mt-0.5">⚠️</div>
        <div className="flex-1 text-sm">
          <p className="font-semibold text-yellow-600 mb-1">
            This is a student project and is <strong>NOT affiliated with Coinbase</strong>
          </p>
          <p className="text-yellow-600/90">
            This is an educational demo app created for learning purposes. Do not enter real personal information or use real passwords. This is not a real financial platform.
          </p>
        </div>
      </div>
    </div>
  );
}
