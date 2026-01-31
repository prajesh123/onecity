
import React from 'react';
import { mockUserProfitShareLogs } from '../../services/mockData';
import { Award, Wallet, PieChart } from 'lucide-react';

interface ProfitShareHistoryProps {
    userId: string;
}

const ProfitShareHistory: React.FC<ProfitShareHistoryProps> = ({ userId }) => {
    const userLogs = mockUserProfitShareLogs.filter(log => log.userId === userId);

    if (userLogs.length === 0) {
        return null; // Don't show the component if there's no history
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-800 flex items-center mb-4">
                <Award className="mr-2 text-amber-500" />
                Your Profit Share Bonus
            </h2>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-2">Date</th>
                            <th className="p-2">Wallet Snapshot</th>
                            <th className="p-2">Your Fraction</th>
                            <th className="p-2 text-right">Bonus Credited</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userLogs.map(log => (
                            <tr key={log.date} className="border-b">
                                <td className="p-2">{new Date(log.date).toLocaleDateString()}</td>
                                <td className="p-2 flex items-center">
                                    <Wallet size={16} className="mr-1 text-gray-500"/>
                                    ₹{log.walletBalanceSnapshot.toFixed(2)}
                                </td>
                                <td className="p-2 flex items-center">
                                    <PieChart size={16} className="mr-1 text-gray-500"/>
                                    {(log.userFraction * 100).toFixed(4)}%
                                </td>
                                <td className="p-2 text-right font-bold text-green-600">
                                    + ₹{log.shareCredited.toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProfitShareHistory;
