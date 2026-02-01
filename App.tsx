
import React from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import LoginScreen from './components/auth/LoginScreen';
import ManagerDashboard from './components/manager/ManagerDashboard';
import OwnerDashboard from './components/owner/OwnerDashboard';
import Header from './components/common/Header';
import AIAssistant from './components/shared/AIAssistant';
import { ROLES } from './constants';

const AppContent: React.FC = () => {
  const { user } = useApp();

  if (!user) {
    return <LoginScreen allowedRoles={[ROLES.MANAGER, ROLES.OWNER]} />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f0f2f5' }}>
      <Header />
      <main style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
        {user.role === ROLES.MANAGER && <ManagerDashboard />}
        {user.role === ROLES.OWNER && <OwnerDashboard />}
      </main>
      <AIAssistant />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
