import { httpRequest } from "./http-client";
import {
  AnnouncementDocumentRequestDto,
  AnnouncementListResponseDto,
  ApprovalLeaveHistoryQuery,
  ApprovalLeaveListQuery,
  ApprovalRemoteAttendanceHistoryQuery,
  ApprovalRemoteAttendanceListQuery,
  ApprovalRequestCountQuery,
  ApprovalRequestCountResponseDto,
  AttendanceSettingResponseDto,
  AttendanceStatusQuery,
  AttendanceStatusResponseDto,
  AttendanceSummaryList,
  CancelLeaveQuery,
  ChangePasswordRequestDto,
  ChangePasswordResponseDto,
  CheckInRequestDto,
  CheckInResponseDto,
  CheckOutRequestDto,
  CheckOutResponseDto,
  DepartmentListResponseDto,
  DocumentRequestDto,
  DocumentResponseDto,
  EmployeeList,
  EmployeeListQuery,
  GetAttendanceSettingQuery,
  LeaveBalanceQuery,
  LeaveBalanceResponseDto,
  LeaveHistoryListQuery,
  LeaveHistoryResponseDto,
  LeaveRequestDto,
  LeaveResponseDto,
  LoginRequestDto,
  LoginResponseDto,
  NotificationListQuery,
  NotificationListResponseDto,
  OfficeAttendanceHistoryQuery,
  OfficeAttendanceHistoryResponseDto,
  ProfileResponseDto,
  ProfileUpdateRequestDto,
  ProfileUpdateResponseDto,
  PushNotificationRegisterRequestDto,
  RemoteAttendanceHistoryQuery,
  RemoteAttendanceHistoryResponseDto,
  RequestedRemoteAttendance,
  RespondedLeaveHistoryResponseDto,
  RespondedRemoteAttedanceHistoryResponseDto,
  SendNotificationByStaffIdRequestDto,
  SendNotificationRequestDto,
  SessionRequestDto,
  SingleLeaveQuery,
  SingleRemoteAttendanceQuery,
  StaffIdQuery,
  TakenLeavesQuery,
  TakenLeavesResponseDto,
  WaitingApprovalDecisionResponseDto,
  WaitingLeaveApprovalDecisionRequestDto,
  WaitingLeaveApprovalResponseDto,
  WaitingRemoteAttendanceApprovalDecisionRequestDto,
  WaitingRemoteAttendanceApprovalResponseDto,
} from "./types";

// API Client encapsulates all endpoints from OpenAPI spec.
export class ApiClient {
  // LOGIN & SESSION
  validateSession(body: SessionRequestDto) {
    return httpRequest<boolean>({
      path: "/api/validate-session",
      method: "POST",
      body,
    });
  }
  login(body: LoginRequestDto) {
    return httpRequest<LoginResponseDto>({
      path: "/api/login",
      method: "POST",
      body,
    });
  }
  chagnePassword(body: ChangePasswordRequestDto) {
    // operationId has a typo in spec
    return httpRequest<ChangePasswordResponseDto>({
      path: "/api/change-password",
      method: "POST",
      body,
    });
  }

  // CHECK IN / OUT (Remote & Office)
  remoteCheckIn(body: CheckInRequestDto) {
    return httpRequest<CheckInResponseDto>({
      path: "/api/remote-check-in",
      method: "POST",
      body,
    });
  }
  remoteCheckOut(body: CheckOutRequestDto) {
    return httpRequest<CheckOutResponseDto>({
      path: "/api/remote-check-out",
      method: "POST",
      body,
    });
  }
  checkIn(body: CheckInRequestDto) {
    return httpRequest<CheckInResponseDto>({
      path: "/api/office-check-in",
      method: "POST",
      body,
    });
  }
  checkOut(body: CheckOutRequestDto) {
    return httpRequest<CheckOutResponseDto>({
      path: "/api/office-check-out",
      method: "POST",
      body,
    });
  }

  // PROFILE
  getProfileData(query: StaffIdQuery) {
    return httpRequest<ProfileResponseDto>({
      path: "/api/profiles",
      method: "GET",
      query,
    });
  }
  updateProfileData(query: StaffIdQuery, body: ProfileUpdateRequestDto) {
    return httpRequest<ProfileUpdateResponseDto>({
      path: "/api/profiles",
      method: "POST",
      query,
      body,
    });
  }
  uploadProfileImages(staffId: string, base64Image: string) {
    return httpRequest<boolean>({
      path: "/api/profile-images/upload",
      method: "POST",
      headers: { "X-Staff-Id": staffId },
      body: base64Image,
    });
  }

  // NOTIFICATIONS
  sendNotification(body: SendNotificationRequestDto) {
    return httpRequest<number>({
      path: "/api/notifications/send",
      method: "POST",
      body,
    });
  }
  sendNotificationByStaffId(body: SendNotificationByStaffIdRequestDto) {
    return httpRequest<object>({
      path: "/api/notifications/send-by-staffId",
      method: "POST",
      body,
    });
  }
  registerClient(body: PushNotificationRegisterRequestDto) {
    return httpRequest<boolean>({
      path: "/api/notifications/register",
      method: "POST",
      body,
    });
  }
  getNotification(query: NotificationListQuery) {
    return httpRequest<NotificationListResponseDto>({
      path: "/api/notifications",
      method: "GET",
      query,
    });
  }

  // ANNOUNCEMENTS
  getAllAnnouncement(query: StaffIdQuery) {
    return httpRequest<AnnouncementListResponseDto>({
      path: "/api/announcement",
      method: "GET",
      query,
    });
  }

