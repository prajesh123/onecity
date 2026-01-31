
import React, { useState, useMemo } from 'react';
import Header from '../common/Header';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockOrders, mockProducts } from '../../services/mockData';
import { DELIVERY_PAYOUT_PER_ORDER } from '../../constants';
import { TrendingUp, TrendingDown, DollarSign, Package, Users, BarChart2, AlertCircle, Zap, Rewind } from 'lucide-react';
import InventoryManager from './InventoryManager';
import CustomerLookup from './CustomerLookup';
import DenialRequests from './DenialRequests';
import { Order, OrderStatus, OrderItem } from '../../types';

type Tab = 'dashboard' | 'inventory' | 'customers' | 'denials';
interface TrendingItem {
    id: string;
    name: string;
    quantity: number;
}


const ManagerDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('dashboard');
    const [dataVersion, setDataVersion] = useState(0); 

    const dailyStats = useMemo(() => {
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        const isSameDay = (d1: Date, d2: Date) =>
            d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate();

        const todaysDeliveredOrders = mockOrders.filter(o => o.status === 'Delivered' && isSameDay(new Date(o.createdAt), today));
        const yesterdaysDeliveredOrders = mockOrders.filter(o => o.status === 'Delivered' && isSameDay(new Date(o.createdAt), yesterday));
        const todaysDeniedOrders = mockOrders.filter(o => o.status === 'Denied' && isSameDay(new Date(o.createdAt), today));

        const calculateMetrics = (orders: Order[]) => {
            const sales = orders.reduce((sum, order) => sum + order.totalAmount, 0);
            const cost = orders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + (item.costAtConfirmation * item.quantity), 0), 0);
            const deliveryPayout = orders.length * DELIVERY_PAYOUT_PER_ORDER;
            const profit = sales - cost - deliveryPayout;
            return { sales, cost, deliveryPayout, profit };
        };
        
        const todaysMetrics = calculateMetrics(todaysDeliveredOrders);
        
        const todaysReturnsCount = todaysDeniedOrders.length;
        const todaysReturnsLoss = todaysDeniedOrders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + (item.costAtConfirmation * item.quantity), 0), 0);
        
        const getTrendingItems = (orders: Order[]): TrendingItem[] => {
            const itemCounts = new Map<string, number>();
            orders.forEach(order => {
                order.items.forEach(item => {
                    itemCounts.set(item.productId, (itemCounts.get(item.productId) || 0) + item.quantity);
                });
            });
            
            return Array.from(itemCounts.entries())
                .sort(([, qtyA], [, qtyB]) => qtyB - qtyA)
                .slice(0, 3)
                .map(([productId, quantity]) => {
                    const product = mockProducts.find(p => p.id === productId);
                    return { id: productId, name: product?.name || 'Unknown', quantity };
                });
        };

        return {
            ...todaysMetrics,
            returnsCount: todaysReturnsCount,
            returnsLoss: todaysReturnsLoss,
            trendingToday: getTrendingItems(todaysDeliveredOrders),
            trendingYesterday: getTrendingItems(yesterdaysDeliveredOrders),
        };
    }, [dataVersion]);
    
    const pendingDenialsCount = mockOrders.filter(o => o.status === OrderStatus.PendingDenial).length;
    
    const chartData = mockProducts.map(p => ({
        name: p.name,
        Sales: mockOrders.flatMap(o => o.items).filter(i => i.productId === p.id).reduce((sum, i) => sum + (i.priceAtConfirmation * i.quantity), 0),
    })).filter(d => d.Sales > 0).sort((a,b) => b.Sales - a.Sales).slice(0, 10);

    const forceUpdate = () => setDataVersion(v => v + 1);

    const TabButton: React.FC<{tabName: Tab, label: string, icon: React.ReactElement, count?: number}> = ({tabName, label, icon, count}) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-colors ${activeTab === tabName ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
            {icon}
            <span>{label}</span>
            {count > 0 && (
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold">{count}</span>
            )}
        </button>
    );

    return (
        <div>
            <Header title="Manager Dashboard" />
            <main className="container mx-auto p-4 space-y-6">
                <div className="flex flex-wrap gap-2 bg-white p-2 rounded-lg shadow-sm">
                    <TabButton tabName="dashboard" label="Dashboard" icon={<BarChart2 size={18}/>} />
                    <TabButton tabName="inventory" label="Inventory" icon={<Package size={18}/>} />
                    <TabButton tabName="customers" label="Customer Lookup" icon={<Users size={18}/>} />
                    <TabButton tabName="denials" label="Denial Requests" icon={<AlertCircle size={18}/>} count={pendingDenialsCount} />
                </div>

                {activeTab === 'dashboard' && (
                     <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white p-4 rounded-lg shadow flex items-center">
                                <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4"><DollarSign /></div>
                                <div><p className="text-sm text-gray-500">Today's Profit</p><p className="text-2xl font-bold">₹{dailyStats.profit.toFixed(2)}</p></div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow flex items-center">
                                <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4"><TrendingUp /></div>
                                <div><p className="text-sm text-gray-500">Today's Sales</p><p className="text-2xl font-bold">₹{dailyStats.sales.toFixed(2)}</p></div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow flex items-center">
                                <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4"><TrendingDown /></div>
                                <div><p className="text-sm text-gray-500">Today's Returns Loss</p><p className="text-2xl font-bold">₹{dailyStats.returnsLoss.toFixed(2)} <span className="text-base font-medium text-gray-600">({dailyStats.returnsCount} orders)</span></p></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow">
                                <h3 className="font-bold text-lg mb-4">Top 10 Products (All Time Sales)</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 20, left: 50, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" /><XAxis type="number" /><YAxis type="category" dataKey="name" width={100} interval={0} tick={{fontSize: 12}} /><Tooltip /><Bar dataKey="Sales" fill="#8884d8" /></BarChart>
                                </ResponsiveContainer>
                            </div>
                             <div className="bg-white p-4 rounded-lg shadow">
                                <h3 className="font-bold text-lg mb-4 flex items-center"><Zap className="mr-2 text-yellow-500"/>Trending Items</h3>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold mb-2 flex items-center text-gray-700"><TrendingUp size={16} className="mr-2 text-blue-500"/>Today's Bestsellers</h4>
                                        {dailyStats.trendingToday.length > 0 ? (
                                            <ul className="list-decimal list-inside space-y-1 text-sm">
                                                {dailyStats.trendingToday.map(item => <li key={item.id}>{item.name} <span className="font-semibold">({item.quantity} sold)</span></li>)}
                                            </ul>
                                        ) : <p className="text-sm text-gray-500">No sales yet today.</p>}
                                    </div>
                                    <div className="border-t pt-4">
                                        <h4 className="font-semibold mb-2 flex items-center text-gray-700"><Rewind size={16} className="mr-2 text-gray-500"/>Yesterday's Bestsellers</h4>
                                        {dailyStats.trendingYesterday.length > 0 ? (
                                            <ul className="list-decimal list-inside space-y-1 text-sm">
                                                {dailyStats.trendingYesterday.map(item => <li key={item.id}>{item.name} <span className="font-semibold">({item.quantity} sold)</span></li>)}
                                            </ul>
                                        ) : <p className="text-sm text-gray-500">No sales yesterday.</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                {activeTab === 'inventory' && <InventoryManager />}
                {activeTab === 'customers' && <CustomerLookup />}
                {activeTab === 'denials' && <DenialRequests key={dataVersion} onAction={forceUpdate} />}

            </main>
        </div>
    );
};

export default ManagerDashboard;
