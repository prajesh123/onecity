
import React from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import LoginScreen from './components/auth/LoginScreen';
import ManagerDashboard from './components/manager/ManagerDashboard';
import OwnerDashboard from './components/owner/OwnerDashboard';
import Header from './components/common/Header';
import AIAssistant from './components/shared/AIAssistant';
import { ROLES } from './constants';
import CustomerDashboard from './components/customer/CustomerDashboard';
import DeliveryDashboard from './components/delivery/DeliveryDashboard';
import WorkerDashboard from './components/worker/WorkerDashboard';

const AppContent: React.FC = () => {
  const { user } = useApp();

  if (!user) {
    return <LoginScreen />;
  }

  const renderDashboard = () => {
    switch (user.role) {
      case ROLES.CUSTOMER:
        return <CustomerDashboard />;
      case ROLES.DELIVERY:
        return <DeliveryDashboard />;
      case ROLES.WORKER:
        return <WorkerDashboard />;
      case ROLES.MANAGER:
        return <ManagerDashboard />;
      case ROLES.OWNER:
        return <OwnerDashboard />;
      default:
        return <div>Invalid Role</div>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f0f2f5' }}>
      <Header />
      <main style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
        {renderDashboard()}
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
