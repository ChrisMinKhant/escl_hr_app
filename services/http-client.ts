import { getAuthToken } from "./auth";
import { getBaseUrl } from "./config";
import { ApiError, ErrorResponseDto } from "./types";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestOptions<Q = any, B = any> {
  path: string; // starts with '/api/...'
  method?: HttpMethod;
  query?: Q;
  body?: B;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

function buildQuery(query: any): string {
  if (!query) return "";
  const entries = Object.entries(query).filter(
    ([, v]) => v !== undefined && v !== null
  );
  if (!entries.length) return "";
  const params = entries
    .map(([k, v]) => {
      if (Array.isArray(v)) {
        return v
          .map(
            (item) =>
              `${encodeURIComponent(k)}=${encodeURIComponent(String(item))}`
          )
          .join("&");
      }
      return `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`;
    })
    .join("&");
  return params ? `?${params}` : "";
}

export async function httpRequest<TResponse = any, TError = ErrorResponseDto>(
  options: RequestOptions
): Promise<TResponse> {
  const { path, method = "GET", query, body, headers = {}, signal } = options;
  const base = getBaseUrl();
  const url = base + path + buildQuery(query);

  const token = getAuthToken();
  const finalHeaders: Record<string, string> = {
    Accept: "application/json",
    ...(body !== undefined && body !== null
      ? { "Content-Type": "application/json" }
      : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  };

  let response: Response;
  try {
    response = await fetch(url, {
      method,
      headers: finalHeaders,
      body:
        body !== undefined && body !== null ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (networkErr: any) {
    throw new ApiError(
      networkErr.message || "Network error",
      undefined,
      networkErr
    );
  }

  let data: any = null;
  const text = await response.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!response.ok) {
    // Attempt to map ErrorResponseDto
    const errPayload: TError | ErrorResponseDto | any = data;
    const message =
      (errPayload && (errPayload as any).reason) ||
      `Request failed (${response.status})`;
    throw new ApiError(message, response.status, errPayload);
  }

  return data as TResponse;
}

// Convenience wrapper for cancellation support
export function createAbortController() {
  return new AbortController();
}

export interface PaginatedResult<T> {
  items: T[];
  pageNumber?: number;
  totalPages?: number;
}
