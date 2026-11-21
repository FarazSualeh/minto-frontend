import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center bg-[#f7f8f5] px-5">
      <div className="max-w-sm text-center">
        <p className="text-6xl font-black text-[#dfe7da]">404</p>
        <h1 className="mt-4 text-2xl font-black text-[#26342a]">Page not found</h1>
        <p className="mt-2 text-sm text-[#92998f]">This page may have moved or no longer exists.</p>
        <Link href="/" className="mt-5 inline-flex h-11 items-center rounded-xl bg-[#1d6f3b] px-5 text-sm font-bold text-white">Back to Minto</Link>
      </div>
    </main>
  );
}
