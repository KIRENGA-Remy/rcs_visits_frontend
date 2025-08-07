export type UserRole = "visitor" | "admin" | "staff" | "legal";
export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  role: UserRole;
  email: string;
  token?: string;
};
