"use client";

import { ArrowLeft, MapPin, Minus, Plus, RefreshCw, ShieldCheck, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { apiRequest, createIdempotencyKey } from "@/lib/api";
import { cartSchema } from "@/lib/catalog.schemas";
import type { Address, Cart } from "@/lib/types";

const emptyCart: Cart = {
  items: [],
  subtotal: 0,
  delivery_fee: 0,
  total: 0,
};

export default function CartPage() {
  const [cart, setCart] = useState<Cart>(emptyCart);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const [cartResponse, addressResponse] = await Promise.all([
          apiRequest<unknown>("/api/cart"),
          apiRequest<unknown>("/api/auth/me").catch(() => null),
        ]);
        if (!active) return;
        const parsedCart = cartSchema.parse(cartResponse);
        setCart(parsedCart);
        if (
          addressResponse &&
          typeof addressResponse === "object" &&
          "addresses" in addressResponse &&
          Array.isArray(addressResponse.addresses)
        ) {
          const profileAddresses = addressResponse.addresses as Address[];
          setAddresses(profileAddresses);
          setSelectedAddress(
            profileAddresses.find((address) => address.is_default)?.id ??
              profileAddresses[0]?.id ??
              null,
          );
        }
      } catch (caught) {
        if (active) {
          setError(
            caught instanceof Error
              ? caught.message
              : "We could not load your cart.",
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }
    void load();
    return () => {
      active = false;
    };
  }, [retry]);

  async function updateQuantity(productId: number, quantity: number) {
    setError("");
    try {
      await apiRequest<Cart>("/api/cart/items", {
        method: "PATCH",
        body: JSON.stringify({ product_id: productId, quantity }),
      });
      setRetry((value) => value + 1);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not update quantity.");
    }
  }

  async function clearCart() {
    setError("");
    try {
      await apiRequest("/api/cart", { method: "DELETE" });
      setCart(emptyCart);
      setMessage("Cart cleared.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not clear the cart.");
    }
  }

  async function placeOrder() {
    if (!selectedAddress) {
      setError("Choose a delivery address before placing the order.");
      return;
    }
    setPlacing(true);
    setError("");
    setMessage("");
    try {
      const order = await apiRequest<{ id?: number; order_number?: string }>(
        "/api/orders",
        {
          method: "POST",
          headers: { "X-Idempotency-Key": createIdempotencyKey() },
          body: JSON.stringify({ address_id: selectedAddress }),
        },
      );
      setMessage(
        `Order ${order.order_number ?? order.id ?? ""} placed successfully.`,
      );
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not place your order.");
    } finally {
      setPlacing(false);
    }
  }

  return (
    <main className="mx-auto min-h-dvh max-w-5xl bg-[#f7f8f5] pb-28 md:px-6 md:py-8">
      <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-[#e7eadf] bg-white px-4 md:static md:rounded-2xl md:border-0">
        <Link href="/home" aria-label="Back" className="grid h-10 w-10 place-items-center rounded-xl border border-[#e3e7de]">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-lg font-black text-[#18351f]">My cart</h1>
        {cart.items.length > 0 && (
          <button onClick={clearCart} className="ml-auto flex items-center gap-1 text-xs font-bold text-[#d16052]">
            <Trash2 size={15} /> Clear
          </button>
        )}
      </header>
      <div className="grid gap-5 px-4 py-5 md:grid-cols-[1fr_340px] md:px-0">
        <div className="space-y-5">
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="h-28 animate-pulse rounded-2xl bg-white" />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-[#eadfd7] bg-white p-5">
              <p className="font-bold text-[#9d5a50]">Cart unavailable</p>
              <p className="mt-1 text-sm text-[#92998f]">{error}</p>
              <button onClick={() => setRetry((value) => value + 1)} className="mt-4 flex h-10 items-center gap-2 rounded-xl bg-[#1d6f3b] px-4 text-xs font-bold text-white">
                <RefreshCw size={14} /> Retry
              </button>
            </div>
          ) : cart.items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#dfe5da] bg-white p-10 text-center">
              <p className="text-4xl">🛒</p>
              <h2 className="mt-4 font-black text-[#26342a]">Your cart is empty</h2>
              <Link href="/home" className="mt-5 inline-flex h-11 items-center rounded-xl bg-[#1d6f3b] px-5 text-sm font-bold text-white">
                Start shopping
              </Link>
            </div>
          ) : (
            <>
              <section className="rounded-2xl border border-[#e8ebe3] bg-white p-4">
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#edf5e9] text-[#1d6f3b]">
                    <MapPin size={19} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#92998f]">Delivering to</p>
                    {addresses.length ? (
                      <select
                        value={selectedAddress ?? ""}
                        onChange={(event) => setSelectedAddress(Number(event.target.value))}
                        className="mt-2 h-11 w-full rounded-xl border border-[#dce3d7] bg-white px-3 text-sm font-bold outline-none"
                      >
                        {addresses.map((address) => (
                          <option key={address.id} value={address.id}>
                            {address.label ? `${address.label}: ` : ""}{address.line1}, {address.city}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p className="mt-2 text-sm font-bold text-[#26342a]">No saved addresses</p>
                    )}
                  </div>
                  <Link href="/account/addresses" className="ml-auto text-xs font-bold text-[#1d6f3b]">Change</Link>
                </div>
              </section>
              <section className="overflow-hidden rounded-2xl border border-[#e8ebe3] bg-white">
                {cart.items.map((item) => (
                  <article key={item.product_id} className="flex gap-3 border-b border-[#edf0e9] p-4 last:border-0">
                    <div className="grid h-20 w-20 shrink-0 place-items-center rounded-xl bg-[#f7f8f5] text-xs text-[#92998f]">Image</div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-black text-[#26342a]">{item.name}</h3>
                      <p className="mt-1 text-xs text-[#92998f]">{item.weight ?? "1 unit"}</p>
                      <div className="mt-3 flex items-end justify-between">
                        <strong className="text-sm text-[#26342a]">₹{item.line_total}</strong>
                        <div className="flex h-9 items-center rounded-lg border border-[#dce8d7] bg-[#f6faf4]">
                          <button aria-label={`Decrease ${item.name}`} onClick={() => updateQuantity(item.product_id, item.quantity - 1)} className="grid h-full w-9 place-items-center text-[#1d6f3b]"><Minus size={14} /></button>
                          <span className="w-7 text-center text-xs font-black">{item.quantity}</span>
                          <button aria-label={`Increase ${item.name}`} onClick={() => updateQuantity(item.product_id, item.quantity + 1)} className="grid h-full w-9 place-items-center text-[#1d6f3b]"><Plus size={14} /></button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </section>
            </>
          )}
        </div>
        {cart.items.length > 0 && (
          <aside className="h-fit rounded-2xl border border-[#e8ebe3] bg-white p-4 md:sticky md:top-8">
            <h2 className="font-black text-[#26342a]">Price details</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-[#778078]">Item total</dt><dd className="font-bold">₹{cart.subtotal}</dd></div>
              <div className="flex justify-between"><dt className="text-[#778078]">Delivery fee</dt><dd className="font-bold text-[#1d6f3b]">{cart.delivery_fee === 0 ? "FREE" : `₹${cart.delivery_fee}`}</dd></div>
              <div className="flex justify-between border-t border-dashed border-[#dde3d7] pt-3 text-base"><dt className="font-black">To pay</dt><dd className="font-black">₹{cart.total}</dd></div>
            </dl>
            {message && <p role="status" className="mt-4 rounded-lg bg-[#edf5e9] p-3 text-xs font-bold text-[#1d6f6f]">{message}</p>}
            {error && <p role="alert" className="mt-4 rounded-lg border border-[#eadfd7] p-3 text-xs text-[#9d5a50]">{error}</p>}
            <button onClick={placeOrder} disabled={placing || !selectedAddress} className="mt-5 h-12 w-full rounded-xl bg-[#1d6f3b] text-sm font-bold text-white disabled:opacity-60">
              {placing ? "Placing order..." : `Place order · ₹${cart.total}`}
            </button>
          </aside>
        )}
      </div>
      <div className="sr-only"><ShieldCheck />Checkout uses backend totals and idempotency protection.</div>
    </main>
  );
}
