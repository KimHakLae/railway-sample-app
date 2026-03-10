import { jwtDecode } from "jwt-decode";

export interface TokenPayload {
  id: number;
  is_admin: boolean;
}

export const getUserFromToken = (): TokenPayload | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    return jwtDecode(token) as TokenPayload; // 이제 정상
  } catch {
    return null;
  }
};