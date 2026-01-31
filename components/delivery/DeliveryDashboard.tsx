
import React, { useState } from 'react';
import Header from '../common/Header';
import { mockOrders, mockUsers } from '../../services/mockData';
import { useAuth } from '../../contexts/AppContext';
import { Order, OrderStatus } from '../../types';
import { MapPin, Phone, Package, Check, AlertTriangle, MessageSquare } from 'lucide-react';

const DeliveryDashboard: React.FC = () => {
  const { user } = useAuth();
  // Manage a local copy of orders to reflect status changes
  const [orders, setOrders] = useState<Order[]>(
    mockOrders.filter(o => o.status === OrderStatus.OutForDelivery || o.status === OrderStatus.Delivered)
  );
  const [pinInputs, setPinInputs] = useState<{ [key: string]: string }>({});

  const handlePinChange = (orderId: string, value: string) => {
    if (/^\d{0,4}$/.test(value)) {
        setPinInputs(prev => ({...prev, [orderId]: value}));
    }
  };
  
  const confirmDelivery = (order: Order) => {
    if (pinInputs[order.id] === order.pin) {
        // Find and update the order in the mock data source
        const orderInMock = mockOrders.find(o => o.id === order.id);
        if (orderInMock) {
            orderInMock.status = OrderStatus.Delivered;
        }

        // Find the customer and check if they are flagged
        const customer = mockUsers.find(u => u.id === order.customerId);
        if (customer && customer.isFlagged) {
            customer.isFlagged = false; // Clear the flag
            alert(`Delivery confirmed! Customer ${customer.name}'s flag has been cleared.`);
        } else {
            alert('Delivery confirmed successfully!');
        }
        
        // Force a re-render by updating the local state
        setOrders(prev => prev.map(o => o.id === order.id ? {...o, status: OrderStatus.Delivered} : o));
    } else {
        alert('Incorrect PIN!');
    }
  };

  return (
    <div>
      <Header title="My Deliveries" />
      <main className="container mx-auto p-4 space-y-4">
        {orders.filter(o => o.status === OrderStatus.OutForDelivery).map(order => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg text-gray-800">{order.id}</h3>
                <p className="text-gray-600">{order.customerName}</p>
                <div className="flex items-center text-gray-500 mt-1">
                  <MapPin size={14} className="mr-1" />
                  <span>{order.customerAddress}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-xl text-green-600">Pay: ₹{order.cashToPay.toFixed(2)}</p>
                <span className="text-sm bg-blue-100 text-blue-800 font-medium px-2 py-1 rounded">{order.status}</span>
              </div>
            </div>
            
            {order.isFlaggedOrder && (
                <div className="mt-3 p-2 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 flex items-center">
                    <AlertTriangle size={18} className="mr-2" />
                    <p className="text-sm font-semibold">Flagged Customer: Previous order denied.</p>
                </div>
            )}
            
            <div className="border-t my-4"></div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex space-x-2">
                    <button className="flex items-center bg-gray-200 text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-300">
                        <Phone size={16} className="mr-1" /> Call
                    </button>
                    <a href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(order.customerAddress)}`} target="_blank" rel="noopener noreferrer" className="flex items-center bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600">
                        <MapPin size={16} className="mr-1" /> Navigate
                    </a>
                </div>

                <div className="flex items-center space-x-2">
                    <input 
                        type="tel"
                        maxLength={4}
                        placeholder="4-digit PIN"
                        value={pinInputs[order.id] || ''}
                        onChange={(e) => handlePinChange(order.id, e.target.value)}
                        className="w-28 text-center p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    <button onClick={() => confirmDelivery(order)} className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-400" disabled={!pinInputs[order.id] || pinInputs[order.id].length < 4}>
                        <Check size={16} className="mr-1" /> Confirm
                    </button>
                </div>
            </div>
          </div>
        ))}
        <h3 className="text-lg font-semibold text-gray-700 pt-4">Completed Deliveries</h3>
         {orders.filter(o => o.status === OrderStatus.Delivered).map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm p-4 opacity-70">
                 <div className="flex justify-between items-center">
                    <div>
                        <h3 className="font-semibold text-gray-600">{order.id} - {order.customerName}</h3>
                        <p className="text-sm text-gray-500">{order.customerAddress}</p>
                    </div>
                    <span className="text-sm bg-green-100 text-green-800 font-medium px-2 py-1 rounded">{order.status}</span>
                </div>
            </div>
         ))}
      </main>
    </div>
  );
};

export default DeliveryDashboard;
