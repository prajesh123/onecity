
import { ROLES } from "./constants";

export type UserRole = typeof ROLES[keyof typeof ROLES];

export interface User {
  id: string;
  name: string;
  role: UserRole;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  unit: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
    id: string;
    customerName: string;
    items: CartItem[];
    total: number;
    status: 'Pending' | 'Packed' | 'Out for Delivery' | 'Delivered';
    timestamp: string;
    deliveryAddress: string;
}

export interface SalesData {
    month: string;
    sales: number;
}
