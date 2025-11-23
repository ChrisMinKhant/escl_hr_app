/* Auto-generated (manually transcribed) TypeScript interfaces from api-docs.yaml.
   NOTE: Adjust optionality as backend clarifies which fields are always present.
   All date/date-time fields are represented as ISO8601 strings. */

export interface SessionRequestDto {
  staffId?: string;
  deviceInfo?: string;
}
export interface ErrorResponseDto {
  code?: string;
  reason?: string;
}

export interface CheckOutRequestDto {
  date?: string;
  checkOutTime?: string;
  staffId?: string;
  location?: string;
  reason?: string;
}
export interface CheckOutResponseDto {
  checkedOutTime?: string;
}

export interface CheckInRequestDto {
  date?: string;
  checkInTime?: string;
  staffId?: string;
  location?: string;
  reason?: string;
}
export interface CheckInResponseDto {
  checkedInTime?: string;
}

export interface ProfileUpdateRequestDto {
  name?: string;
  nrc?: string;
  nrcMm?: string;
  mobile?: string;
  email?: string;
  address?: string;
  image?: string;
}
export interface ProfileUpdateResponseDto {
  fieldName?: string;
  updatedValue?: string;
}

export interface SendNotificationRequestDto {
  senderId?: string;
  channel?: string;
  title?: string;
  message?: string;
}
export interface SendNotificationByStaffIdRequestDto {
  senderId?: string;
  staffId?: string;
  title?: string;
  message?: string;
}
export interface PushNotificationRegisterRequestDto {
  staffId?: string;
  channel?: string;
  pushToken?: string;
}

export interface LoginRequestDto {
  username?: string;
  password?: string;
  deviceInfo?: string;
}
export interface LoginResponseDto {
  token?: string;
}

export interface LeaveRequestDto {
  staffId?: string;
  leaveTypeId?: number;
  requestedDates?: string[];
  duration?: string;
  reason?: string;
}
export interface LeaveBalance {
  leaveTypeName?: string;
  leaveTypeId?: number;
  availableLeave?: number;
  remainedLeave?: number;
}
export interface LeaveBalanceResponseDto {
  leaveBalanceList?: LeaveBalance[];
}
export interface LeaveResponseDto {
  leaveId?: number;
  leaveBalance?: LeaveBalanceResponseDto;
}

export interface DocumentRequestDto {
  leaveTakenId?: number;
  documentName?: string;
}
export interface DocumentResponseDto {
  documentName?: string;
  encodedDocument?: string;
}
export interface AnnouncementDocumentRequestDto {
  notificationId?: number;
  documentName?: string;
}

export interface ChangePasswordRequestDto {
  username?: string;
  newPassword?: string;
}
export interface ChangePasswordResponseDto {
  staffId?: string;
}

export interface WaitingRemoteAttendanceApprovalDecisionRequestDto {
  staffId?: string;
  remoteAttendanceId?: number;
  decision?: string;
  approverMessage?: string;
}
export interface WaitingApprovalDecisionResponseDto {
  respondedApprovalId?: number;
}

export interface WaitingLeaveApprovalDecisionRequestDto {
  staffId?: string;
  leaveId?: number;
  decision?: string;
  approverMessage?: string;
}

export interface Manager {
  name?: string;
  position?: string;
}
export interface ProfileResponseDto {
  image?: string;
  username?: string;
  name?: string;
  myanmarName?: string;
  staffId?: string;
  gender?: string;
  dob?: string;
  nrc?: string;
  nrcMm?: string;
  ssbNo?: string;
  mobile?: string;
  email?: string;
  address?: string;
  permanentAddress?: string;
  position?: string;
  department?: string;
  joinedDate?: string;
  totalWorkingDays?: string;
  manager?: Manager;
  autoCheckIn?: boolean;
}

export interface NotificationResponse {
  id?: number;
  title?: string;
  message?: string;
  documentList?: string[];
  pushedDate?: string;
}
export interface NotificationListResponseDto {
  notificationList?: NotificationResponse[];
  pageNumber?: number;
  totalPages?: number;
}

