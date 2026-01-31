
import React from 'react';
import Header from '../common/Header';
import { Shield, Percent, Truck } from 'lucide-react';
import ManagerDashboard from '../manager/ManagerDashboard'; // Owners can see what managers see
import ProfitShareManager from './ProfitShareManager';

const OwnerDashboard: React.FC = () => {
  return (
    <div>
      <Header title="Owner Dashboard" />
      <main className="container mx-auto p-4 space-y-6">
          <ProfitShareManager />

          <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">General Controls</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                      <div className="flex items-center text-indigo-600 mb-2">
                          <Shield size={20} className="mr-2" />
                          <h3 className="font-semibold">Audit Logs</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Review cost and price change history.</p>
                      <button className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600">View Logs</button>
                  </div>
                   <div className="p-4 border rounded-lg">
                      <div className="flex items-center text-green-600 mb-2">
                          <Percent size={20} className="mr-2" />
                          <h3 className="font-semibold">MLM Settings</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Set referral commission percentages.</p>
                      <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">Configure</button>
                  </div>
                   <div className="p-4 border rounded-lg">
                      <div className="flex items-center text-blue-600 mb-2">
                          <Truck size={20} className="mr-2" />
                          <h3 className="font-semibold">Delivery Payouts</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Define rules for delivery partner payments.</p>
                      <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Set Rules</button>
                  </div>
              </div>
          </div>
          
          {/* Include manager's view for the owner */}
          <div className="mt-8 border-t-4 border-gray-300 pt-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">City Manager's View (Bangalore Franchise)</h2>
            <div className="bg-gray-50 p-2 rounded-lg">
                <ManagerDashboard />
            </div>
          </div>

      </main>
    </div>
  );
};

export default OwnerDashboard;
