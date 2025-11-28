// Notifications & announcements domain
import { httpRequest } from "../../http-client";
import {
  AnnouncementListResponseDto,
  NotificationListQuery,
  NotificationListResponseDto,
  PushNotificationRegisterRequestDto,
  SendNotificationByStaffIdRequestDto,
  SendNotificationRequestDto,
  StaffIdQuery,
} from "../../types";

export function sendNotification(body: SendNotificationRequestDto) {
  return httpRequest<number>({
    path: "/api/notifications/send",
    method: "POST",
    body,
  });
}
export function sendNotificationByStaffId(
  body: SendNotificationByStaffIdRequestDto
) {
  return httpRequest<object>({
    path: "/api/notifications/send-by-staffId",
    method: "POST",
    body,
  });
}
export function registerNotificationClient(
  body: PushNotificationRegisterRequestDto
) {
  return httpRequest<boolean>({
    path: "/api/notifications/register",
    method: "POST",
    body,
  });
}
export function getNotifications(query: NotificationListQuery) {
  return httpRequest<NotificationListResponseDto>({
    path: "/api/notifications",
    method: "GET",
    query,
  });
}
export function getAnnouncements(query: StaffIdQuery) {
  return httpRequest<AnnouncementListResponseDto>({
    path: "/api/announcement",
    method: "GET",
    query,
  });
}

export const notificationsApi = {
  sendNotification,
  sendNotificationByStaffId,
  registerNotificationClient,
  getNotifications,
  getAnnouncements,
};
