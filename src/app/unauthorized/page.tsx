import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="grid min-h-dvh place-items-center bg-[#f7f8f5] px-5">
      <div className="max-w-sm text-center">
        <p className="text-5xl">🔒</p>
        <h1 className="mt-5 text-2xl font-black text-[#26342a]">Access denied</h1>
        <p className="mt-2 text-sm leading-6 text-[#92998f]">
          Your account does not have permission to view this page.
        </p>
        <Link href="/home" className="mt-5 inline-flex h-11 items-center rounded-xl bg-[#1d6f3b] px-5 text-sm font-bold text-white">
          Return home
        </Link>
      </div>
    </main>
  );
}
