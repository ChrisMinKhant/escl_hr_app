// Aggregated service exports (incremental migration layer)
export { apiClient } from "./apiClient"; // legacy class instance

// Domain function exports
export * from "./domains/approvals";
export * from "./domains/attendance";
export * from "./domains/auth";
export * from "./domains/documents";
export * from "./domains/employees";
export * from "./domains/leaves";
export * from "./domains/notifications";
export * from "./domains/profile";

// Convenience grouped API (functional style)
import { approvalsApi } from "./domains/approvals";
import { attendanceApi } from "./domains/attendance";
import { authApi } from "./domains/auth";
import { documentsApi } from "./domains/documents";
import { employeesApi } from "./domains/employees";
import { leavesApi } from "./domains/leaves";
import { notificationsApi } from "./domains/notifications";
import { profileApi } from "./domains/profile";

export const api = {
  auth: authApi,
  profile: profileApi,
  notifications: notificationsApi,
  documents: documentsApi,
  leaves: leavesApi,
  attendance: attendanceApi,
  employees: employeesApi,
  approvals: approvalsApi,
};
