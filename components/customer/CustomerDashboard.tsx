
import React, { useState } from 'react';
import { mockProducts } from '../../services/mockData';
import ProductCard from './ProductCard';
import Cart from './Cart';
import OrderHistory from './OrderHistory';

const CustomerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('browse');

  return (
    <div>
        <div style={{ marginBottom: '1.5rem' }}>
            <button onClick={() => setActiveTab('browse')} style={activeTab === 'browse' ? tabStyleActive : tabStyle}>Browse Products</button>
            <button onClick={() => setActiveTab('history')} style={activeTab === 'history' ? tabStyleActive : tabStyle}>Order History</button>
        </div>

        {activeTab === 'browse' && (
             <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                <div style={{ flex: 3 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                    {mockProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                </div>
                <div style={{ flex: 1 }}>
                <Cart />
                </div>
            </div>
        )}

        {activeTab === 'history' && (
            <OrderHistory />
        )}
    </div>
  );
};

const tabStyle: React.CSSProperties = {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    cursor: 'pointer',
    border: '1px solid #ccc',
    backgroundColor: 'white',
    borderBottom: 'none',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    marginRight: '0.5rem',
};

const tabStyleActive: React.CSSProperties = {
    ...tabStyle,
    backgroundColor: '#e8eaf6',
    borderBottom: '1px solid #e8eaf6',
};

export default CustomerDashboard;
