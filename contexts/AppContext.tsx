
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User, Role } from '../types';
import { mockUsers } from '../services/mockData';

interface AppContextType {
  user: User | null;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode, defaultRole: Role }> = ({ children, defaultRole }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // On mount, find and set the user for the specific app (e.g., Customer App gets a customer user).
    const userToLogin = mockUsers.find(u => u.role === defaultRole);
    if (userToLogin) {
      setUser(userToLogin);
    }
  }, [defaultRole]);


  const logout = () => {
    setUser(null);
    window.location.assign('/'); // Redirect to the main login portal
  };

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Loading user profile...</div>;
  }

  return (
    <AppContext.Provider value={{ user, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AppProvider');
  }
  return context;
};
