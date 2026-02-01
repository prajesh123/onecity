
import React from 'react';
import { useApp } from '../../contexts/AppContext';

const Header: React.FC = () => {
  const { user, logout } = useApp();

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }}>
      <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#1a237e' }}>One City Grocery - Admin Panel</h1>
      {user && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '1rem' }}>Welcome, {user.name} ({user.role})</span>
          <button onClick={logout} style={{
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#c62828',
            color: 'white',
            cursor: 'pointer',
          }}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
