"use client";

import { RefreshCw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="grid min-h-dvh place-items-center bg-[#f7f8f5] px-5">
      <div className="max-w-sm text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#fff1dc] text-3xl">⚠️</span>
        <h1 className="mt-5 text-2xl font-black text-[#26342a]">Something went wrong</h1>
        <p className="mt-2 text-sm leading-6 text-[#92998f]">
          {error.message || "We could not complete this request."}
        </p>
        <button onClick={reset} className="mx-auto mt-5 flex h-11 items-center gap-2 rounded-xl bg-[#1d6f3b] px-5 text-sm font-bold text-white">
          <RefreshCw size={17} /> Try again
        </button>
      </div>
    </main>
  );
}
