
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider } from './contexts/AppContext';
import { Role } from './types';
import DeliveryDashboard from './components/delivery/DeliveryDashboard';
import AIAssistant from './components/shared/AIAssistant';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <AppProvider defaultRole={Role.DeliveryPartner}>
      <div className="bg-gray-100 min-h-screen font-sans">
        <DeliveryDashboard />
        <AIAssistant />
      </div>
    </AppProvider>
  </React.StrictMode>
);
