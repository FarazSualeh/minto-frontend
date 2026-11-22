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

export interface Address {
  id: number;
  label?: string;
  line1: string;
  line2?: string | null;
  city: string;
  state?: string;
  postal_code?: string;
  is_default?: boolean;
}

export interface CartItem {
  product_id: number;
  name: string;
  image?: string | null;
  quantity: number;
  weight?: string;
  unit_price: number;
  line_total: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  delivery_fee: number;
  total: number;
}

export type OrderStatus =
  | "PENDING_SHOP_CONFIRMATION"
  | "ACCEPTED"
  | "PREPARING"
  | "READY_FOR_PICKUP"
  | "PICKED_UP"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "REJECTED"
  | "CANCELLED";

export interface OrderItem {
  id: number;
  product_id: number;
  name: string;
  quantity: number;
  unit_price: number;
  line_total: number;
}

export interface OrderStatusHistory {
  status: OrderStatus;
  changed_at: string;
  reason?: string | null;
}

export interface Order {
  id: number;
  order_number?: string;
  status: OrderStatus;
  subtotal: number;
  delivery_fee: number;
  total: number;
  items: OrderItem[];
  status_history?: OrderStatusHistory[];
  shop_id?: number;
  delivery_address?: Address;
  created_at: string;
}
