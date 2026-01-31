
import React, { useState } from 'react';
import { mockOrders } from '../../services/mockData';
import { Order } from '../../types';
import { History, ChevronDown, ChevronUp, ShoppingCart } from 'lucide-react';

interface OrderHistoryProps {
    userId: string;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ userId }) => {
    const userOrders = mockOrders.filter(o => o.customerId === userId).sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

    const toggleOrderDetails = (orderId: string) => {
        setExpandedOrderId(prevId => prevId === orderId ? null : orderId);
    };

    const handleReorder = (order: Order) => {
        // In a real app, this would dispatch an action to add items to the cart
        console.log("Reordering items:", order.items);
        alert(`Items from order ${order.id} have been added to your cart! (Simulated)`);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-800 flex items-center mb-4">
                <History className="mr-2 text-blue-500" />
                Your Order History
            </h2>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                {userOrders.map(order => (
                    <div key={order.id} className="border rounded-lg">
                        <div onClick={() => toggleOrderDetails(order.id)} className="p-3 cursor-pointer flex justify-between items-center">
                            <div>
                                <p className="font-bold">{order.id}</p>
                                <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()} - ₹{order.totalAmount.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                               <span className={`text-sm font-semibold px-2 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{order.status}</span>
                               {expandedOrderId === order.id ? <ChevronUp /> : <ChevronDown />}
                            </div>
                        </div>
                        {expandedOrderId === order.id && (
                            <div className="p-3 border-t bg-gray-50">
                                <h4 className="font-semibold mb-2">Items:</h4>
                                <ul className="list-disc list-inside text-sm space-y-1 mb-4">
                                    {order.items.map(item => (
                                        <li key={item.productId}>{item.name} (x{item.quantity})</li>
                                    ))}
                                </ul>
                                <button onClick={() => handleReorder(order)} className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center">
                                    <ShoppingCart size={16} className="mr-2"/> Re-order
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderHistory;
