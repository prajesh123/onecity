
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider } from './contexts/AppContext';
import { Role } from './types';
import OwnerDashboard from './components/owner/OwnerDashboard';
import AIAssistant from './components/shared/AIAssistant';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <AppProvider defaultRole={Role.Owner}>
      <div className="bg-gray-100 min-h-screen font-sans">
        <OwnerDashboard />
        <AIAssistant />
      </div>
    </AppProvider>
  </React.StrictMode>
);
