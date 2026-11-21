import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL =
  process.env.BACKEND_API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:8000";

const SESSION_COOKIE = "minto_session";
const ROLE_COOKIE = "minto_role";

function getBearerCookie(value: string | undefined) {
  return value ? `Bearer ${value}` : null;
}

function getToken(payload: unknown) {
  if (!payload || typeof payload !== "object") return null;
  const record = payload as Record<string, unknown>;
  const token = record.access_token ?? record.token;
  return typeof token === "string" ? token : null;
}

function getRole(payload: unknown) {
  if (!payload || typeof payload !== "object") return "customer";
  const record = payload as Record<string, unknown>;
  if (typeof record.role === "string") return record.role;
  const user = record.user;
  if (user && typeof user === "object") {
    const role = (user as Record<string, unknown>).role;
    if (typeof role === "string") return role;
  }
  return "customer";
}

function getCookieMaxAge(token: string) {
  try {
    const payloadPart = token.split(".")[1];
    if (!payloadPart) return 60 * 60 * 24;
    const payload = JSON.parse(
      Buffer.from(payloadPart.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString(),
    ) as { exp?: number };
    if (payload.exp) return Math.max(60, payload.exp - Math.floor(Date.now() / 1000));
  } catch {
    // Non-JWT backend tokens use the same bounded session lifetime.
  }
  return 60 * 60 * 24;
}

function isMutation(request: NextRequest) {
  return ["POST", "PUT", "PATCH", "DELETE"].includes(request.method);
}

function hasValidOrigin(request: NextRequest) {
  if (process.env.NODE_ENV !== "production") return true;
  const origin = request.headers.get("origin");
  if (!origin) return true;
  return origin === process.env.NEXT_PUBLIC_SITE_URL;
}

export async function handler(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  if (isMutation(request) && !hasValidOrigin(request)) {
    return NextResponse.json({ detail: "Invalid origin" }, { status: 403 });
  }

  const { path } = await context.params;
  const action = path.join("/");
  const store = await cookies();
  const session = store.get(SESSION_COOKIE)?.value;

  const headers = new Headers();
  headers.set("Accept", "application/json");
  headers.set("Content-Type", "application/json");
  if (session) {
    const authorization = getBearerCookie(session);
    if (authorization) headers.set("Authorization", authorization);
  }

  let body: string | undefined;
  if (isMutation(request)) {
    body = await request.text();
  }

  const search = request.nextUrl.search;
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/auth/${action}${search}`, {
      method: request.method,
      headers,
      body,
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      { detail: "Authentication service is unavailable. Please try again." },
      { status: 503 },
    );
  }

  const text = await response.text();
  let payload: unknown = undefined;
  try {
    payload = text ? JSON.parse(text) : undefined;
  } catch {
    payload = text;
  }

  const next = NextResponse.json(payload, { status: response.status });

  if (action === "login" && response.ok) {
    const token = getToken(payload);
    if (token) {
      const maxAge = getCookieMaxAge(token);
      let role = getRole(payload);
      try {
        const profileResponse = await fetch(`${API_BASE_URL}/api/auth/me`, {
          headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
          cache: "no-store",
        });
        if (profileResponse.ok) {
          const profile = (await profileResponse.json()) as Record<string, unknown>;
          role =
            typeof profile.role === "string"
              ? profile.role
              : typeof (profile.user as Record<string, unknown> | undefined)?.role === "string"
                ? String((profile.user as Record<string, unknown>).role)
                : role;
        }
      } catch {
        // Keep the role returned by the login response.
      }
      if (payload && typeof payload === "object") {
        payload = {
          ...(payload as Record<string, unknown>),
          user: {
            ...(typeof (payload as Record<string, unknown>).user === "object"
              ? ((payload as Record<string, unknown>).user as Record<string, unknown>)
              : {}),
            role,
          },
        };
      }
      next.cookies.set(SESSION_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge,
      });
      next.cookies.set(ROLE_COOKIE, role.toLowerCase(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge,
      });
    }
  }

  if (action === "logout" && response.ok) {
    next.cookies.delete(SESSION_COOKIE);
    next.cookies.delete(ROLE_COOKIE);
  }

  return next;
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
};
