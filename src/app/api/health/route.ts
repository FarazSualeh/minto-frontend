import { NextResponse } from "next/server";

export async function GET() {
  const apiUrl =
    process.env.BACKEND_API_BASE_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "http://localhost:8000";
  try {
    const response = await fetch(`${apiUrl}/health`, {
      cache: "no-store",
      signal: AbortSignal.timeout(3000),
    });
    return NextResponse.json(
      {
        frontend: "ok",
        backend: response.ok ? "ok" : "degraded",
        status: response.status,
      },
      { status: response.ok ? 200 : 503 },
    );
  } catch {
    return NextResponse.json(
      { frontend: "ok", backend: "unavailable" },
      { status: 503 },
    );
  }
}
