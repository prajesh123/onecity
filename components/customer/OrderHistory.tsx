
import React from 'react';
import { mockOrders } from '../../services/mockData';
import { useApp } from '../../contexts/AppContext';

const OrderHistory: React.FC = () => {
  const { user } = useApp();
  // In a real app, this would be filtered by the logged-in user's ID.
  const userOrders = mockOrders.filter(o => o.customerName === user?.name || mockOrders.indexOf(o) < 2);

  return (
    <div style={cardStyle}>
      <h2 style={{ color: '#1a237e', marginTop: 0 }}>My Orders</h2>
      {userOrders.length > 0 ? (
        userOrders.map(order => (
          <div key={order.id} style={orderItemStyle}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <strong>Order #{order.id}</strong>
                <span style={getStatusChipStyle(order.status)}>{order.status}</span>
            </div>
            <p style={{fontSize: '0.9rem', color: '#555'}}>{order.timestamp} - {order.deliveryAddress}</p>
            <ul>
              {order.items.map(item => (
                <li key={item.id}>{item.name} (x{item.quantity})</li>
              ))}
            </ul>
            <p style={{textAlign: 'right', fontWeight: 'bold'}}>Total: ${order.total.toFixed(2)}</p>
          </div>
        ))
      ) : (
        <p>You have no past orders.</p>
      )}
    </div>
  );
};

const getStatusChipStyle = (status: string): React.CSSProperties => {
    let backgroundColor = '#ccc';
    if (status === 'Delivered') backgroundColor = '#4caf50';
    if (status === 'Out for Delivery') backgroundColor = '#ff9800';
    if (status === 'Pending') backgroundColor = '#2196f3';
    if (status === 'Packed') backgroundColor = '#673ab7';

    return {
        padding: '0.25rem 0.75rem',
        borderRadius: '12px',
        color: 'white',
        fontSize: '0.8rem',
        backgroundColor,
    }
}

const cardStyle: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '1.5rem',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
};

const orderItemStyle: React.CSSProperties = {
  marginBottom: '1rem',
  paddingBottom: '1rem',
  borderBottom: '1px solid #eee',
};


export default OrderHistory;
