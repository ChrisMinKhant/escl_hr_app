// Profile domain
import { httpRequest } from "../../http-client";
import {
  ProfileResponseDto,
  ProfileUpdateRequestDto,
  ProfileUpdateResponseDto,
  StaffIdQuery,
} from "../../types";

export function getProfile(query: StaffIdQuery) {
  return httpRequest<ProfileResponseDto>({
    path: "/api/profiles",
    method: "GET",
    query,
  });
}

export function updateProfile(
  query: StaffIdQuery,
  body: ProfileUpdateRequestDto
) {
  return httpRequest<ProfileUpdateResponseDto>({
    path: "/api/profiles",
    method: "POST",
    query,
    body,
  });
}

export function uploadProfileImage(staffId: string, base64Image: string) {
  return httpRequest<boolean>({
    path: "/api/profile-images/upload",
    method: "POST",
    headers: { "X-Staff-Id": staffId },
    body: base64Image,
  });
}

export const profileApi = { getProfile, updateProfile, uploadProfileImage };
