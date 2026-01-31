
import { Role } from './types';

export const ROLES_CONFIG = {
  [Role.Customer]: { name: 'Customer' },
  [Role.DeliveryPartner]: { name: 'Delivery Partner' },
  [Role.Worker]: { name: 'Worker' },
  [Role.Manager]: { name: 'City Manager' },
  [Role.Owner]: { name: 'Owner' },
};

export const MLM_LEVELS = {
  LEVEL1: 0.005, // 0.50%
  LEVEL2: 0.003, // 0.30%
  LEVEL3: 0.002, // 0.20%
};

export const DELIVERY_PAYOUT_PER_ORDER = 10; // in INR
export const ORDER_DENIAL_PENALTY = 500; // Loyalty points to deduct on denial
