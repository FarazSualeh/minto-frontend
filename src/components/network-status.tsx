"use client";

import { WifiOff } from "lucide-react";
import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

function getSnapshot() {
  return navigator.onLine;
}

function getServerSnapshot() {
  return true;
}

export function NetworkStatus() {
  const online = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (online) return null;
  return (
    <div
      role="alert"
      className="fixed left-1/2 top-3 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#26342a] px-4 py-2 text-xs font-bold text-white shadow-lg"
    >
      <WifiOff size={15} />
      You are offline
    </div>
  );
}
