// Leaves domain
import { httpRequest } from "../../http-client";
import {
  ApprovalLeaveHistoryQuery,
  ApprovalLeaveListQuery,
  CancelLeaveQuery,
  LeaveBalanceQuery,
  LeaveBalanceResponseDto,
  LeaveHistoryListQuery,
  LeaveHistoryResponseDto,
  LeaveRequestDto,
  LeaveResponseDto,
  RespondedLeaveHistoryResponseDto,
  SingleLeaveQuery,
  TakenLeavesQuery,
  TakenLeavesResponseDto,
  WaitingApprovalDecisionResponseDto,
  WaitingLeaveApprovalDecisionRequestDto,
  WaitingLeaveApprovalResponseDto,
} from "../../types";

// Core leave actions
export function getLeaveBalance(query: LeaveBalanceQuery) {
  return httpRequest<LeaveBalanceResponseDto>({
    path: "/api/leaves",
    method: "GET",
    query,
  });
}
export function requestLeave(body: LeaveRequestDto) {
  return httpRequest<LeaveResponseDto>({
    path: "/api/leaves",
    method: "POST",
    body,
  });
}
export function getTakenLeaves(query: TakenLeavesQuery) {
  return httpRequest<TakenLeavesResponseDto>({
    path: "/api/leaves/taken-leaves",
    method: "GET",
    query,
  });
}
export function getLeaveHistoryMonthly(query: LeaveHistoryListQuery) {
  return httpRequest<LeaveHistoryResponseDto>({
    path: "/api/leaves/histories",
    method: "GET",
    query,
  });
}
export function cancelPendingLeave(query: CancelLeaveQuery) {
  return httpRequest<boolean>({
    path: "/api/leaves/cancel",
    method: "GET",
    query,
  });
}

// Approvals - leaves
export function getWaitingLeaveApprovalById(query: SingleLeaveQuery) {
  return httpRequest<WaitingLeaveApprovalResponseDto>({
    path: "/api/approvals/single-leave",
    method: "GET",
    query,
  });
}
export function getWaitingLeaveApprovalList(query: ApprovalLeaveListQuery) {
  return httpRequest<WaitingLeaveApprovalResponseDto>({
    path: "/api/approvals/leaves",
    method: "GET",
    query,
  });
}
export function getRespondedLeaveRequests(query: ApprovalLeaveHistoryQuery) {
  return httpRequest<RespondedLeaveHistoryResponseDto>({
    path: "/api/approvals/leave-histories",
    method: "GET",
    query,
  });
}
export function respondWaitingLeaveApproval(
  body: WaitingLeaveApprovalDecisionRequestDto
) {
  return httpRequest<WaitingApprovalDecisionResponseDto>({
    path: "/api/approvals/respond-leaves",
    method: "POST",
    body,
  });
}

export const leavesApi = {
  getLeaveBalance,
  requestLeave,
  getTakenLeaves,
  getLeaveHistoryMonthly,
  cancelPendingLeave,
  getWaitingLeaveApprovalById,
  getWaitingLeaveApprovalList,
  getRespondedLeaveRequests,
  respondWaitingLeaveApproval,
};
