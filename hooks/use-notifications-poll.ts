import { useEffect } from "react";
import { getNotifications } from "../services/domains/notifications";
import { useNotificationsStore } from "../store/notifications";

export function useNotificationsPoll(staffId?: string) {
  const upsert = useNotificationsStore((s) => s.upsertFromResponse);

  useEffect(() => {
    if (!staffId) return;
    let active = true;

    const fetchOnce = async () => {
      try {
        const resp = await getNotifications({
          staffId,
          pageNumber: 1,
          pageSize: 20,
        });
        if (active) upsert(resp);
      } catch {
        // ignore transient errors
      }
    };

    fetchOnce();
    const id = setInterval(fetchOnce, 60_000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, [staffId, upsert]);
}
