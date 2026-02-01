
import React from 'react';
import { mockOrders } from '../../services/mockData';

const WorkerDashboard: React.FC = () => {
    const pendingOrders = mockOrders.filter(o => o.status === 'Pending');

    return (
        <div>
            <h2 style={{ color: '#1a237e' }}>Pending Orders to Pack</h2>
            <div style={cardStyle}>
                {pendingOrders.length > 0 ? (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {pendingOrders.map(order => (
                            <li key={order.id} style={listItemStyle}>
                                <div>
                                    <strong>Order #{order.id}</strong> for {order.customerName}
                                    <ul style={{margin: '4px 0 0', fontSize: '0.9rem', color: '#555', paddingLeft: '20px'}}>
                                        {order.items.map(item => <li key={item.id}>{item.name} (x{item.quantity})</li>)}
                                    </ul>
                                </div>
                                <button style={actionButtonStyle} onClick={() => alert(`Order ${order.id} marked as packed!`)}>
                                    Mark as Packed
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No pending orders to pack.</p>
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

const actionButtonStyle: React.CSSProperties = {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#3f51b5',
    color: 'white',
    cursor: 'pointer',
};

export default WorkerDashboard;
