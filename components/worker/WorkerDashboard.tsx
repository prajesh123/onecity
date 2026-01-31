
import React from 'react';
import { mockOrders } from '../../services/mockData';
import { Order, OrderStatus } from '../../types';
import { Box, User, AlertTriangle, Phone, CheckSquare, Square } from 'lucide-react';
import Header from '../common/Header';

interface PackingChecklist {
    [itemId: string]: boolean;
}

const WorkerDashboard: React.FC = () => {
    const [orders, setOrders] = React.useState<Order[]>(mockOrders.filter(o => o.status === OrderStatus.Pending || o.status === OrderStatus.Packed));
    const [checklists, setChecklists] = React.useState<{ [orderId: string]: PackingChecklist }>({});

    const initializeChecklists = () => {
        const initialChecklists: { [orderId: string]: PackingChecklist } = {};
        orders.filter(o => o.status === OrderStatus.Pending).forEach(order => {
            initialChecklists[order.id] = order.items.reduce((acc, item) => {
                acc[`${order.id}-${item.productId}`] = false;
                return acc;
            }, {} as PackingChecklist);
        });
        setChecklists(initialChecklists);
    };

    React.useEffect(() => {
        initializeChecklists();
    }, []); // Removed dependency to avoid re-initializing on order changes

    const handleCheckItem = (orderId: string, itemId: string) => {
        setChecklists(prev => ({
            ...prev,
            [orderId]: {
                ...prev[orderId],
                [itemId]: !prev[orderId][itemId],
            }
        }));
    };

    const isOrderFullyPacked = (orderId: string): boolean => {
        const checklist = checklists[orderId];
        return checklist && Object.values(checklist).every(isChecked => isChecked);
    }

    const markAsPacked = (orderId: string) => {
        if (!isOrderFullyPacked(orderId)) {
            alert("Please check all items before marking as packed.");
            return;
        }
        // This is a mock update. In a real app, this would be an API call.
        const orderInMock = mockOrders.find(o => o.id === orderId);
        if (orderInMock) {
            orderInMock.status = OrderStatus.Packed;
        }
        setOrders(mockOrders.filter(o => o.status === OrderStatus.Pending || o.status === OrderStatus.Packed));
        alert(`Order ${orderId} marked as packed.`);
    };

    return (
        <div>
            <Header title="Packing Station" />
            <main className="container mx-auto p-4 space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">Orders to Pack</h2>
                {orders.filter(o => o.status === OrderStatus.Pending).map(order => (
                    <div key={order.id} className="bg-white rounded-lg shadow-md p-4">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="font-bold text-lg text-gray-800">{order.id}</h3>
                                <div className="flex items-center text-gray-600 mt-1">
                                    <User size={14} className="mr-1" />
                                    <span>{order.customerName}</span>
                                </div>
                            </div>
                            {order.isFlaggedOrder && (
                                <div className="flex items-center space-x-2">
                                    <div className="p-2 bg-yellow-100 border border-yellow-300 text-yellow-700 rounded-lg flex items-center">
                                        <AlertTriangle size={18} className="mr-2" />
                                        <span className="text-sm font-semibold">Flagged Customer</span>
                                    </div>
                                    <button className="flex items-center bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600">
                                        <Phone size={16} className="mr-1" /> Call
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="border-t pt-3">
                            <h4 className="font-semibold mb-2">Packing Checklist:</h4>
                            <div className="space-y-2">
                                {order.items.map(item => {
                                    const itemId = `${order.id}-${item.productId}`;
                                    const isChecked = checklists[order.id]?.[itemId] || false;
                                    return (
                                        <div key={itemId} onClick={() => handleCheckItem(order.id, itemId)} className={`flex items-center p-2 rounded-lg cursor-pointer ${isChecked ? 'bg-green-50 text-gray-500 line-through' : 'bg-gray-50'}`}>
                                            {isChecked ? <CheckSquare className="mr-3 text-green-500" /> : <Square className="mr-3 text-gray-400" />}
                                            <span>{item.name} - <span className="font-bold text-gray-800 no-underline">{item.quantity} {item.unit}</span></span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="mt-4 text-right">
                            <button
                                onClick={() => markAsPacked(order.id)}
                                disabled={!isOrderFullyPacked(order.id)}
                                className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                Mark as Packed
                            </button>
                        </div>
                    </div>
                ))}
                <h2 className="text-2xl font-bold text-gray-800 pt-6">Recently Packed</h2>
                {orders.filter(o => o.status === OrderStatus.Packed).map(order => (
                    <div key={order.id} className="bg-white rounded-lg shadow-sm p-4 opacity-70">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold text-gray-600">{order.id} - {order.customerName}</h3>
                            </div>
                            <span className="text-sm bg-green-100 text-green-800 font-medium px-2 py-1 rounded">{order.status}</span>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
};

export default WorkerDashboard;
