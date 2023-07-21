export interface PasswordDTO {
  newPassword: string | null;
  oldPassword?: string |null;
  email: string;
  token: string;
}
