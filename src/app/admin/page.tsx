"use client";

import { Bell, Box, ChevronDown, CircleCheck, LayoutDashboard, Search, ShieldCheck, Store, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import type { User } from "@/lib/types";

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const payload = await apiRequest<User[] | { items: User[] }>("/api/admin/users");
      setUsers(Array.isArray(payload) ? payload : payload.items ?? []);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not load users.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let active = true;
    apiRequest<User[] | { items: User[] }>("/api/admin/users")
      .then((payload) => {
        if (active) setUsers(Array.isArray(payload) ? payload : payload.items ?? []);
      })
      .catch((caught) => {
        if (active) setError(caught instanceof Error ? caught.message : "Could not load users.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  async function updateStatus(userId: number, status: "approved" | "inactive") {
    try {
      await apiRequest(`/api/admin/users/${userId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      await load();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not update user.");
    }
  }
  return (
    <main className="min-h-dvh bg-[#f5f7f2] pb-20 md:pb-0">
      <aside className="hidden w-60 border-r border-[#e5e9df] bg-white p-5 md:fixed md:inset-y-0 md:left-0 md:flex md:flex-col">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#1d6f3b] text-lg font-black text-white">M</span>
          <div><p className="font-black text-[#18351f]">Minto</p><p className="text-xs text-[#92998f]">Admin</p></div>
        </div>
        <nav className="mt-8 space-y-2 text-sm font-bold">
          <a className="flex h-11 items-center gap-3 rounded-xl bg-[#edf5e9] px-3 text-[#1d6f3b]"><LayoutDashboard size={18} /> Overview</a>
          <a className="flex h-11 items-center gap-3 rounded-xl px-3 text-[#6e786f]"><Users size={18} /> Users</a>
          <a className="flex h-11 items-center gap-3 rounded-xl px-3 text-[#6e786f]"><Store size={18} /> Shops</a>
          <a className="flex h-11 items-center gap-3 rounded-xl px-3 text-[#6e786f]"><Box size={18} /> Catalog</a>
        </nav>
      </aside>
      <div className="md:ml-60">
        <header className="flex h-16 items-center border-b border-[#e5e9df] bg-white px-4 md:px-8">
          <h1 className="text-lg font-black text-[#18351f]">Overview</h1>
          <button className="ml-auto grid h-10 w-10 place-items-center rounded-xl border border-[#e5e9df]"><Bell size={19} /></button>
        </header>
        <div className="mx-auto max-w-6xl px-4 py-5 md:px-8">
          <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              ["Users", "1,284", Users],
              ["Active shops", "18", Store],
              ["Products", "426", Box],
              ["Today orders", "84", CircleCheck],
            ].map(([label, value, Icon]) => {
              const MetricIcon = Icon as typeof Users;
              return (
                <article key={String(label)} className="rounded-2xl border border-[#e5e9df] bg-white p-4">
                  <MetricIcon size={18} className="text-[#1d6f3b]" />
                  <p className="mt-3 text-xl font-black text-[#26342a]">{String(value)}</p>
                  <p className="mt-1 text-xs text-[#92998f]">{String(label)}</p>
                </article>
              );
            })}
          </section>
          <section className="mt-6 rounded-2xl border border-[#e5e9df] bg-white">
            <div className="border-b border-[#edf0e9] p-4">
              <div className="flex items-center justify-between">
                <h2 className="font-black text-[#18351f]">Partner approvals</h2>
                <button className="flex h-9 items-center gap-2 rounded-lg border border-[#e5e9df] px-3 text-xs font-bold">All roles <ChevronDown size={14} /></button>
              </div>
              <div className="mt-3 flex h-10 items-center gap-2 rounded-xl bg-[#f5f7f2] px-3 text-sm text-[#92998f]">
                <Search size={17} /> Search users
              </div>
            </div>
            <div className="divide-y divide-[#edf0e9]">
              {loading ? (
                Array.from({ length: 3 }).map((_, index) => <div key={index} className="h-20 animate-pulse bg-white" />)
              ) : error ? (
                <div className="p-4">
                  <p className="text-sm font-bold text-[#9d5a50]">Users unavailable</p>
                  <p className="mt-1 text-xs text-[#92998f]">{error}</p>
                  <button onClick={load} className="mt-3 h-9 rounded-lg bg-[#1d6f3b] px-3 text-xs font-bold text-white">Retry</button>
                </div>
              ) : users.length === 0 ? (
                <p className="p-8 text-center text-sm text-[#92998f]">No users found.</p>
              ) : users.map((user) => (
                <article key={user.name} className="flex items-center gap-3 p-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#edf5e9] text-xs font-black text-[#1d6f3b]">{user.name.slice(0, 2).toUpperCase()}</span>
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-black text-[#26342a]">{user.name}</h3>
                    <p className="mt-1 truncate text-xs text-[#92998f]">{user.role} · {user.phone ?? user.email ?? "No contact"}</p>
                  </div>
                  <div className="ml-auto">
                    {!user.is_approved ? (
                      <button onClick={() => updateStatus(user.id, "approved")} className="h-9 rounded-lg bg-[#1d6f3b] px-3 text-xs font-bold text-white">Approve</button>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-bold text-[#1d6f3b]"><ShieldCheck size={14} /> Approved</span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-20 grid h-16 grid-cols-4 border-t border-[#e5e9df] bg-white md:hidden">
        <button className="flex flex-col items-center justify-center gap-1 text-[10px] font-bold text-[#1d6f3b]"><LayoutDashboard size={19} />Overview</button>
        <button className="flex flex-col items-center justify-center gap-1 text-[10px] font-bold text-[#92998f]"><Users size={19} />Users</button>
        <button className="flex flex-col items-center justify-center gap-1 text-[10px] font-bold text-[#92998f]"><Store size={19} />Shops</button>
        <button className="flex flex-col items-center justify-center gap-1 text-[10px] font-bold text-[#92998f]"><Box size={19} />Catalog</button>
      </nav>
    </main>
  );
}
