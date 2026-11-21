export default function Loading() {
  return (
    <main className="min-h-dvh bg-[#f7f8f5] p-4">
      <div className="mx-auto max-w-7xl">
        <div className="h-16 animate-pulse rounded-2xl bg-white" />
        <div className="mt-5 h-52 animate-pulse rounded-[22px] bg-[#e7edde]" />
        <div className="mt-7 grid grid-cols-3 gap-3 sm:grid-cols-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-28 animate-pulse rounded-2xl bg-white" />
          ))}
        </div>
      </div>
    </main>
  );
}
