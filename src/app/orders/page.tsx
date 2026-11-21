import { ArrowLeft, ChevronRight, Clock3, PackageCheck } from "lucide-react";
import Link from "next/link";

const orders = [
  { id: "#MT2480", status: "Out for delivery", eta: "Arriving in 8 min", total: "₹196", items: "Bananas, Milk", icon: Clock3, accent: "bg-[#fff1dc] text-[#a86c1d]" },
  { id: "#MT2396", status: "Delivered", eta: "Yesterday, 7:42 PM", total: "₹348", items: "Tomatoes, Eggs, Bread", icon: PackageCheck, accent: "bg-[#edf7e8] text-[#3e7950]" },
];

export default function OrdersPage() {
  return (
    <main className="mx-auto min-h-dvh max-w-2xl px-4 pb-24 pt-4">
      <header className="flex h-12 items-center gap-3">
        <Link href="/account" className="grid h-10 w-10 place-items-center rounded-xl border border-[#e3e7de]"><ArrowLeft size={20} /></Link>
        <h1 className="text-lg font-black text-[#18351f]">My orders</h1>
      </header>
      <div className="mt-5 space-y-3">
        {orders.map((order) => {
          const Icon = order.icon;
          return (
            <article key={order.id} className="rounded-2xl border border-[#e8ebe3] bg-white p-4">
              <div className="flex items-center">
                <span className={`grid h-11 w-11 place-items-center rounded-xl ${order.accent}`}><Icon size={20} /></span>
                <div className="ml-3"><h2 className="text-sm font-black text-[#26342a]">{order.id}</h2><p className="mt-1 text-xs text-[#92998f]">{order.items}</p></div>
                <ChevronRight size={18} className="ml-auto text-[#abb2aa]" />
              </div>
              <div className="mt-4 flex items-center border-t border-[#edf0e9] pt-3">
                <div><p className="text-xs font-bold text-[#26342a]">{order.status}</p><p className="mt-1 text-xs text-[#92998f]">{order.eta}</p></div>
                <strong className="ml-auto text-sm">{order.total}</strong>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
