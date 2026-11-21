const configuredApiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

function getApiBaseUrl() {
  const url = new URL(configuredApiBaseUrl);
  if (
    typeof window !== "undefined" &&
    window.location.protocol === "https:" &&
    url.protocol !== "https:" &&
    url.hostname !== "localhost"
  ) {
    throw new ApiError(
      "The API must use HTTPS in production.",
      0,
      "Insecure API configuration",
    );
  }
  return url.toString().replace(/\/$/, "");
}

let accessToken: string | null = null;

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public detail?: unknown,
  ) {
    super(message);
  }
}

export function getAccessToken() {
  return accessToken;
}

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getAccessToken();
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");
  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let detail: unknown;
    try {
      detail = await response.json();
    } catch {
      detail = undefined;
    }
    const message =
      typeof detail === "object" &&
      detail !== null &&
      "detail" in detail &&
      typeof detail.detail === "string"
        ? detail.detail
        : `Request failed (${response.status})`;
    throw new ApiError(message, response.status, detail);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export function createIdempotencyKey() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `minto-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
