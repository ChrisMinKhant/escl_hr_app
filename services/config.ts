// Base URL configuration for API client.
// Provides runtime mutability and optional persistence (AsyncStorage) if desired.
// For now we keep it simple; you can extend with Expo Constants or env vars.

let BASE_URL = "http://localhost:8084"; // default from api-docs.yaml

export interface ApiConfigOptions {
  baseUrl?: string;
}

export function configureApi(options: ApiConfigOptions) {
  if (options.baseUrl) {
    BASE_URL = options.baseUrl.replace(/\/$/, ""); // remove trailing slash
  }
}

export function getBaseUrl() {
  return BASE_URL;
}

// Convenience helper to temporarily override within a scope
export async function withBaseUrl<T>(
  url: string,
  fn: () => Promise<T>
): Promise<T> {
  const prev = BASE_URL;
  configureApi({ baseUrl: url });
  try {
    return await fn();
  } finally {
    configureApi({ baseUrl: prev });
  }
}
