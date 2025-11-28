import { create } from "zustand";
import { NotificationListResponseDto } from "../services/types";

export interface NotificationItem {
  id: number;
  title?: string;
  message?: string;
  pushedDate?: string;
  read: boolean;
}

interface NotificationsState {
  notifications: NotificationItem[];
  unreadCount: number;
  upsertFromResponse: (resp: NotificationListResponseDto) => void;
  markRead: (id: number) => void;
  markManyRead: (ids: number[]) => void;
  reset: () => void;
}

export const useNotificationsStore = create<NotificationsState>((set) => ({
  notifications: [],
  unreadCount: 0,
  upsertFromResponse: (resp) =>
    set((state) => {
      const list = resp.notificationList ?? [];
      const map = new Map<number, NotificationItem>(
        state.notifications.map((n) => [n.id, n])
      );
      for (const n of list) {
        if (!n.id) continue;
        const prev = map.get(n.id);
        if (!prev) {
          map.set(n.id, {
            id: n.id,
            title: n.title,
            message: n.message,
            pushedDate: n.pushedDate,
            read: false,
          });
        } else {
          map.set(n.id, {
            ...prev,
            title: n.title,
            message: n.message,
            pushedDate: n.pushedDate,
          });
        }
      }
      const merged = Array.from(map.values()).sort((a, b) =>
        (b.pushedDate ?? "").localeCompare(a.pushedDate ?? "")
      );
      const unreadCount = merged.reduce((acc, n) => acc + (n.read ? 0 : 1), 0);
      return { notifications: merged, unreadCount };
    }),
  markRead: (id) =>
    set((state) => {
      const updated = state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      );
      const unreadCount = updated.reduce((acc, n) => acc + (n.read ? 0 : 1), 0);
      return { notifications: updated, unreadCount };
    }),
  markManyRead: (ids) =>
    set((state) => {
      const setIds = new Set(ids);
      const updated = state.notifications.map((n) =>
        setIds.has(n.id) ? { ...n, read: true } : n
      );
      const unreadCount = updated.reduce((acc, n) => acc + (n.read ? 0 : 1), 0);
      return { notifications: updated, unreadCount };
    }),
  reset: () => set({ notifications: [], unreadCount: 0 }),
}));

export const useUnreadCount = () => useNotificationsStore((s) => s.unreadCount);
