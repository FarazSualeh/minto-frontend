export type UserRole = "customer" | "shop_partner" | "delivery_partner" | "admin";

export interface User {
  id: number;
  name: string;
  phone?: string;
  email?: string;
  role: UserRole;
  is_active: boolean;
  is_approved: boolean;
}
