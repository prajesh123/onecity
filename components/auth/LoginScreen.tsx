
import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { mockUsers } from '../../services/mockData';

const LoginScreen: React.FC = () => {
  const { login } = useApp();
  const availableUsers = mockUsers;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#e8eaf6' }}>
      <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', textAlign: 'center', width: '350px' }}>
        <h2 style={{ color: '#1a237e' }}>One City Grocery</h2>
        <p>Please select your user profile to log in.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
          {availableUsers.map(user => (
            <button key={user.id} onClick={() => login(user)} style={{
              padding: '1rem',
              fontSize: '1rem',
              border: '1px solid #3f51b5',
              borderRadius: '4px',
              backgroundColor: '#3f51b5',
              color: 'white',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1a237e'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3f51b5'}
            >
              Login as {user.name} ({user.role})
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
