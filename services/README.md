# Service Layer

This folder contains a lightweight, fully typed service layer built from `api-docs.yaml`.

## Files

- `types.ts` – TypeScript interfaces & helper query types derived from the OpenAPI schemas. Includes an `ApiError` class.
- `config.ts` – Base URL configuration + runtime override helpers.
- `http-client.ts` – Generic `httpRequest` function built on `fetch`, automatic JSON parsing, query serialization, unified error handling.
- `apiClient.ts` – `ApiClient` class exposing one method per backend operation; also exports a singleton `apiClient`.

## Usage

```ts
import { apiClient } from "../services/apiClient";
import { configureApi } from "../services/config";
import { setAuthToken, clearAuthToken } from "../services/auth";
import { useAuthStore, useIsLoggedIn, useProfile } from "../store/auth";

// Optionally override base URL at app start (e.g. environment, user selection)
configureApi({ baseUrl: "https://staging.example.com" });

// After successful login
setAuthToken("jwt_token_here");

async function loadProfile(staffId: string) {
  try {
    const profile = await apiClient.getProfileData({ staffId });
    console.log(profile?.name);
    // Persist in zustand (assuming token already set earlier)
    const { token, setLogin } = useAuthStore.getState();
    if (token && profile) setLogin(token, profile);
  } catch (e) {
    if (e instanceof Error) console.warn("Profile load failed:", e.message);
  }
}

// When logging out
clearAuthToken();
```

## Runtime Override (Scoped)

```ts
import { withBaseUrl } from "../services/config";

await withBaseUrl("https://temporary-host", async () => {
  const result = await apiClient.getLeaveBalance({ staffId: "S123" });
  console.log(result);
});
```

## Error Handling

All non-2xx responses throw `ApiError` with `status` and parsed backend error payload (expected to match `ErrorResponseDto`).

```ts
try {
  await apiClient.requestLeave({
    staffId: "S1",
    leaveTypeId: 2,
    requestedDates: ["2025-11-23"],
    duration: "ALLDAY",
  });
} catch (err) {
  if (err instanceof ApiError) {
    console.error(err.status, err.payload);
  }
}
```

## Cancellation

```ts
import { createAbortController } from "../services/http-client";

const c = createAbortController();
apiClient
  .getNotification({ staffId: "S1", pageNumber: 1, pageSize: 20 })
  .catch((e) => console.log(e));
// Later
c.abort();
```

(You can pass `signal: c.signal` to `httpRequest`; adapt `apiClient` methods if you need signals widely.)

## Extending

- Add auth headers: wrap `httpRequest` or create a subclass of `ApiClient` injecting a token.
- Add response validation: integrate a runtime schema validator (e.g. `zod`).
- Enable persistent configurable base URL: integrate secure storage / AsyncStorage.
- Persist auth token: use Expo SecureStore or AsyncStorage inside `setAuthToken`.
- Persist zustand auth store: uncomment persist example in `store/auth.ts`.

## Notes

- All fields are optional to stay resilient to partial responses; mark required ones as you gain certainty.
- Operation `chagnePassword` keeps spec typo for easier future codegen matching. Create an alias if needed.
- Authorization header automatically added when a token is set via `setAuthToken`.
- Logged in employee data stored globally in `useAuthStore` (token + `ProfileResponseDto`).
