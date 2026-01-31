
import React, { useState, useMemo } from 'react';
import { mockUsers } from '../../services/mockData';
import { User, Role } from '../../types';
import { Search, User as UserIcon, Wallet, Star, AlertTriangle } from 'lucide-react';

const CustomerLookup: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = useMemo(() => {
        if (!searchTerm) return [];
        return mockUsers.filter(user => 
            user.role === Role.Customer && 
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg mb-4">Customer Lookup</h3>
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                <input 
                    type="text"
                    placeholder="Search by customer name..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="space-y-4">
                {searchTerm && filteredUsers.length > 0 && filteredUsers.map(user => (
                    <div key={user.id} className="p-4 border rounded-lg flex justify-between items-start">
                        <div>
                            <div className="flex items-center mb-2">
                                <UserIcon className="mr-2 text-blue-500" />
                                <p className="font-bold text-lg">{user.name}</p>
                            </div>
                            <p className="text-sm text-gray-600">{user.email}</p>
                             <p className="text-sm text-gray-500">{user.address}</p>
                        </div>
                        <div className="text-right space-y-2">
                            <div className="flex items-center justify-end text-green-600">
                                <Wallet size={16} className="mr-1"/>
                                <span className="font-semibold">₹{user.walletBalance.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-end text-yellow-600">
                                <Star size={16} className="mr-1"/>
                                <span className="font-semibold">{user.loyaltyPoints} points</span>
                            </div>
                            {user.isFlagged && (
                                <div className="flex items-center justify-end bg-red-100 text-red-700 px-2 py-1 rounded">
                                    <AlertTriangle size={16} className="mr-1"/>
                                    <span className="font-semibold text-xs">FLAGGED</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {searchTerm && filteredUsers.length === 0 && (
                    <p className="text-center text-gray-500 py-4">No customers found.</p>
                )}
            </div>
        </div>
    );
};

export default CustomerLookup;
