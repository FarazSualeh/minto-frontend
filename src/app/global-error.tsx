"use client";

import { RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="grid min-h-dvh place-items-center bg-[#f7f8f5] px-5 font-sans">
        <main className="max-w-sm text-center">
          <h1 className="text-2xl font-black text-[#26342a]">Minto could not start</h1>
          <p className="mt-2 text-sm text-[#92998f]">{error.message || "Please retry."}</p>
          <button onClick={reset} className="mx-auto mt-5 flex h-11 items-center gap-2 rounded-xl bg-[#1d6f3b] px-5 text-sm font-bold text-white">
            <RefreshCw size={17} /> Reload
          </button>
        </main>
      </body>
    </html>
  );
}
