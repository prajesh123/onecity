
export enum Role {
  Customer = 'customer',
  DeliveryPartner = 'delivery',
  Worker = 'worker',
  Manager = 'manager',
  Owner = 'owner',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  address: string;
  walletBalance: number;
  loyaltyPoints: number;
  isFlagged: boolean;
  referralCode: string;
  referrerId?: string;
  // New fields for Rewards Dashboard
  mlmEarnings: number;
  referrals: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  unit: 'kg' | 'grams' | 'piece' | 'litre';
  sellingPrice: number;
  costPrice: number;
  // New fields for Inventory & Promotions
  stockLevel: number;
  promotion?: string; // e.g., "10% Off"
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  unit: string;
  priceAtConfirmation: number;
  costAtConfirmation: number;
}

export enum OrderStatus {
  Pending = 'Pending',
  Packed = 'Packed',
  OutForDelivery = 'Out for Delivery',
  Delivered = 'Delivered',
  Denied = 'Denied',
  Cancelled = 'Cancelled',
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerAddress: string;
  items: OrderItem[];
  totalAmount: number;
  walletAmountUsed: number;
  cashToPay: number;
  status: OrderStatus;
  deliveryPartnerId?: string;
  createdAt: string;
  pin: string;
  isFlaggedOrder: boolean;
}

export interface Return {
  id: string;
  orderId: string;
  reason: string;
  loss: number;
  date: string;
}

// New Types for Profit Share System
export interface ProfitShareSettings {
    isEnabled: boolean;
    sharePercentage: number; // e.g., 1 for 1%
    minWalletBalance: number;
    includeStaff: boolean;
}

export interface UserProfitShareLog {
    userId: string;
    userName: string;
    date: string;
    walletBalanceSnapshot: number;
    userFraction: number; // e.g., 0.05 for 5%
    shareCredited: number;
}
