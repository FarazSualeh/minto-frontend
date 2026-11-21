"use client";

import { ArrowRight, ChevronDown, Clock3, MapPin, ShieldCheck, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const steps = [
  ["01", "Choose your essentials", "Browse fresh groceries and daily necessities from local stores."],
  ["02", "Set your location", "We confirm your delivery zone and the nearest available store."],
  ["03", "Track your delivery", "Follow every step from store preparation to your doorstep."],
];

export default function LandingPage() {
  const [location, setLocation] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    ["How fast is Minto delivery?", "Minto aims to deliver eligible orders in and around Chiplun within 15 minutes."],
    ["Which areas are supported?", "Delivery availability depends on your address and active delivery zones around local partner stores."],
    ["Can I cancel an order?", "Customers can cancel eligible orders while they are still in a cancellable stage. Stock is released automatically."],
  ];

  return (
    <main className="min-h-dvh overflow-hidden bg-[#f9faf7] text-[#18351f]">
      <header className="mx-auto flex h-20 max-w-7xl items-center px-5 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#1d6f3b] text-lg font-black text-white">M</span>
          <span className="text-xl font-black">Minto</span>
        </Link>
        <nav className="ml-auto hidden items-center gap-7 text-sm font-bold text-[#59655c] md:flex">
          <Link href="#how-it-works">How it works</Link>
          <Link href="#why-minto">Why Minto</Link>
          <Link href="/partner">For partners</Link>
        </nav>
        <Link href="/home" className="ml-5 hidden h-11 items-center rounded-xl border border-[#ccd8c7] px-5 text-sm font-bold md:flex">
          Start shopping
        </Link>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-10 md:min-h-[620px] md:grid-cols-[1fr_0.95fr] md:px-8 md:py-16">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#dfe7da] bg-white px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#55705b]">
            <Clock3 size={15} className="text-[#1d6f3b]" />
            Chiplun&apos;s 15-minute grocery app
          </div>
          <h1 className="max-w-xl text-[44px] font-black leading-[1.03] tracking-tight sm:text-6xl lg:text-[72px]">
            Ghar baithe groceries,
            <span className="text-[#1d6f3b]"> Minto mein!</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-[#69756b] sm:text-lg">
            Fresh food and everyday essentials sourced from stores near you. Order in seconds, receive in minutes.
          </p>
          <div className="mt-8 flex max-w-xl flex-col gap-2 rounded-2xl border border-[#dde5d8] bg-white p-2 shadow-[0_18px_50px_rgba(43,72,49,.10)] sm:flex-row">
            <label className="flex h-12 min-w-0 flex-1 items-center gap-3 px-3">
              <MapPin size={20} className="shrink-0 text-[#1d6f3b]" />
              <input
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none"
                placeholder="Enter your delivery location"
                aria-label="Delivery location"
              />
            </label>
            <Link
              href={`/home?location=${encodeURIComponent(location || "Chiplun")}`}
              className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#ef9d32] px-5 text-sm font-black text-[#3f3018] transition-transform active:scale-[0.98]"
            >
              Find groceries <ArrowRight size={18} />
            </Link>
          </div>
          <div className="mt-5 flex items-center gap-5 text-xs font-bold text-[#747f75]">
            <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-[#1d6f3b]" /> Secure checkout</span>
            <span className="flex items-center gap-1.5"><Star size={16} className="text-[#ef9d32]" /> Local quality</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="relative h-[390px] overflow-hidden rounded-[32px] bg-[#dff0d5] sm:h-[500px]">
            <Image
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=90"
              alt="Fresh grocery store selection"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-5 left-4 right-4 rounded-2xl border border-white/70 bg-white/95 p-4 shadow-[0_18px_50px_rgba(43,72,49,.16)] backdrop-blur sm:left-auto sm:right-[-24px] sm:w-72">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[#edf5e9] text-[#1d6f3b]"><Clock3 size={21} /></span>
              <div><p className="text-xs text-[#879087]">Estimated delivery</p><p className="mt-1 text-lg font-black">12–15 minutes</p></div>
            </div>
          </div>
        </div>
      </section>

      <section id="why-minto" className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[["15 min", "Fast delivery"], ["100%", "Fresh checked"], ["24/7", "Store visibility"], ["1 cart", "Simple checkout"]].map(([value, label]) => (
            <article key={label} className="rounded-2xl border border-[#e5eadf] bg-white p-5 text-center">
              <p className="text-2xl font-black text-[#1d6f3b]">{value}</p>
              <p className="mt-1 text-xs font-bold text-[#7b867d]">{label}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="bg-[#edf5e9] py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1d6f3b]">Simple by design</p>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">From shelf to doorstep</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.map(([number, title, text]) => (
              <article key={number} className="rounded-3xl border border-[#dfe7da] bg-white p-6">
                <span className="text-sm font-black text-[#ef9d32]">{number}</span>
                <h3 className="mt-7 text-xl font-black">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#747f75]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 md:px-8">
        <h2 className="text-center text-3xl font-black">Frequently asked</h2>
        <div className="mt-7 divide-y divide-[#e5eadf] rounded-2xl border border-[#e5eadf] bg-white px-5">
          {faqs.map(([question, answer], index) => (
            <div key={question}>
              <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between py-5 text-left text-sm font-black">
                {question}
                <ChevronDown size={18} className={`transition-transform ${openFaq === index ? "rotate-180" : ""}`} />
              </button>
              {openFaq === index && <p className="pb-5 pr-8 text-sm leading-6 text-[#747f75]">{answer}</p>}
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-[#e5eadf] px-5 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center">
          <Link href="/" className="flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-lg bg-[#1d6f3b] text-sm font-black text-white">M</span><span className="font-black">Minto</span></Link>
          <p className="text-xs text-[#879087] sm:ml-auto">© 2026 Minto Quick Commerce · Chiplun</p>
        </div>
      </footer>
    </main>
  );
}
