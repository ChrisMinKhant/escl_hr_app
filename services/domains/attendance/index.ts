// Attendance domain (status, settings, remote & office + remote approvals)
import { httpRequest } from "../../http-client";
import {
  ApprovalRemoteAttendanceHistoryQuery,
  ApprovalRemoteAttendanceListQuery,
  AttendanceSettingResponseDto,
  AttendanceStatusQuery,
  AttendanceStatusResponseDto,
  CheckInRequestDto,
  CheckInResponseDto,
  CheckOutRequestDto,
  CheckOutResponseDto,
  GetAttendanceSettingQuery,
  OfficeAttendanceHistoryQuery,
  OfficeAttendanceHistoryResponseDto,
  RemoteAttendanceHistoryQuery,
  RemoteAttendanceHistoryResponseDto,
  RequestedRemoteAttendance,
  RespondedRemoteAttedanceHistoryResponseDto,
  SingleRemoteAttendanceQuery,
  WaitingApprovalDecisionResponseDto,
  WaitingRemoteAttendanceApprovalDecisionRequestDto,
  WaitingRemoteAttendanceApprovalResponseDto,
} from "../../types";

// Settings & status
export function getAttendanceSetting(query: GetAttendanceSettingQuery) {
  return httpRequest<AttendanceSettingResponseDto>({
    path: "/api/attendances",
    method: "GET",
    query,
  });
}
export function getAttendanceStatus(query: AttendanceStatusQuery) {
  return httpRequest<AttendanceStatusResponseDto>({
    path: "/api/attendances/status",
    method: "GET",
    query,
  });
}

// Remote check in/out
export function remoteCheckIn(body: CheckInRequestDto) {
  return httpRequest<CheckInResponseDto>({
    path: "/api/remote-check-in",
    method: "POST",
    body,
  });
}
export function remoteCheckOut(body: CheckOutRequestDto) {
  return httpRequest<CheckOutResponseDto>({
    path: "/api/remote-check-out",
    method: "POST",
    body,
  });
}

// Office check in/out
export function officeCheckIn(body: CheckInRequestDto) {
  return httpRequest<CheckInResponseDto>({
    path: "/api/office-check-in",
    method: "POST",
    body,
  });
}
export function officeCheckOut(body: CheckOutRequestDto) {
  return httpRequest<CheckOutResponseDto>({
    path: "/api/office-check-out",
    method: "POST",
    body,
  });
}

// Histories
export function getRemoteAttendanceHistories(
  query: RemoteAttendanceHistoryQuery
) {
  return httpRequest<RemoteAttendanceHistoryResponseDto>({
    path: "/api/attendances/remote-histories",
    method: "GET",
    query,
  });
}
export function getOfficeAttendanceHistories(
  query: OfficeAttendanceHistoryQuery
) {
  return httpRequest<OfficeAttendanceHistoryResponseDto>({
    path: "/api/attendances/office-histories",
    method: "GET",
    query,
  });
}

// Approvals - remote attendance
export function getWaitingRemoteAttendanceApprovalById(
  query: SingleRemoteAttendanceQuery
) {
  return httpRequest<RequestedRemoteAttendance>({
    path: "/api/approvals/single-remote-attendance",
    method: "GET",
    query,
  });
}
export function getWaitingRemoteAttendancesApprovalList(
  query: ApprovalRemoteAttendanceListQuery
) {
  return httpRequest<WaitingRemoteAttendanceApprovalResponseDto>({
    path: "/api/approvals/remote-attendances",
    method: "GET",
    query,
  });
}
export function getRespondedRemoteAttendanceHistories(
  query: ApprovalRemoteAttendanceHistoryQuery
) {
  return httpRequest<RespondedRemoteAttedanceHistoryResponseDto>({
    path: "/api/approvals/remote-attendance-histories",
    method: "GET",
    query,
  });
}
export function respondWaitingRemoteAttendanceApproval(
  body: WaitingRemoteAttendanceApprovalDecisionRequestDto
) {
  return httpRequest<WaitingApprovalDecisionResponseDto>({
    path: "/api/approvals/respond-remote-attendances",
    method: "POST",
    body,
  });
}

export const attendanceApi = {
  getAttendanceSetting,
  getAttendanceStatus,
  remoteCheckIn,
  remoteCheckOut,
  officeCheckIn,
  officeCheckOut,
  getRemoteAttendanceHistories,
  getOfficeAttendanceHistories,
  getWaitingRemoteAttendanceApprovalById,
  getWaitingRemoteAttendancesApprovalList,
  getRespondedRemoteAttendanceHistories,
  respondWaitingRemoteAttendanceApproval,
};