export interface TakenLeavesResponseDto {
  takenLeaves?: string[];
}

export interface Document {
  documentName?: string;
  leaveTakenId?: number;
}
export type LeaveStatus = "ALLDAY" | "MORNING" | "EVENING";
export interface LeaveHistory {
  leaveId?: number;
  leaveType?: string;
  takenDates?: string[];
  leaveStatus?: LeaveStatus;
  reason?: string;
  documentList?: Document[];
  approveStatus?: string;
  approverMessage?: string;
  requestedAt?: string;
}
export interface LeaveHistoryResponseDto {
  leaveHistoryList?: LeaveHistory[];
  pageNumber?: number;
  totalPages?: number;
}

export interface Employee {
  username?: string;
  name?: string;
  myanmarName?: string;
  staffId?: string;
  gender?: string;
  dob?: string;
  nrc?: string;
  nrcMm?: string;
  ssbNo?: string;
  mobile?: string;
  email?: string;
  address?: string;
  permanentAddress?: string;
  position?: string;
  department?: string;
  joinedDate?: string;
  totalWorkingDays?: string;
  manager?: Manager;
  attendanceStatus?: string;
}
export interface EmployeeList {
  employeeList?: Employee[];
}

export interface AttendanceSummary {
  department?: string;
  recordList?: Record<string, number>;
}
export interface AttendanceSummaryList {
  attendanceSummaryList?: AttendanceSummary[];
}

export interface DepartmentListResponseDto {
  departmentName?: string[];
}

export interface GeoLocation {
  locationName?: string;
  latitude?: string;
  longitude?: string;
  radius?: number;
}
export interface WorkingDayAndHours {
  date?: string;
  officeStartTime?: string;
  officeEndTime?: string;
  duration?: number;
  allowedLateMinute?: number;
  allowedEarlyMinute?: number;
}
export interface AttendanceSettingResponseDto {
  holidays?: string[];
  workingDaysAndHours?: WorkingDayAndHours[];
  onSiteLocation?: GeoLocation;
  ipAddress?: string[];
}

export interface AttendanceStatusResponseDto {
  latePercentage?: number;
  workPercentage?: number;
  earlyPercentage?: number;
  checkedIn?: boolean;
  checkedOut?: boolean;
}

export interface RemoteAttendanceHistory {
  attendanceType?: string;
  attendanceTime?: string;
  latitude?: string;
  longitude?: string;
  reason?: string;
  approverMessage?: string;
  approveStatus?: string;
  requestedAt?: string;
}
export interface RemoteAttendanceHistoryResponseDto {
  remoteAttendanceHistoryList?: RemoteAttendanceHistory[];
  pageNumber?: number;
  pageSize?: number;
}

export interface OfficeAttendance {
  date?: string;
  checkedInTime?: string;
  checkedOutTime?: string;
  checkInStatus?: string;
  checkOutStatus?: string;
  absent?: boolean;
}
export interface OfficeAttendanceHistoryResponseDto {
  officeAttendanceHistory?: OfficeAttendance[];
  totalPages?: number;
}

export interface RequestedRemoteAttendance {
  remoteAttendanceId?: number;
  employeeName?: string;
  employeeDempartment?: string;
  staffId?: string;
  latitude?: string;
  longitude?: string;
  reason?: string;
  approveStatus?: string;
  approverMessage?: string;
  attendanceType?: string;
  attendanceTime?: string;
  requestedAt?: string;
}
export interface RequestedLeave {
  staffId?: string;
  leaveTypeId?: number;
  leaveTypeName?: string;
  requestedDates?: string[];
  leaveStatus?: string;
  reason?: string;
  approveStatus?: string;
  approverMessage?: string;
  documentList?: Document[];
  requestedAt?: string;
}
export interface WaitingLeaveApproval {
  leaveId?: number;
  employeeName?: string;
  employeeDepartment?: string;
  leaveRequest?: RequestedLeave;
}
export interface WaitingRemoteAttendanceApprovalResponseDto {
  requestedRemoteAttendanceList?: RequestedRemoteAttendance[];
}

