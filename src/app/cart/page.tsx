import { ArrowLeft, MapPin, Minus, Plus, ShieldCheck, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const items = [
  { name: "Fresh Bananas", detail: "1 kg", price: 64, qty: 2, image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=600&q=85" },
  { name: "Fresh Milk", detail: "1 litre", price: 68, qty: 1, image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=85" },
];

export default function CartPage() {
  return (
    <main className="mx-auto min-h-dvh max-w-5xl bg-[#f7f8f5] pb-28 md:px-6 md:py-8">
      <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-[#e7eadf] bg-white px-4 md:static md:rounded-2xl md:border-0">
        <Link href="/" aria-label="Back" className="grid h-10 w-10 place-items-center rounded-xl border border-[#e3e7de]">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-lg font-black text-[#18351f]">My cart</h1>
        <button className="ml-auto flex items-center gap-1 text-xs font-bold text-[#d16052]">
          <Trash2 size={15} /> Clear
        </button>
      </header>
      <div className="grid gap-5 px-4 py-5 md:grid-cols-[1fr_340px] md:px-0">
        <div className="space-y-5">
          <section className="rounded-2xl border border-[#e8ebe3] bg-white p-4">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#edf5e9] text-[#1d6f3b]">
                <MapPin size={19} />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#92998f]">Delivering to</p>
                <h2 className="mt-1 text-sm font-black text-[#26342a]">Home · Khed Road, Chiplun</h2>
                <p className="mt-1 text-xs text-[#8b938b]">Within 15-minute delivery zone</p>
              </div>
              <button className="ml-auto text-xs font-bold text-[#1d6f3b]">Change</button>
            </div>
          </section>
          <section className="overflow-hidden rounded-2xl border border-[#e8ebe3] bg-white">
            {items.map((item) => (
              <article key={item.name} className="flex gap-3 border-b border-[#edf0e9] p-4 last:border-0">
                <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#f7f8f5]">
                  <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-black text-[#26342a]">{item.name}</h3>
                  <p className="mt-1 text-xs text-[#92998f]">{item.detail}</p>
                  <div className="mt-3 flex items-end justify-between">
                    <strong className="text-sm text-[#26342a]">₹{item.price * item.qty}</strong>
                    <div className="flex h-9 items-center rounded-lg border border-[#dce8d7] bg-[#f6faf4]">
                      <button className="grid h-full w-9 place-items-center text-[#1d6f3b]"><Minus size={14} /></button>
                      <span className="w-7 text-center text-xs font-black">{item.qty}</span>
                      <button className="grid h-full w-9 place-items-center text-[#1d6f3b]"><Plus size={14} /></button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>
          <div className="flex items-center gap-3 rounded-2xl bg-[#edf5e9] p-4">
            <ShieldCheck size={21} className="shrink-0 text-[#1d6f3b]" />
            <p className="text-xs leading-5 text-[#5d695f]">All items are verified and packed fresh for your order.</p>
          </div>
        </div>
        <aside className="h-fit rounded-2xl border border-[#e8ebe3] bg-white p-4 md:sticky md:top-8">
          <h2 className="font-black text-[#26342a]">Price details</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-[#778078]">Item total</dt><dd className="font-bold">₹196</dd></div>
            <div className="flex justify-between"><dt className="text-[#778078]">Delivery fee</dt><dd className="font-bold text-[#1d6f3b]">FREE</dd></div>
            <div className="flex justify-between border-t border-dashed border-[#dde3d7] pt-3 text-base"><dt className="font-black">To pay</dt><dd className="font-black">₹196</dd></div>
          </dl>
          <button className="mt-5 h-12 w-full rounded-xl bg-[#1d6f3b] text-sm font-bold text-white">Place order · ₹196</button>
        </aside>
      </div>
    </main>
  );
}
