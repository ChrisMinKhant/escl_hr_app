// Approval count domain (isolated small concern)
import { httpRequest } from "../../http-client";
import {
  ApprovalRequestCountQuery,
  ApprovalRequestCountResponseDto,
} from "../../types";

export function getApprovalRequestCount(query: ApprovalRequestCountQuery) {
  return httpRequest<ApprovalRequestCountResponseDto>({
    path: "/api/approvals/count",
    method: "GET",
    query,
  });
}

export const approvalsApi = { getApprovalRequestCount };