export interface RespondedRemoteAttendanceHistoryDto {
  remoteAttendanceId?: number;
  employeeName?: string;
  employeeDempartment?: string;
  attendanceType?: string;
  attendanceTime?: string;
  latitude?: string;
  longitude?: string;
  reason?: string;
  approverMessage?: string;
  approveStatus?: string;
  requestedAt?: string;
}
export interface RespondedRemoteAttedanceHistoryResponseDto {
  approvedRemoteAttendanceHistoyr?: RespondedRemoteAttendanceHistoryDto[];
  rejectedRemoteAttendanceHistoyr?: RespondedRemoteAttendanceHistoryDto[];
  pageNumber?: number;
  totalPages?: number;
}

export interface WaitingLeaveApprovalResponseDto {
  waitingLeaveApprovalList?: WaitingLeaveApproval[];
}

export interface RespondedLeaveHistoryDto {
  employeeName?: string;
  employeeDepartment?: string;
  respondedLeaveHistory?: LeaveHistory;
}
export interface RespondedLeaveHistoryResponseDto {
  approvedLeaves?: RespondedLeaveHistoryDto[];
  rejectedLeaves?: RespondedLeaveHistoryDto[];
  pageNumber?: number;
  totalPages?: number;
}

export interface ApprovalRequestCountResponseDto {
  requestCount?: number;
}

export interface AnnouncementResponse {
  id?: number;
  message?: string;
  fileName?: string[];
  lastUpdateDate?: string;
}
export interface AnnouncementListResponseDto {
  announcements?: AnnouncementResponse[];
}

// Query parameter helper types
export interface StaffIdQuery {
  staffId: string;
}
export interface PaginationQuery {
  pageNumber: number;
  pageSize: number;
}
export interface MonthFilterQuery {
  filterMonth: number;
}
export interface LeaveHistoryListQuery
  extends StaffIdQuery,
    MonthFilterQuery,
    PaginationQuery {}
export interface RemoteAttendanceHistoryQuery
  extends StaffIdQuery,
    MonthFilterQuery,
    PaginationQuery {}
export interface OfficeAttendanceHistoryQuery
  extends StaffIdQuery,
    MonthFilterQuery,
    PaginationQuery {}
export interface ApprovalRemoteAttendanceListQuery
  extends StaffIdQuery,
    MonthFilterQuery {}
export interface ApprovalRemoteAttendanceHistoryQuery
  extends StaffIdQuery,
    MonthFilterQuery,
    PaginationQuery {}
export interface ApprovalLeaveListQuery
  extends StaffIdQuery,
    MonthFilterQuery {}
export interface ApprovalLeaveHistoryQuery
  extends StaffIdQuery,
    MonthFilterQuery,
    PaginationQuery {}
export interface AttendanceStatusQuery extends StaffIdQuery {
  date: string;
}
export interface ApprovalRequestCountQuery {
  approverId: string;
}
export interface SingleRemoteAttendanceQuery {
  remoteAttendanceId: string;
}
export interface SingleLeaveQuery {
  leaveId: string;
}
export interface CancelLeaveQuery {
  leaveId: number;
}
export interface EmployeeListQuery {
  department: string;
}
export interface LeaveBalanceQuery extends StaffIdQuery {}
export interface TakenLeavesQuery extends StaffIdQuery {}
export interface NotificationListQuery extends StaffIdQuery, PaginationQuery {}
export interface GetAttendanceSettingQuery extends StaffIdQuery {}

// Generic error wrapper for service layer
export class ApiError extends Error {
  readonly status?: number;
  readonly payload?: ErrorResponseDto | unknown;
  constructor(message: string, status?: number, payload?: any) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}
