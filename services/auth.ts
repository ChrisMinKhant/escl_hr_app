// Simple in-memory auth token store. Extend with SecureStore/AsyncStorage for persistence.
let AUTH_TOKEN: string | undefined;

export function setAuthToken(token?: string) {
  AUTH_TOKEN = token || undefined;
}

export function getAuthToken(): string | undefined {
  return AUTH_TOKEN;
}

export function clearAuthToken() {
  AUTH_TOKEN = undefined;
}

// Optional helper to apply token to manual headers
export function applyAuthHeader(
  headers: Record<string, string> = {}
): Record<string, string> {
  const token = getAuthToken();
  return token ? { ...headers, Authorization: `Bearer ${token}` } : headers;
}
