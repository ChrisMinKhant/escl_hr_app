// Auth & session domain functions (incremental extraction from ApiClient)
import { httpRequest } from "../../http-client";
import {
  ChangePasswordRequestDto,
  ChangePasswordResponseDto,
  LoginRequestDto,
  LoginResponseDto,
  SessionRequestDto,
} from "../../types";

export function validateSession(body: SessionRequestDto) {
  return httpRequest<boolean>({
    path: "/api/validate-session",
    method: "POST",
    body,
  });
}

export function login(body: LoginRequestDto) {
  return httpRequest<LoginResponseDto>({
    path: "/api/login",
    method: "POST",
    body,
  });
}

export function changePassword(body: ChangePasswordRequestDto) {
  return httpRequest<ChangePasswordResponseDto>({
    path: "/api/change-password",
    method: "POST",
    body,
  });
}

export const authApi = { validateSession, login, changePassword };
