import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL =
  process.env.BACKEND_API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:8000";

function isMutation(request: NextRequest) {
  return ["POST", "PUT", "PATCH", "DELETE"].includes(request.method);
}

export async function handler(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  if (isMutation(request) && request.headers.get("origin") && process.env.NODE_ENV === "production") {
    if (request.headers.get("origin") !== process.env.NEXT_PUBLIC_SITE_URL) {
      return NextResponse.json({ detail: "Invalid origin" }, { status: 403 });
    }
  }

  const { path } = await context.params;
  const store = await cookies();
  const session = store.get("minto_session")?.value;
  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("cookie");
  headers.set("accept", "application/json");
  if (session) headers.set("authorization", `Bearer ${session}`);

  const body = isMutation(request) ? await request.text() : undefined;
  const search = request.nextUrl.search;

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/${path.join("/")}${search}`, {
      method: request.method,
      headers,
      body,
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      { detail: "Minto services are temporarily unavailable." },
      { status: 503 },
    );
  }

  const text = await response.text();
  let payload: unknown;
  try {
    payload = text ? JSON.parse(text) : undefined;
  } catch {
    payload = text;
  }
  return NextResponse.json(payload, { status: response.status });
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
};
