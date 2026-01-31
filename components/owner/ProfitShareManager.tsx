
import React, { useState } from 'react';
import { ProfitShareSettings, UserProfitShareLog, Role } from '../../types';
import { mockUsers, mockOrders } from '../../services/mockData';
import { DELIVERY_PAYOUT_PER_ORDER } from '../../constants';
import { ToggleLeft, ToggleRight, Settings, PlayCircle, BarChart2, Download, Loader } from 'lucide-react';

const ProfitShareManager: React.FC = () => {
    const [settings, setSettings] = useState<ProfitShareSettings>({
        isEnabled: true,
        sharePercentage: 1,
        minWalletBalance: 3000,
        includeStaff: false,
    });
    const [dailyReport, setDailyReport] = useState<UserProfitShareLog[]>([]);
    const [lastRunSummary, setLastRunSummary] = useState<{ netProfit: number; sharePool: number; totalWalletPool: number } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const runDistribution = () => {
        setIsLoading(true);
        setDailyReport([]);
        setLastRunSummary(null);

        // --- 1. Calculate Net Profit ---
        const deliveredOrders = mockOrders.filter(o => o.status === 'Delivered');
        const totalSales = deliveredOrders.reduce((sum, order) => sum + order.totalAmount, 0);
        const productCost = deliveredOrders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + (item.costAtConfirmation * item.quantity), 0), 0);
        const deliveryPayout = deliveredOrders.length * DELIVERY_PAYOUT_PER_ORDER;
        const mlmPayout = 50; // Mock value
        const returnsLoss = 120; // Mock value
        const netProfit = totalSales - productCost - deliveryPayout - mlmPayout - returnsLoss;

        if (netProfit <= 0 || !settings.isEnabled) {
            alert(settings.isEnabled ? "Net profit is not positive. No shares to distribute." : "Profit Share system is disabled.");
            setIsLoading(false);
            return;
        }

        // --- 2. Filter Eligible Users ---
        const staffRoles = [Role.DeliveryPartner, Role.Worker, Role.Manager];
        const eligibleUsers = mockUsers.filter(user => {
            const isStaff = staffRoles.includes(user.role);
            if (isStaff && !settings.includeStaff) return false;
            return user.walletBalance >= settings.minWalletBalance;
        });

        if (eligibleUsers.length === 0) {
            alert("No users met the eligibility criteria.");
            setIsLoading(false);
            return;
        }

        // --- 3. Calculate Pools ---
        const sharePool = netProfit * (settings.sharePercentage / 100);
        const totalWalletPool = eligibleUsers.reduce((sum, user) => sum + user.walletBalance, 0);

        // --- 4. Calculate & Assign Shares ---
        const report: UserProfitShareLog[] = eligibleUsers.map(user => {
            const userFraction = user.walletBalance / totalWalletPool;
            const shareCredited = sharePool * userFraction;
            return {
                userId: user.id,
                userName: user.name,
                date: new Date().toISOString().split('T')[0],
                walletBalanceSnapshot: user.walletBalance,
                userFraction: userFraction,
                shareCredited: shareCredited,
            };
        }).sort((a,b) => b.walletBalanceSnapshot - a.walletBalanceSnapshot);

        // Simulate async operation
        setTimeout(() => {
            setDailyReport(report);
            setLastRunSummary({ netProfit, sharePool, totalWalletPool });
            setIsLoading(false);
        }, 1500);
    };
    
    const exportToCSV = () => {
        const headers = "UserID,UserName,Date,WalletBalance,Fraction,ShareCredited\n";
        const csvContent = dailyReport.map(row => `${row.userId},${row.userName},${row.date},${row.walletBalanceSnapshot.toFixed(2)},${row.userFraction.toFixed(6)},${row.shareCredited.toFixed(2)}`).join("\n");
        const blob = new Blob([headers + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", `profit_share_${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow space-y-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center"><BarChart2 className="mr-2 text-purple-600" />Profit Share System</h2>
            
            {/* Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border rounded-lg bg-gray-50">
                <div className="flex flex-col">
                    <label className="font-semibold text-gray-700">System Status</label>
                    <button onClick={() => setSettings(s => ({...s, isEnabled: !s.isEnabled}))} className="flex items-center text-lg mt-1">
                        {settings.isEnabled ? <ToggleRight className="text-green-500 w-12 h-12 -ml-2"/> : <ToggleLeft className="text-gray-400 w-12 h-12 -ml-2"/>}
                        <span className={`font-bold ${settings.isEnabled ? 'text-green-600' : 'text-gray-500'}`}>{settings.isEnabled ? 'Enabled' : 'Disabled'}</span>
                    </button>
                </div>
                <div>
                    <label htmlFor="sharePercentage" className="font-semibold text-gray-700 block">Share Percentage: <span className="font-bold text-purple-600">{settings.sharePercentage}%</span></label>
                    <input type="range" id="sharePercentage" min="0" max="5" step="0.1" value={settings.sharePercentage} onChange={e => setSettings(s => ({...s, sharePercentage: parseFloat(e.target.value)}))} className="w-full mt-2"/>
                </div>
                <div>
                    <label htmlFor="minBalance" className="font-semibold text-gray-700 block">Min. Wallet Balance</label>
                    <input type="number" id="minBalance" value={settings.minWalletBalance} onChange={e => setSettings(s => ({...s, minWalletBalance: parseInt(e.target.value) || 0}))} className="w-full p-2 border rounded mt-1"/>
                </div>
                <div className="flex flex-col">
                    <label className="font-semibold text-gray-700">Include Staff</label>
                    <button onClick={() => setSettings(s => ({...s, includeStaff: !s.includeStaff}))} className="flex items-center text-lg mt-1">
                        {settings.includeStaff ? <ToggleRight className="text-green-500 w-12 h-12 -ml-2"/> : <ToggleLeft className="text-gray-400 w-12 h-12 -ml-2"/>}
                         <span className={`font-bold ${settings.includeStaff ? 'text-green-600' : 'text-gray-500'}`}>{settings.includeStaff ? 'Yes' : 'No'}</span>
                    </button>
                </div>
            </div>

            {/* Action */}
            <div className="text-center">
                 <button onClick={runDistribution} disabled={isLoading} className="bg-purple-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 flex items-center justify-center mx-auto">
                    {isLoading ? <Loader className="animate-spin mr-2"/> : <PlayCircle className="mr-2" />}
                    {isLoading ? 'Calculating...' : 'Run Daily Distribution'}
                </button>
            </div>

            {/* Results */}
            {lastRunSummary && (
                <div className="p-4 border rounded-lg animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-4">
                        <div><p className="text-sm text-gray-500">Net Profit</p><p className="font-bold text-xl">₹{lastRunSummary.netProfit.toFixed(2)}</p></div>
                        <div><p className="text-sm text-gray-500">Total Share Pool</p><p className="font-bold text-xl text-green-600">₹{lastRunSummary.sharePool.toFixed(2)}</p></div>
                        <div><p className="text-sm text-gray-500">Eligible Wallet Pool</p><p className="font-bold text-xl">₹{lastRunSummary.totalWalletPool.toFixed(2)}</p></div>
                    </div>
                    <div className="flex justify-end">
                        <button onClick={exportToCSV} className="bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800 flex items-center"><Download className="mr-2" size={18} /> Export CSV</button>
                    </div>
                    <div className="overflow-x-auto mt-2">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-2">User</th>
                                    <th className="p-2 text-right">Wallet Balance</th>
                                    <th className="p-2 text-right">Fraction</th>
                                    <th className="p-2 text-right">Share Credited</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dailyReport.map(log => (
                                    <tr key={log.userId} className="border-b">
                                        <td className="p-2 font-semibold">{log.userName}</td>
                                        <td className="p-2 text-right">₹{log.walletBalanceSnapshot.toFixed(2)}</td>
                                        <td className="p-2 text-right">{(log.userFraction * 100).toFixed(4)}%</td>
                                        <td className="p-2 text-right font-bold text-green-600">₹{log.shareCredited.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfitShareManager;
