
import React from 'react';
import { mockSalesData } from '../../services/mockData';

const OwnerDashboard: React.FC = () => {
  const totalSales = mockSalesData.reduce((sum, data) => sum + data.sales, 0);

  return (
    <div>
      <h2 style={{color: '#1a237e'}}>Owner Dashboard</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div style={cardStyle}>
          <h3>Total Sales</h3>
          <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#2e7d32'}}>${totalSales.toLocaleString()}</p>
        </div>
         <div style={cardStyle}>
          <h3>Profit Share Management</h3>
          <p>Controls for managing and distributing profit shares would be here.</p>
        </div>
        <div style={{...cardStyle, gridColumn: '1 / -1'}}>
          <h3>Franchise Performance Overview</h3>
           <div style={{height: '300px', border: '1px solid #ccc', borderRadius: '4px', padding: '1rem', background: '#f9f9f9'}}>
            Advanced Analytics & Reporting Placeholder
          </div>
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

export default OwnerDashboard;
