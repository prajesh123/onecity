
import { User, Product, Order, Role, OrderStatus, UserProfitShareLog } from '../types';

export const mockUsers: User[] = [
  { id: 'cust1', name: 'Ravi Kumar', email: 'ravi@example.com', role: Role.Customer, address: '123, MG Road, Bangalore', walletBalance: 5000, loyaltyPoints: 1250, isFlagged: false, referralCode: 'RAV123', mlmEarnings: 125.50, referrals: 3 },
  { id: 'cust2', name: 'Priya Sharma', email: 'priya@example.com', role: Role.Customer, address: '456, Indiranagar, Bangalore', walletBalance: 3500, loyaltyPoints: 800, isFlagged: true, referralCode: 'PRI456', referrerId: 'cust1', mlmEarnings: 45.20, referrals: 1 },
  { id: 'cust3', name: 'Arjun Verma', email: 'arjun@example.com', role: Role.Customer, address: '101, Jayanagar, Bangalore', walletBalance: 1500, loyaltyPoints: 200, isFlagged: false, referralCode: 'ARJ101', mlmEarnings: 0, referrals: 0 },
  { id: 'del1', name: 'Suresh Singh', email: 'suresh@example.com', role: Role.DeliveryPartner, address: '789, Koramangala, Bangalore', walletBalance: 4000, loyaltyPoints: 0, isFlagged: false, referralCode: 'SUR789', mlmEarnings: 0, referrals: 0 },
  { id: 'work1', name: 'Amit Patel', email: 'amit@example.com', role: Role.Worker, address: 'Warehouse, Bangalore', walletBalance: 3200, loyaltyPoints: 0, isFlagged: false, referralCode: 'AMI001', mlmEarnings: 0, referrals: 0 },
  { id: 'man1', name: 'Deepa Verma', email: 'deepa@example.com', role: Role.Manager, address: 'City Office, Bangalore', walletBalance: 0, loyaltyPoints: 0, isFlagged: false, referralCode: 'DEE555', mlmEarnings: 0, referrals: 0 },
  { id: 'own1', name: 'Vikram Mehta', email: 'vikram@example.com', role: Role.Owner, address: 'HQ, Mumbai', walletBalance: 0, loyaltyPoints: 0, isFlagged: false, referralCode: 'VIK999', mlmEarnings: 0, referrals: 0 },
];

export const mockProducts: Product[] = [
  { id: 'prod1', name: 'Tomato', category: 'Vegetables', imageUrl: 'https://picsum.photos/id/1080/200/200', unit: 'kg', sellingPrice: 40, costPrice: 30, stockLevel: 100 },
  { id: 'prod2', name: 'Onion', category: 'Vegetables', imageUrl: 'https://picsum.photos/id/106/200/200', unit: 'kg', sellingPrice: 30, costPrice: 22, stockLevel: 150 },
  { id: 'prod3', name: 'Milk', category: 'Dairy', imageUrl: 'https://picsum.photos/id/292/200/200', unit: 'litre', sellingPrice: 55, costPrice: 48, stockLevel: 80, promotion: "Save ₹5" },
  { id: 'prod4', name: 'Brown Bread', category: 'Bakery', imageUrl: 'https://picsum.photos/id/312/200/200', unit: 'piece', sellingPrice: 45, costPrice: 35, stockLevel: 50 },
  { id: 'prod5', name: 'Apple', category: 'Fruits', imageUrl: 'https://picsum.photos/id/211/200/200', unit: 'kg', sellingPrice: 150, costPrice: 120, stockLevel: 45, promotion: "10% Off" },
  { id: 'prod6', name: 'Potato', category: 'Vegetables', imageUrl: 'https://picsum.photos/id/1078/200/200', unit: 'kg', sellingPrice: 25, costPrice: 18, stockLevel: 200 },
  { id: 'prod7', name: 'Eggs', category: 'Dairy', imageUrl: 'https://picsum.photos/id/451/200/200', unit: 'piece', sellingPrice: 7, costPrice: 5, stockLevel: 8 }, // Low stock
  { id: 'prod8', name: 'Banana', category: 'Fruits', imageUrl: 'https://picsum.photos/id/1015/200/200', unit: 'kg', sellingPrice: 50, costPrice: 40, stockLevel: 60 },
];

export const mockOrders: Order[] = [
  {
    id: 'ORD001',
    customerId: 'cust1',
    customerName: 'Ravi Kumar',
    customerAddress: '123, MG Road, Bangalore',
    items: [
      { productId: 'prod1', name: 'Tomato', quantity: 2, unit: 'kg', priceAtConfirmation: 40, costAtConfirmation: 30 },
      { productId: 'prod3', name: 'Milk', quantity: 1, unit: 'litre', priceAtConfirmation: 55, costAtConfirmation: 48 },
    ],
    totalAmount: 135,
    walletAmountUsed: 35,
    cashToPay: 100,
    status: OrderStatus.Delivered,
    deliveryPartnerId: 'del1',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    pin: '1234',
    isFlaggedOrder: false,
  },
  {
    id: 'ORD002',
    customerId: 'cust2',
    customerName: 'Priya Sharma',
    customerAddress: '456, Indiranagar, Bangalore',
    items: [
      { productId: 'prod2', name: 'Onion', quantity: 1, unit: 'kg', priceAtConfirmation: 30, costAtConfirmation: 22 },
      { productId: 'prod4', name: 'Brown Bread', quantity: 1, unit: 'piece', priceAtConfirmation: 45, costAtConfirmation: 35 },
    ],
    totalAmount: 75,
    walletAmountUsed: 75,
    cashToPay: 0,
    status: OrderStatus.Delivered,
    deliveryPartnerId: 'del1',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    pin: '5678',
    isFlaggedOrder: true,
  },
  {
    id: 'ORD003',
    customerId: 'cust1',
    customerName: 'Ravi Kumar',
    customerAddress: '123, MG Road, Bangalore',
    items: [
      { productId: 'prod5', name: 'Apple', quantity: 0.5, unit: 'kg', priceAtConfirmation: 150, costAtConfirmation: 120 },
    ],
    totalAmount: 75,
    walletAmountUsed: 0,
    cashToPay: 75,
    status: OrderStatus.OutForDelivery,
    createdAt: new Date().toISOString(),
    pin: '9012',
    isFlaggedOrder: false,
  },
];

export const mockUserProfitShareLogs: UserProfitShareLog[] = [
    {
        userId: 'cust1',
        userName: 'Ravi Kumar',
        date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
        walletBalanceSnapshot: 4950,
        userFraction: 0.351,
        shareCredited: 1.25,
    },
    {
        userId: 'cust1',
        userName: 'Ravi Kumar',
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        walletBalanceSnapshot: 4980,
        userFraction: 0.354,
        shareCredited: 1.89,
    },
     {
        userId: 'cust2',
        userName: 'Priya Sharma',
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        walletBalanceSnapshot: 3450,
        userFraction: 0.212,
        shareCredited: 0.95,
    },
];
