import { ArrowLeft, Heart } from "lucide-react";
import Link from "next/link";

export default function SavedPage() {
  return (
    <main className="mx-auto min-h-dvh max-w-2xl px-4 pb-24 pt-4">
      <header className="flex h-12 items-center gap-3">
        <Link href="/" className="grid h-10 w-10 place-items-center rounded-xl border border-[#e3e7de]"><ArrowLeft size={20} /></Link>
        <h1 className="text-lg font-black text-[#18351f]">Saved items</h1>
      </header>
      <section className="mt-20 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#edf5e9] text-[#1d6f3b]"><Heart size={28} /></span>
        <h2 className="mt-5 font-black text-[#26342a]">No saved items yet</h2>
        <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-[#92998f]">Products you save will appear here for quick access.</p>
        <Link href="/" className="mt-5 inline-flex h-11 items-center rounded-xl bg-[#1d6f3b] px-5 text-sm font-bold text-white">Start shopping</Link>
      </section>
    </main>
  );
}
