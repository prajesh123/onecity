
import { User, Product, Order, SalesData } from '../types';
import { ROLES } from '../constants';

export const mockUsers: User[] = [
  { id: '1', name: 'Manager Mike', role: ROLES.MANAGER },
  { id: '2', name: 'Owner Olivia', role: ROLES.OWNER },
  { id: '3', name: 'Customer Chris', role: ROLES.CUSTOMER },
  { id: '4', name: 'Worker Wendy', role: ROLES.WORKER },
  { id: '5', name: 'Delivery Dave', role: ROLES.DELIVERY },
];

export const mockProducts: Product[] = [
    { id: 'p1', name: 'Organic Apples', price: 2.50, imageUrl: 'https://via.placeholder.com/150/92c952', unit: 'kg' },
    { id: 'p2', name: 'Whole Milk', price: 1.50, imageUrl: 'https://via.placeholder.com/150/771796', unit: 'litre' },
    { id: 'p3', name: 'Sourdough Bread', price: 4.00, imageUrl: 'https://via.placeholder.com/150/24f355', unit: 'loaf' },
    { id: 'p4', name: 'Free-range Eggs', price: 3.00, imageUrl: 'https://via.placeholder.com/150/d32776', unit: 'dozen' },
];

export const mockOrders: Order[] = [
    { id: 'o1', customerName: 'John Doe', items: [{...mockProducts[0], quantity: 2}, {...mockProducts[2], quantity: 1}], total: 9.00, status: 'Packed', timestamp: '2024-05-21 10:30 AM' },
    { id: 'o2', customerName: 'Jane Smith', items: [{...mockProducts[1], quantity: 1}], total: 1.50, status: 'Pending', timestamp: '2024-05-21 11:00 AM' },
];

export const mockSalesData: SalesData[] = [
    { month: 'Jan', sales: 4000 },
    { month: 'Feb', sales: 3000 },
    { month: 'Mar', sales: 5000 },
    { month: 'Apr', sales: 4500 },
    { month: 'May', sales: 6000 },
    { month: 'Jun', sales: 5500 },
];
