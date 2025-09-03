export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestOptions<TBody> {
  method?: HttpMethod;
  path: string;
  body?: TBody;
  query?: Record<string, string | number | boolean | undefined | null>;
}

export interface ApiErrorShape {
  status: number;
  message: string;
  details?: unknown;
}

function getBaseUrl(): string {
  const envBase = import.meta.env.VITE_API_BASE_URL as string | undefined;
  const fallback = "https://postpilotai-be-production.up.railway.app";
  const base = (envBase ?? fallback).replace(/\/$/, "");
  return base;
}

function buildUrl(path: string, query?: RequestOptions<unknown>["query"]): string {
  const base = getBaseUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${base}${normalizedPath}`);
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") return;
      url.searchParams.set(key, String(value));
    });
  }
  return url.toString();
}

export async function fetchJson<TResponse, TBody = unknown>(options: RequestOptions<TBody>): Promise<TResponse> {
  const { method = "GET", path, body, query } = options;
  const url = buildUrl(path, query);

  const init: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  };

  const res = await fetch(url, init);
  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  if (!res.ok) {
    const errorPayload = isJson ? await res.json().catch(() => undefined) : await res.text().catch(() => undefined);
    const err: ApiErrorShape = {
      status: res.status,
      message: (errorPayload && (errorPayload.message || errorPayload.error)) || res.statusText || "Request failed",
      details: errorPayload,
    };
    throw err;
  }
  return (isJson ? res.json() : (undefined as unknown)) as TResponse;
}


