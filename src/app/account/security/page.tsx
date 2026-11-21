"use client";

import { ArrowLeft, LockKeyhole, UserRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import type { User } from "@/lib/types";

export default function SecurityPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    apiRequest<User>("/api/auth/me")
      .then((profile) => {
        if (!active) return;
        setName(profile.name ?? "");
        setPhone(profile.phone ?? "");
        setEmail(profile.email ?? "");
      })
      .catch((caught) => {
        if (active) setError(caught instanceof Error ? caught.message : "Could not load profile.");
      });
    return () => {
      active = false;
    };
  }, []);

  async function saveProfile(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    try {
      await apiRequest("/api/auth/profile", {
        method: "PUT",
        body: JSON.stringify({ name, phone, email: email || null }),
      });
      setMessage("Profile updated.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Profile update failed.");
    } finally {
      setBusy(false);
    }
  }

  async function changePassword(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    try {
      await apiRequest("/api/auth/change-password", {
        method: "POST",
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
        }),
      });
      setCurrentPassword("");
      setNewPassword("");
      setMessage("Password changed.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Password change failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto min-h-dvh max-w-2xl px-4 pb-24 pt-4">
      <header className="flex h-12 items-center gap-3">
        <Link href="/account" className="grid h-10 w-10 place-items-center rounded-xl border border-[#e3e7de]">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-lg font-black text-[#18351f]">Profile & password</h1>
      </header>

      {message && <p role="status" className="mt-5 rounded-xl bg-[#edf5e9] p-3 text-sm font-bold text-[#1d6f3b]">{message}</p>}
      {error && <p role="alert" className="mt-5 rounded-xl border border-[#eadfd7] bg-[#fffaf7] p-3 text-sm text-[#9d5a50]">{error}</p>}

      <form onSubmit={saveProfile} className="mt-5 rounded-2xl border border-[#e8ebe3] bg-white p-4">
        <div className="flex items-center gap-2 font-black text-[#26342a]"><UserRound size={18} className="text-[#1d6f3b]" /> Profile</div>
        <label className="mt-4 block">
          <span className="mb-2 block text-sm font-bold">Full name</span>
          <input value={name} onChange={(event) => setName(event.target.value)} required className="h-12 w-full rounded-xl border border-[#dce3d7] px-4 outline-none" />
        </label>
        <label className="mt-4 block">
          <span className="mb-2 block text-sm font-bold">Phone</span>
          <input value={phone} onChange={(event) => setPhone(event.target.value)} className="h-12 w-full rounded-xl border border-[#dce3d7] px-4 outline-none" />
        </label>
        <label className="mt-4 block">
          <span className="mb-2 block text-sm font-bold">Email</span>
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="h-12 w-full rounded-xl border border-[#dce3d7] px-4 outline-none" />
        </label>
        <button disabled={busy} className="mt-4 h-11 w-full rounded-xl bg-[#1d6f3b] text-sm font-bold text-white disabled:opacity-60">
          Save profile
        </button>
      </form>

      <form onSubmit={changePassword} className="mt-4 rounded-2xl border border-[#e8ebe3] bg-white p-4">
        <div className="flex items-center gap-2 font-black text-[#26342a]"><LockKeyhole size={18} className="text-[#1d6f3b]" /> Change password</div>
        <label className="mt-4 block">
          <span className="mb-2 block text-sm font-bold">Current password</span>
          <input type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} required className="h-12 w-full rounded-xl border border-[#dce3d7] px-4 outline-none" />
        </label>
        <label className="mt-4 block">
          <span className="mb-2 block text-sm font-bold">New password</span>
          <input type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} required minLength={8} className="h-12 w-full rounded-xl border border-[#dce3d7] px-4 outline-none" />
        </label>
        <button disabled={busy} className="mt-4 h-11 w-full rounded-xl border border-[#1d6f3b] text-sm font-bold text-[#1d6f3b] disabled:opacity-60">
          Change password
        </button>
      </form>
    </main>
  );
}
