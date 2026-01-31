
import React from 'react';
import { Role } from '../../types';
import { ROLES_CONFIG } from '../../constants';

const LoginScreen: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-blue-500">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-800">One City Grocery</h1>
          <p className="mt-2 text-gray-600">Select your portal to continue</p>
        </div>
        
        {/* This is a mock Google Login button */}
        <div className="flex items-center justify-center p-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google icon" className="w-6 h-6 mr-4"/>
            <span className="font-semibold text-gray-700">Sign in with Google</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          {(Object.keys(ROLES_CONFIG) as Array<keyof typeof ROLES_CONFIG>).map((role) => (
            <a
              key={role}
              href={`/${role}.html`}
              className="w-full text-center px-4 py-3 font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
            >
              Open {ROLES_CONFIG[role].name} App
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