  // LEAVES
  getLeaveBalance(query: LeaveBalanceQuery) {
    return httpRequest<LeaveBalanceResponseDto>({
      path: "/api/leaves",
      method: "GET",
      query,
    });
  }
  requestLeave(body: LeaveRequestDto) {
    return httpRequest<LeaveResponseDto>({
      path: "/api/leaves",
      method: "POST",
      body,
    });
  }
  getTakenLeaves(query: TakenLeavesQuery) {
    return httpRequest<TakenLeavesResponseDto>({
      path: "/api/leaves/taken-leaves",
      method: "GET",
      query,
    });
  }
  getLeaveHistoryMonthly(query: LeaveHistoryListQuery) {
    // corresponds to /api/leaves/histories
    return httpRequest<LeaveHistoryResponseDto>({
      path: "/api/leaves/histories",
      method: "GET",
      query,
    });
  }
  cancelPendingLeave(query: CancelLeaveQuery) {
    return httpRequest<boolean>({
      path: "/api/leaves/cancel",
      method: "GET",
      query,
    });
  }

  // DOCUMENTS
  uploadLeaveDocument(
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
  uploadAnnouncementDocument(
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
  downloadLeaveDocument(body: DocumentRequestDto) {
    return httpRequest<DocumentResponseDto>({
      path: "/api/documents/download",
      method: "POST",
      body,
    });
  }
  downloadNotificationDocument(body: AnnouncementDocumentRequestDto) {
    return httpRequest<DocumentResponseDto>({
      path: "/api/documents/download-announcement",
      method: "POST",
      body,
    });
  }

  // ATTENDANCE SETTINGS & STATUS
  getAttendanceSetting(query: GetAttendanceSettingQuery) {
    return httpRequest<AttendanceSettingResponseDto>({
      path: "/api/attendances",
      method: "GET",
      query,
    });
  }
  getAttendanceStatus(query: AttendanceStatusQuery) {
    return httpRequest<AttendanceStatusResponseDto>({
      path: "/api/attendances/status",
      method: "GET",
      query,
    });
  }
  getRemoteAttendanceHistories(query: RemoteAttendanceHistoryQuery) {
    return httpRequest<RemoteAttendanceHistoryResponseDto>({
      path: "/api/attendances/remote-histories",
      method: "GET",
      query,
    });
  }
  getOfficeAttendanceHistories(query: OfficeAttendanceHistoryQuery) {
    return httpRequest<OfficeAttendanceHistoryResponseDto>({
      path: "/api/attendances/office-histories",
      method: "GET",
      query,
    });
  }

  // EMPLOYEES
  fetchEmployeeList(query: EmployeeListQuery) {
    return httpRequest<EmployeeList>({
      path: "/api/employees/list",
      method: "GET",
      query,
    });
  }
  fetchAttendanceSummaryList() {
    return httpRequest<AttendanceSummaryList>({
      path: "/api/employees/attendance-list",
      method: "GET",
    });
  }
  getDepartments() {
    return httpRequest<DepartmentListResponseDto>({
      path: "/api/departments",
      method: "GET",
    });
  }

  // APPROVALS - REMOTE ATTENDANCE
  getWaitingRemoteAttendanceApprovalById(query: SingleRemoteAttendanceQuery) {
    return httpRequest<RequestedRemoteAttendance>({
      path: "/api/approvals/single-remote-attendance",
      method: "GET",
      query,
    });
  }
  getWaitingRemoteAttendancesApprovalList(
    query: ApprovalRemoteAttendanceListQuery
  ) {
    return httpRequest<WaitingRemoteAttendanceApprovalResponseDto>({
      path: "/api/approvals/remote-attendances",
      method: "GET",
      query,
    });
  }
  getRespondedRemoteAttendanceHistories(
    query: ApprovalRemoteAttendanceHistoryQuery
  ) {
    return httpRequest<RespondedRemoteAttedanceHistoryResponseDto>({
      path: "/api/approvals/remote-attendance-histories",
      method: "GET",
      query,
    });
  }
  respondWaitingRemoteAttendanceApproval(
    body: WaitingRemoteAttendanceApprovalDecisionRequestDto
  ) {
    return httpRequest<WaitingApprovalDecisionResponseDto>({
      path: "/api/approvals/respond-remote-attendances",
      method: "POST",
      body,
    });
  }

  // APPROVALS - LEAVES
  getWaitingLeaveApprovalById(query: SingleLeaveQuery) {
    return httpRequest<WaitingLeaveApprovalResponseDto>({
      path: "/api/approvals/single-leave",
      method: "GET",
      query,
    });
  }
  getWaitingLeaveApprovalList(query: ApprovalLeaveListQuery) {
    return httpRequest<WaitingLeaveApprovalResponseDto>({
      path: "/api/approvals/leaves",
      method: "GET",
      query,
    });
  }
  getRespondedLeaveRequests(query: ApprovalLeaveHistoryQuery) {
    return httpRequest<RespondedLeaveHistoryResponseDto>({
      path: "/api/approvals/leave-histories",
      method: "GET",
      query,
    });
  }
  respondWaitingLeaveApproval(body: WaitingLeaveApprovalDecisionRequestDto) {
    return httpRequest<WaitingApprovalDecisionResponseDto>({
      path: "/api/approvals/respond-leaves",
      method: "POST",
      body,
    });
  }

  // APPROVAL COUNT
  getApprovalRequestCount(query: ApprovalRequestCountQuery) {
    return httpRequest<ApprovalRequestCountResponseDto>({
      path: "/api/approvals/count",
      method: "GET",
      query,
    });
  }
}

// Singleton instance (optional usage)
export const apiClient = new ApiClient();
