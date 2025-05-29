"use client";

export default function UnderProductionPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900">
      <div className="bg-zinc-800 p-8 rounded-lg shadow-xl border border-zinc-700 text-center">
        <svg
          className="mx-auto mb-4 h-16 w-16 text-yellow-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 48 48"
        >
          <circle cx="24" cy="24" r="22" strokeWidth="4" className="text-yellow-300" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            d="M24 16v10m0 6h.01"
          />
        </svg>
        <h1 className="text-2xl font-bold text-yellow-300 mb-2">Coming Soon</h1>
        <p className="text-zinc-300 mb-4">
          Accoustic guitars are under production.<br />
          Please check back later!
        </p>
      </div>
    </div>
  );
}