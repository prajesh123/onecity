
import React from 'react';
import { User } from '../../types';
import { Star, Users, Gift, Copy } from 'lucide-react';

interface RewardsDashboardProps {
    user: User | null;
}

const RewardsDashboard: React.FC<RewardsDashboardProps> = ({ user }) => {
    if (!user) return null;

    const copyReferralCode = () => {
        navigator.clipboard.writeText(user.referralCode);
        alert("Referral code copied to clipboard!");
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-800 flex items-center mb-4">
                <Gift className="mr-2 text-red-500" />
                Your Rewards
            </h2>
            <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                        <Star className="text-yellow-500 mr-3" />
                        <p className="font-semibold">Loyalty Points</p>
                    </div>
                    <p className="font-bold text-lg text-yellow-600">{user.loyaltyPoints}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                     <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <Users className="text-green-500 mr-3" />
                            <p className="font-semibold">MLM Earnings</p>
                        </div>
                        <p className="font-bold text-lg text-green-600">₹{user.mlmEarnings.toFixed(2)}</p>
                    </div>
                    <div className="mt-3 pt-3 border-t">
                        <p className="text-sm text-gray-600 mb-1">Your Referral Code:</p>
                        <div className="flex items-center justify-between bg-white p-2 border rounded-md">
                            <span className="font-mono font-semibold text-gray-700">{user.referralCode}</span>
                            <button onClick={copyReferralCode} title="Copy code" className="p-1 text-gray-500 hover:text-blue-600"><Copy size={16}/></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RewardsDashboard;
