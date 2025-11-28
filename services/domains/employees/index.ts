// Employees & departments domain
import { httpRequest } from "../../http-client";
import {
  AttendanceSummaryList,
  DepartmentListResponseDto,
  EmployeeList,
  EmployeeListQuery,
} from "../../types";

export function fetchEmployeeList(query: EmployeeListQuery) {
  return httpRequest<EmployeeList>({
    path: "/api/employees/list",
    method: "GET",
    query,
  });
}
export function fetchAttendanceSummaryList() {
  return httpRequest<AttendanceSummaryList>({
    path: "/api/employees/attendance-list",
    method: "GET",
  });
}
export function getDepartments() {
  return httpRequest<DepartmentListResponseDto>({
    path: "/api/departments",
    method: "GET",
  });
}

export const employeesApi = {
  fetchEmployeeList,
  fetchAttendanceSummaryList,
  getDepartments,
};
