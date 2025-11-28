// Documents domain (leave & announcement documents)
import { httpRequest } from "../../http-client";
import {
  AnnouncementDocumentRequestDto,
  DocumentRequestDto,
  DocumentResponseDto,
} from "../../types";

export function uploadLeaveDocument(
  fileName: string,
  fileType: string,
  leaveTakenId: number,
  base64Content: string
) {
  return httpRequest<boolean>({
    path: "/api/documents/upload",
    method: "POST",
    headers: {
      "X-File-Name": fileName,
      "X-File-Type": fileType,
      "Leave-Taken-Id": String(leaveTakenId),
    },
    body: base64Content,
  });
}

export function uploadAnnouncementDocument(
  fileName: string,
  fileType: string,
  notificationId: number,
  base64Content: string
) {
  return httpRequest<boolean>({
    path: "/api/documents/upload-announcement",
    method: "POST",
    headers: {
      "X-File-Name": fileName,
      "X-File-Type": fileType,
      "Notification-Id": String(notificationId),
    },
    body: base64Content,
  });
}

export function downloadLeaveDocument(body: DocumentRequestDto) {
  return httpRequest<DocumentResponseDto>({
    path: "/api/documents/download",
    method: "POST",
    body,
  });
}
export function downloadAnnouncementDocument(
  body: AnnouncementDocumentRequestDto
) {
  return httpRequest<DocumentResponseDto>({
    path: "/api/documents/download-announcement",
    method: "POST",
    body,
  });
}

export const documentsApi = {
  uploadLeaveDocument,
  uploadAnnouncementDocument,
  downloadLeaveDocument,
  downloadAnnouncementDocument,
};
