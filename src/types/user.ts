export type UserRole = "visitor" | "admin" | "staff" | "legal";
export interface User {
  id?: number;
  firstname: string;
  lastname: string;
  role: UserRole;
  email: string;
  token?: string;
};
