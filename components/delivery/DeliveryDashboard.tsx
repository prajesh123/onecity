
import React from 'react';
import { mockOrders } from '../../services/mockData';

const DeliveryDashboard: React.FC = () => {
    const ordersForDelivery = mockOrders.filter(o => o.status === 'Packed' || o.status === 'Out for Delivery');

    return (
        <div>
            <h2 style={{ color: '#1a237e' }}>My Deliveries</h2>
            <div style={cardStyle}>
                {ordersForDelivery.length > 0 ? (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {ordersForDelivery.map(order => (
                            <li key={order.id} style={listItemStyle}>
                                <div>
                                    <strong>Order #{order.id}</strong> for {order.customerName}
                                    <p style={{margin: '4px 0 0', fontSize: '0.9rem', color: '#555'}}>
                                        Address: {order.deliveryAddress} - ${order.total.toFixed(2)}
                                    </p>
                                </div>
                                <button style={actionButtonStyle(order.status)} onClick={() => alert(`Updating status for order ${order.id}`)}>
                                    {order.status === 'Packed' ? 'Start Delivery' : 'Mark Delivered'}
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No orders are ready for delivery.</p>
                )}
            </div>
        </div>
    );
};

const cardStyle: React.CSSProperties = {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
};

const listItemStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    borderBottom: '1px solid #eee'
};

const actionButtonStyle = (status: string): React.CSSProperties => ({
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: status === 'Packed' ? '#3f51b5' : '#2e7d32',
    color: 'white',
    cursor: 'pointer',
    minWidth: '130px',
});

export default DeliveryDashboard;
