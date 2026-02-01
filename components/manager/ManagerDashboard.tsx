
import React from 'react';
import { mockOrders, mockSalesData } from '../../services/mockData';
import { Order } from '../../types';

const ManagerDashboard: React.FC = () => {
  return (
    <div>
      <h2 style={{color: '#1a237e'}}>Manager Dashboard</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        
        <div style={{...cardStyle, gridColumn: '1 / -1'}}>
          <h3>All Orders</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #1a237e', textAlign: 'left' }}>
                <th style={tableHeaderStyle}>Order ID</th>
                <th style={tableHeaderStyle}>Customer</th>
                <th style={tableHeaderStyle}>Total</th>
                <th style={tableHeaderStyle}>Timestamp</th>
                <th style={tableHeaderStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map(order => (
                <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={tableCellStyle}>{order.id}</td>
                  <td style={tableCellStyle}>{order.customerName}</td>
                  <td style={tableCellStyle}>${order.total.toFixed(2)}</td>
                  <td style={tableCellStyle}>{order.timestamp}</td>
                  <td style={tableCellStyle}>
                    <span style={getStatusChipStyle(order.status)}>{order.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={cardStyle}>
          <h3>Sales Overview</h3>
          <div style={{height: '200px', border: '1px solid #ccc', borderRadius: '4px', padding: '1rem', background: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            Sales Chart Placeholder
          </div>
        </div>

        <div style={cardStyle}>
          <h3>Inventory Management</h3>
          <p>Inventory controls and stock levels would be displayed here.</p>
        </div>

      </div>
    </div>
  );
};

const getStatusChipStyle = (status: Order['status']): React.CSSProperties => {
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

const tableHeaderStyle: React.CSSProperties = {
  padding: '0.75rem',
}

const tableCellStyle: React.CSSProperties = {
  padding: '0.75rem',
}

export default ManagerDashboard;
