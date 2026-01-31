
import React, { useState } from 'react';
import { mockOrders, mockUsers } from '../../services/mockData';
import { Order, OrderStatus } from '../../types';
import { ORDER_DENIAL_PENALTY } from '../../constants';
import { User, Calendar, ListOrdered, Check, X } from 'lucide-react';

interface DenialRequestsProps {
    onAction: () => void; // Callback to force parent re-render
}

const DenialRequests: React.FC<DenialRequestsProps> = ({ onAction }) => {
    const [pendingDenials, setPendingDenials] = useState<Order[]>(
        mockOrders.filter(o => o.status === OrderStatus.PendingDenial)
    );

    const handleApprove = (order: Order) => {
        // Find and update user
        const customer = mockUsers.find(u => u.id === order.customerId);
        if (customer) {
            customer.isFlagged = true;
            customer.loyaltyPoints -= ORDER_DENIAL_PENALTY;
        }

        // Find and update order
        const orderInMock = mockOrders.find(o => o.id === order.id);
        if (orderInMock) {
            orderInMock.status = OrderStatus.Denied;
        }

        alert(`Order ${order.id} denial approved. Customer ${customer?.name} flagged and penalized.`);
        setPendingDenials(prev => prev.filter(o => o.id !== order.id));
        onAction(); // Notify parent to re-render
    };

    const handleReject = (order: Order) => {
        // Find and update order
        const orderInMock = mockOrders.find(o => o.id === order.id);
        if (orderInMock) {
            orderInMock.status = OrderStatus.OutForDelivery;
        }

        alert(`Order ${order.id} denial rejected. Order status reverted to 'Out for Delivery'.`);
        setPendingDenials(prev => prev.filter(o => o.id !== order.id));
        onAction(); // Notify parent to re-render
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg mb-4">Pending Denial Requests</h3>
            {pendingDenials.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No pending requests.</p>
            ) : (
                <div className="space-y-4">
                    {pendingDenials.map(order => (
                        <div key={order.id} className="p-4 border rounded-lg">
                            <div className="flex flex-col md:flex-row justify-between md:items-center">
                                <div>
                                    <p className="font-bold text-indigo-600">{order.id}</p>
                                    <div className="flex items-center text-sm text-gray-600 mt-1">
                                        <User size={14} className="mr-1.5"/> {order.customerName}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Calendar size={14} className="mr-1.5"/> {new Date(order.createdAt).toLocaleString()}
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0 flex items-center space-x-2">
                                    <button onClick={() => handleReject(order)} className="flex items-center bg-gray-500 text-white px-3 py-2 rounded-lg hover:bg-gray-600">
                                        <X size={16} className="mr-1"/> Reject
                                    </button>
                                     <button onClick={() => handleApprove(order)} className="flex items-center bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600">
                                        <Check size={16} className="mr-1"/> Approve Denial
                                    </button>
                                </div>
                            </div>
                            <div className="border-t my-3"></div>
                            <div className="text-sm">
                                <h4 className="font-semibold flex items-center mb-1"><ListOrdered size={16} className="mr-1.5"/> Items:</h4>
                                <ul className="list-disc list-inside ml-4">
                                    {order.items.map(item => (
                                        <li key={item.productId}>{item.name} (x{item.quantity}) - Total: ₹{(item.quantity * item.priceAtConfirmation).toFixed(2)}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DenialRequests;
