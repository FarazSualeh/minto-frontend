import { ArrowLeft, ChevronRight, Headphones, MapPin, Package, Settings, UserRound } from "lucide-react";
import Link from "next/link";

export default function AccountPage() {
  const items = [
    [Package, "Your orders", "/orders"],
    [MapPin, "Saved addresses", "/account/addresses"],
    [Settings, "Account settings", "/account/settings"],
    [Headphones, "Help & support", "/account/support"],
  ] as const;
  return (
    <main className="mx-auto min-h-dvh max-w-2xl px-4 pb-24 pt-4">
      <header className="flex h-12 items-center gap-3">
        <Link href="/" className="grid h-10 w-10 place-items-center rounded-xl border border-[#e3e7de]"><ArrowLeft size={20} /></Link>
        <h1 className="text-lg font-black text-[#18351f]">Account</h1>
      </header>
      <section className="mt-5 flex items-center gap-4 rounded-2xl bg-[#edf5e9] p-5">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-[#1d6f3b]"><UserRound size={24} /></span>
        <div><h2 className="font-black text-[#26342a]">Minto customer</h2><p className="mt-1 text-xs text-[#92998f]">+91 98765 43210</p></div>
      </section>
      <section className="mt-4 overflow-hidden rounded-2xl border border-[#e8ebe3] bg-white">
        {items.map(([Icon, label, href]) => (
          <Link key={label} href={href} className="flex h-14 items-center gap-3 border-b border-[#edf0e9] px-4 last:border-0">
            <Icon size={19} className="text-[#1d6f3b]" /><span className="text-sm font-bold text-[#465248]">{label}</span><ChevronRight size={18} className="ml-auto text-[#abb2aa]" />
          </Link>
        ))}
      </section>
    </main>
  );
}
