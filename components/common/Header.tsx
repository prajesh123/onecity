
import React from 'react';
import { useAuth } from '../../contexts/AppContext';
import { ROLES_CONFIG } from '../../constants';
import { User, Wallet, LogOut, ShoppingCart } from 'lucide-react';

const Header: React.FC<{ title: string, cartItemCount?: number, onCartClick?: () => void }> = ({ title, cartItemCount, onCartClick }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-md sticky top-0 z-10 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">{title}</h1>
        <div className="flex items-center space-x-4">
          {user && (
            <div className="hidden md:flex items-center space-x-2 text-right">
              <div>
                <p className="font-semibold text-gray-700">{user.name}</p>
                <p className="text-sm text-gray-500">{ROLES_CONFIG[user.role].name}</p>
              </div>
              <div className="p-2 bg-gray-200 rounded-full">
                <User className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          )}
          {user && (
            <div className="flex items-center space-x-2 border-l pl-4">
              <div className="flex items-center">
                 <Wallet className="h-5 w-5 text-green-600 mr-1" />
                 <span className="font-semibold text-gray-700">₹{user.walletBalance.toFixed(2)}</span>
              </div>
              {onCartClick && (
                 <button onClick={onCartClick} className="relative p-2 rounded-full hover:bg-gray-100">
                    <ShoppingCart className="h-6 w-6 text-gray-700"/>
                    {cartItemCount > 0 && (
                        <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">{cartItemCount}</span>
                    )}
                 </button>
              )}
              <button onClick={logout} className="p-2 rounded-full hover:bg-gray-100">
                <LogOut className="h-6 w-6 text-red-500" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
