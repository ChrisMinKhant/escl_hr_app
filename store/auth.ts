import { create } from "zustand";
import { ProfileResponseDto } from "../services/types";

// Auth state structure
export interface AuthState {
  token?: string;
  profile?: ProfileResponseDto;
  hydrated: boolean; // if using persistence later
  // actions
  setLogin: (token: string, profile: ProfileResponseDto) => void;
  updateProfile: (partial: Partial<ProfileResponseDto>) => void;
  clearAuth: () => void;
  setHydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: undefined,
  profile: undefined,
  hydrated: true, // set to false if adding persist middleware
  setLogin: (token, profile) => set(() => ({ token, profile })),
  updateProfile: (partial) =>
    set((state) => ({ profile: { ...state.profile, ...partial } })),
  clearAuth: () => set(() => ({ token: undefined, profile: undefined })),
  setHydrated: (value) => set(() => ({ hydrated: value })),
}));

// Selectors (hooks) for convenience
export const useIsLoggedIn = () => useAuthStore((s) => !!s.token);
export const useProfile = () => useAuthStore((s) => s.profile);
export const useAuthToken = () => useAuthStore((s) => s.token);

// Helper to sync token with service layer auth.ts (optional)
import { clearAuthToken, setAuthToken } from "../services/auth";
useAuthStore.subscribe((state, prev) => {
  if (state.token !== prev.token) {
    if (state.token) setAuthToken(state.token);
    else clearAuthToken();
  }
});

// Future persistence example (commented):
// import { persist } from 'zustand/middleware';
// export const useAuthStore = create<AuthState>()(
//   persist((set) => ({ ... }), { name: 'auth-store' })
// );
