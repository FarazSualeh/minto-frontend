"use client";

import {
  ArrowRight,
  ChevronDown,
  Clock3,
  HeartHandshake,
  Leaf,
  MapPin,
  PackageCheck,
  ShieldCheck,
  ShoppingBasket,
  Star,
  Store,
  Truck,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const categoryCards = [
  {
    name: "Fresh fruits",
    subtitle: "Picked fresh",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Vegetables",
    subtitle: "Daily harvest",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Dairy & eggs",
    subtitle: "Every morning",
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Bakery",
    subtitle: "Freshly baked",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=85",
  },
];

const benefits = [
  {
    icon: Clock3,
    title: "Minutes, not hours",
    text: "Local store allocation and route-aware delivery keep everyday orders moving quickly.",
  },
  {
    icon: Leaf,
    title: "Freshness first",
    text: "Handpicked produce and essentials checked before they leave the partner store.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & transparent",
    text: "Backend-calculated prices, secure payments, live order updates, and clear cancellation.",
  },
  {
    icon: HeartHandshake,
    title: "Made for Chiplun",
    text: "Built around neighbourhood stores, familiar products, and the needs of local families.",
  },
];

const steps = [
  ["01", "Choose what you need", "Browse fresh groceries, dairy, snacks, staples, and daily essentials."],
  ["02", "Confirm your location", "We check your delivery zone and allocate a suitable nearby store."],
  ["03", "Track it live", "Follow acceptance, packing, pickup, and delivery in real time."],
];

const testimonials = [
  {
    quote: "Minto is now my first choice for evening essentials. The delivery was quick and everything arrived fresh.",
    name: "Prachi Desai",
    area: "Chiplun",
  },
  {
    quote: "It feels faster than going to the market for milk and vegetables. The live status updates are really useful.",
    name: "Siddhesh Kulkarni",
    area: "Chiplun",
  },
];

const faqs = [
  ["How fast can Minto deliver?", "Eligible orders in active delivery zones are targeted for delivery within 15 minutes. Exact timing depends on store availability, distance, traffic, and order preparation."],
  ["Which areas in Chiplun are supported?", "Service availability is checked from your exact delivery address and depends on active neighbourhood delivery zones and partner store coverage."],
  ["Can I cancel an order?", "Orders can be cancelled while they remain in a cancellable lifecycle stage. Stock reservations are released automatically when a supported cancellation is completed."],
  ["How are prices and discounts calculated?", "Available prices and totals come from Minto's backend and selected partner store. The browser cannot override backend prices or delivery charges."],
  ["Can local stores join Minto?", "Yes. Approved shop partners can receive nearby orders, manage local inventory and pricing, accept or reject orders, and track preparation status."],
];

export default function LandingPage() {
  const [location, setLocation] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-dvh overflow-hidden bg-[#f8faf5] text-[#18351f]">
      <header className="absolute inset-x-0 top-0 z-40">
        <div className="mx-auto flex h-20 max-w-7xl items-center px-5 md:px-8">
          <Link href="/" className="flex items-center gap-2" aria-label="Minto home">
            <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-[#1d6f3b] text-lg font-black text-white shadow-[0_8px_24px_rgba(29,111,59,.22)]">
              M
            </span>
            <span className="text-xl font-black tracking-tight">Minto</span>
          </Link>
          <nav className="ml-auto hidden items-center gap-8 text-sm font-bold text-[#4f6053] lg:flex">
            <Link href="#categories" className="transition-colors hover:text-[#1d6f3b]">Categories</Link>
            <Link href="#how-it-works" className="transition-colors hover:text-[#1d6f3b]">How it works</Link>
            <Link href="#why-minto" className="transition-colors hover:text-[#1d6f3b]">Why Minto</Link>
            <Link href="/partner" className="transition-colors hover:text-[#1d6f3b]">For stores</Link>
          </nav>
          <div className="ml-4 flex items-center gap-2">
            <Link href="/login" className="hidden h-11 items-center rounded-xl px-4 text-sm font-bold text-[#1d6f3b] sm:flex">
              Sign in
            </Link>
            <Link href="/home" className="flex h-11 items-center gap-2 rounded-xl bg-[#18351f] px-4 text-sm font-black text-white shadow-[0_8px_24px_rgba(24,53,31,.18)] sm:px-5">
              Shop now <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </header>

      <section className="relative isolate min-h-[820px] overflow-hidden bg-[#edf6df] pt-20 md:min-h-[760px]">
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(#a3b999_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute -left-32 top-32 h-96 w-96 rounded-full bg-[#bde08b]/40 blur-3xl" />
        <div className="absolute right-[-120px] top-[-120px] h-[460px] w-[460px] rounded-full bg-[#f4c96a]/30 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 md:min-h-[680px] md:grid-cols-[1.02fr_.98fr] md:px-8 md:py-16">
          <div className="relative z-10 pt-4 md:pt-0">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#ccdcc2] bg-white/80 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#55705b] shadow-sm backdrop-blur">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ef9d32] opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ef9d32]" />
              </span>
              Fast delivery across Chiplun
            </div>
            <h1 className="max-w-[680px] text-[48px] font-black leading-[0.98] tracking-[-0.04em] text-[#18351f] sm:text-[64px] lg:text-[78px]">
              Ghar baithe groceries,
              <span className="block text-[#1d6f3b]">Minto mein!</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#5d6f60] sm:text-lg">
              Fresh groceries, dairy, household essentials and local favourites—picked nearby and delivered right to your door.
            </p>

            <div className="mt-8 max-w-[620px] rounded-[20px] border border-white/90 bg-white p-2 shadow-[0_24px_60px_rgba(48,88,53,.14)]">
              <div className="flex flex-col gap-2 sm:flex-row">
                <label className="flex h-14 min-w-0 flex-1 items-center gap-3 px-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#edf5e9] text-[#1d6f3b]">
                    <MapPin size={18} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[10px] font-black uppercase tracking-[0.12em] text-[#98a197]">Delivering to</span>
                    <input
                      value={location}
                      onChange={(event) => setLocation(event.target.value)}
                      className="mt-0.5 h-7 w-full bg-transparent text-sm font-bold text-[#26342a] outline-none placeholder:font-medium placeholder:text-[#98a197]"
                      placeholder="Enter area or landmark"
                      aria-label="Delivery location"
                    />
                  </span>
                </label>
                <Link
                  href={`/home?location=${encodeURIComponent(location || "Chiplun")}`}
                  className="flex h-14 shrink-0 items-center justify-center gap-2 rounded-[14px] bg-[#ef9d32] px-6 text-sm font-black text-[#3f3018] shadow-[0_10px_24px_rgba(239,157,50,.22)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Find groceries <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-bold text-[#66746a]">
              <span className="flex items-center gap-2"><ShieldCheck size={17} className="text-[#1d6f3b]" /> Secure checkout</span>
              <span className="flex items-center gap-2"><PackageCheck size={17} className="text-[#1d6f3b]" /> Freshness checked</span>
              <span className="flex items-center gap-2"><Truck size={17} className="text-[#1d6f3b]" /> Live order status</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="absolute -left-3 top-12 z-20 hidden rounded-2xl border border-white/80 bg-white/95 p-3 shadow-[0_16px_40px_rgba(44,75,49,.14)] backdrop-blur sm:block">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#fff1dc] text-[#d68a2d]"><Clock3 size={19} /></span>
                <div><p className="text-[10px] font-bold uppercase tracking-wider text-[#98a197]">Arrival</p><p className="mt-0.5 text-sm font-black">12–15 minutes</p></div>
              </div>
            </div>
            <div className="relative h-[430px] overflow-hidden rounded-[38px] border-[8px] border-white/60 shadow-[0_30px_80px_rgba(62,100,57,.20)] sm:h-[540px]">
              <Image
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1100&q=90"
                alt="Fresh groceries ready for local delivery"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#18351f]/25 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-white/40 bg-[#18351f]/85 p-4 text-white backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#d8e5d5]">Partner store nearby</p>
                  <p className="mt-1 text-sm font-black sm:text-base">Fresh essentials, allocated instantly</p>
                </div>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#ef9d32] text-[#3f3018]"><Store size={19} /></span>
              </div>
            </div>
            <div className="absolute -bottom-7 right-2 z-20 hidden w-52 rounded-2xl border border-[#e9eedf] bg-white p-4 shadow-[0_18px_50px_rgba(44,75,49,.15)] sm:block">
              <div className="flex items-center gap-1 text-[#ef9d32]">
                {[1, 2, 3, 4, 5].map((star) => <Star key={star} size={13} fill="currentColor" />)}
              </div>
              <p className="mt-2 text-xs font-bold leading-5">Chosen for quick, reliable neighbourhood delivery</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e7eddf] bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-[#edf0e8] px-5 md:grid-cols-4 md:px-8">
          {[["15 min", "Delivery target"], ["100%", "Fresh check"], ["Local", "Partner stores"], ["One", "Simple checkout"]].map(([value, label], index) => (
            <div key={label} className={`${index > 1 ? "border-t border-[#edf0e8] md:border-t-0" : ""} px-3 py-7 text-center md:px-6`}>
              <p className="text-2xl font-black text-[#1d6f3b] sm:text-3xl">{value}</p>
              <p className="mt-1 text-xs font-bold text-[#879187]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="categories" className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#e09436]">Shop by need</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Everything close at hand</h2>
          </div>
          <Link href="/categories" className="hidden items-center gap-2 text-sm font-black text-[#1d6f3b] sm:flex">
            View all categories <ArrowRight size={17} />
          </Link>
        </div>
        <div className="hide-scrollbar mt-8 -mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:px-0 lg:grid-cols-4">
          {categoryCards.map((category) => (
            <Link
              key={category.name}
              href={`/search?category=${encodeURIComponent(category.name)}`}
              className="group relative min-w-[260px] snap-start overflow-hidden rounded-[24px] bg-[#18351f] sm:min-w-0"
            >
              <div className="relative h-64 w-full">
                <Image src={category.image} alt={category.name} fill sizes="(max-width: 640px) 260px, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#18351f]/95 via-[#18351f]/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <p className="text-xs font-bold text-[#dcebd7]">{category.subtitle}</p>
                  <div className="mt-1 flex items-center justify-between">
                    <h3 className="text-xl font-black">{category.name}</h3>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15 transition-colors group-hover:bg-[#ef9d32] group-hover:text-[#18351f]"><ArrowRight size={17} /></span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="why-minto" className="bg-[#18351f] py-16 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-8 lg:grid-cols-[.65fr_1.35fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#efb45e]">Why Minto</p>
              <h2 className="mt-3 max-w-md text-3xl font-black leading-tight sm:text-5xl">Local commerce, thoughtfully delivered.</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#c2d0c1] lg:justify-self-end">
              Minto connects customers with nearby stores so everyday needs are fulfilled faster—without losing the trust and freshness of local shopping.
            </p>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <article key={benefit.title} className="rounded-[22px] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#edf5e9] text-[#1d6f3b]"><Icon size={22} /></span>
                  <h3 className="mt-6 text-lg font-black">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#becaba]">{benefit.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1d6f3b]">Simple from search to doorstep</p>
          <h2 className="mt-3 text-3xl font-black sm:text-5xl">Three steps. One happy cart.</h2>
        </div>
        <div className="relative mt-10 grid gap-4 md:grid-cols-3">
          <div className="absolute left-[16%] right-[16%] top-12 hidden border-t border-dashed border-[#bfccb7] md:block" />
          {steps.map(([number, title, text], index) => (
            <article key={number} className="relative rounded-[24px] border border-[#e3e9dc] bg-white p-6 text-center shadow-[0_10px_30px_rgba(45,69,47,.04)]">
              <span className="relative z-10 mx-auto grid h-16 w-16 place-items-center rounded-full border-[6px] border-[#f8faf5] bg-[#edf5e9] text-sm font-black text-[#1d6f3b]">{number}</span>
              <div className="mt-5">
                {index === 0 && <ShoppingBasket className="mx-auto text-[#ef9d32]" size={24} />}
                {index === 1 && <MapPin className="mx-auto text-[#ef9d32]" size={24} />}
                {index === 2 && <Truck className="mx-auto text-[#ef9d32]" size={24} />}
              </div>
              <h3 className="mt-4 text-xl font-black">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#747f75]">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8 md:pb-24">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[32px] bg-[#edf5e9] md:grid-cols-[1fr_420px]">
          <div className="p-7 sm:p-10 md:p-14">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1d6f3b]">Partner with Minto</p>
            <h2 className="mt-3 max-w-xl text-3xl font-black leading-tight sm:text-5xl">Turn neighbourhood demand into daily growth.</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[#657367]">
              Join Minto as a shop partner to manage live inventory, receive nearby orders, adjust store availability, and grow with transparent operations.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/partner" className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#1d6f3b] px-5 text-sm font-black text-white">
                Partner dashboard <ArrowRight size={17} />
              </Link>
              <Link href="/register" className="flex h-12 items-center justify-center rounded-xl border border-[#bdcbb5] px-5 text-sm font-black text-[#1d6f3b]">
                Create account
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-5 text-xs font-bold text-[#657367]">
              <span className="flex items-center gap-2"><Store size={16} /> Store dashboard</span>
              <span className="flex items-center gap-2"><PackageCheck size={16} /> Inventory tools</span>
              <span className="flex items-center gap-2"><Users size={16} /> Local customer reach</span>
            </div>
          </div>
          <div className="relative min-h-[300px] md:min-h-full">
            <Image
              src="https://images.unsplash.com/photo-1543168256-418811576931?auto=format&fit=crop&w=900&q=85"
              alt="Local shop partner"
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-[#e9eddf] bg-white py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#e09436]">Neighbourhood notes</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Loved where every minute matters.</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="rounded-[24px] bg-[#f7f9f3] p-6">
                <div className="flex gap-1 text-[#ef9d32]">
                  {[1, 2, 3, 4, 5].map((star) => <Star key={star} size={15} fill="currentColor" />)}
                </div>
                <blockquote className="mt-5 text-base font-bold leading-7 text-[#38483b]">“{testimonial.quote}”</blockquote>
                <div className="mt-5 border-t border-[#e5eadf] pt-4">
                  <p className="text-sm font-black">{testimonial.name}</p>
                  <p className="mt-1 text-xs text-[#92998f]">{testimonial.area} customer</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1d6f3b]">Good to know</p>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">Frequently asked</h2>
        </div>
        <div className="mt-8 divide-y divide-[#e5eadf] rounded-[24px] border border-[#e5eadf] bg-white px-5 sm:px-7">
          {faqs.map(([question, answer], index) => (
            <div key={question}>
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                aria-expanded={openFaq === index}
                className="flex w-full items-center justify-between gap-4 py-5 text-left text-sm font-black sm:text-base"
              >
                {question}
                <ChevronDown size={18} className={`shrink-0 transition-transform ${openFaq === index ? "rotate-180" : ""}`} />
              </button>
              {openFaq === index && <p className="pb-5 pr-8 text-sm leading-7 text-[#747f75]">{answer}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-5 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[28px] bg-[#ef9d32] px-6 py-10 text-[#18351f] sm:px-10 md:flex md:items-center md:justify-between md:px-14">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#72521f]">Start with what you need</p>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">Good things are just around the corner.</h2>
          </div>
          <Link href="/home" className="mt-6 flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#18351f] px-6 text-sm font-black text-white md:mt-0">
            Browse products <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <footer className="px-5 py-10 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#1d6f3b] text-sm font-black text-white">M</span>
            <span className="font-black">Minto</span>
          </Link>
          <nav className="flex flex-wrap gap-5 text-xs font-bold text-[#69766b]">
            <Link href="/home">Shop</Link>
            <Link href="/categories">Categories</Link>
            <Link href="/partner">For stores</Link>
            <Link href="/account">Account</Link>
          </nav>
          <p className="text-xs text-[#879087] sm:ml-auto">© 2026 Minto Quick Commerce · Chiplun</p>
        </div>
      </footer>
    </main>
  );
}
