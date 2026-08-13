export interface RegisterDTO {
  fullName: string;
  email: string;
  password: string;
}

export interface VerifyOtpDTO {
  email: string;
  token: string; // 6-digit OTP pin
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthUserResponse {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  accessToken?: string;
}
