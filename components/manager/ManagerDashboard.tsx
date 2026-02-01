
import React from 'react';
import { mockOrders, mockSalesData } from '../../services/mockData';

const ManagerDashboard: React.FC = () => {
  return (
    <div>
      <h2 style={{color: '#1a237e'}}>Manager Dashboard</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div style={cardStyle}>
          <h3>Pending Orders</h3>
          <ul style={{listStyle: 'none', padding: 0}}>
            {mockOrders.filter(o => o.status === 'Pending').map(order => (
              <li key={order.id} style={listItemStyle}>{order.customerName} - ${order.total.toFixed(2)}</li>
            ))}
          </ul>
        </div>
        <div style={cardStyle}>
          <h3>Sales Overview</h3>
          <div style={{height: '200px', border: '1px solid #ccc', borderRadius: '4px', padding: '1rem', background: '#f9f9f9'}}>
            Chart Placeholder
            {/* A proper chart library like Recharts or Chart.js would be integrated here */}
          </div>
        </div>
        <div style={{...cardStyle, gridColumn: '1 / -1'}}>
          <h3>Inventory Management</h3>
          <p>Inventory controls and stock levels would be displayed here.</p>
        </div>
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
    padding: '0.5rem',
    borderBottom: '1px solid #eee'
}

export default ManagerDashboard;
