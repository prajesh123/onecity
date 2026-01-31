
import React, { useState } from 'react';
import Header from '../common/Header';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockOrders, mockProducts } from '../../services/mockData';
import { DELIVERY_PAYOUT_PER_ORDER } from '../../constants';
import { TrendingUp, TrendingDown, DollarSign, Package, Users, BarChart2 } from 'lucide-react';
import InventoryManager from './InventoryManager';
import CustomerLookup from './CustomerLookup';

type Tab = 'dashboard' | 'inventory' | 'customers';

const ManagerDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('dashboard');

    // --- Profit Calculation ---
    const deliveredOrders = mockOrders.filter(o => o.status === 'Delivered');
    const totalSales = deliveredOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    const productCost = deliveredOrders.reduce((sum, order) => 
        sum + order.items.reduce((itemSum, item) => itemSum + (item.costAtConfirmation * item.quantity), 0), 0);
    const deliveryPayout = deliveredOrders.length * DELIVERY_PAYOUT_PER_ORDER;
    const mlmPayout = 50; // Mock value
    const returnsLoss = 120; // Mock value
    const netProfit = totalSales - productCost - deliveryPayout - mlmPayout - returnsLoss;

    // --- Trending Items ---
    const itemSales: { [key: string]: number } = {};
    deliveredOrders.forEach(order => {
        order.items.forEach(item => {
            itemSales[item.name] = (itemSales[item.name] || 0) + item.quantity;
        });
    });
    const trendingItems = Object.entries(itemSales)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([name, quantity]) => ({ name, quantity }));
    
    // --- Chart Data ---
    const chartData = mockProducts.map(p => ({
        name: p.name,
        Sales: mockOrders.flatMap(o => o.items).filter(i => i.productId === p.id).reduce((sum, i) => sum + (i.priceAtConfirmation * i.quantity), 0),
        Profit: mockOrders.flatMap(o => o.items).filter(i => i.productId === p.id).reduce((sum, i) => sum + ((i.priceAtConfirmation - i.costAtConfirmation) * i.quantity), 0),
    })).filter(d => d.Sales > 0);

    const TabButton: React.FC<{tabName: Tab, label: string, icon: React.ReactElement}> = ({tabName, label, icon}) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-colors ${activeTab === tabName ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );

    return (
        <div>
            <Header title="Manager Dashboard" />
            <main className="container mx-auto p-4 space-y-6">
                <div className="flex space-x-2 bg-white p-2 rounded-lg shadow-sm">
                    <TabButton tabName="dashboard" label="Dashboard" icon={<BarChart2 size={18}/>} />
                    <TabButton tabName="inventory" label="Inventory" icon={<Package size={18}/>} />
                    <TabButton tabName="customers" label="Customer Lookup" icon={<Users size={18}/>} />
                </div>

                {activeTab === 'dashboard' && (
                    <div className="space-y-6">
                        {/* Profit Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-white p-4 rounded-lg shadow flex items-center">
                                <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4"><DollarSign /></div>
                                <div>
                                    <p className="text-sm text-gray-500">Today's Profit</p>
                                    <p className="text-2xl font-bold">₹{netProfit.toFixed(2)}</p>
                                </div>
                            </div>
                             <div className="bg-white p-4 rounded-lg shadow flex items-center">
                                <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4"><TrendingUp /></div>
                                <div>
                                    <p className="text-sm text-gray-500">Total Sales</p>
                                    <p className="text-2xl font-bold">₹{totalSales.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow flex items-center">
                                <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4"><TrendingDown /></div>
                                <div>
                                    <p className="text-sm text-gray-500">Returns Loss</p>
                                    <p className="text-2xl font-bold">₹{returnsLoss.toFixed(2)}</p>
                                </div>
                            </div>
                             <div className="bg-white p-4 rounded-lg shadow flex items-center">
                                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4"><TrendingUp /></div>
                                <div>
                                    <p className="text-sm text-gray-500">Trending Items</p>
                                    <p className="text-2xl font-bold">{trendingItems.length > 0 ? trendingItems[0].name : 'N/A'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Charts and Lists */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow">
                                <h3 className="font-bold text-lg mb-4">Sales & Profit by Product</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" angle={-30} textAnchor="end" height={70} interval={0} tick={{fontSize: 12}}/>
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="Sales" fill="#8884d8" />
                                        <Bar dataKey="Profit" fill="#82ca9d" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow">
                                <h3 className="font-bold text-lg mb-4">Top 5 Trending Items</h3>
                                <ul className="space-y-3">
                                    {trendingItems.map((item, index) => (
                                        <li key={item.name} className="flex justify-between items-center">
                                            <span>{index + 1}. {item.name}</span>
                                            <span className="font-semibold bg-gray-100 px-2 py-1 rounded">{item.quantity.toFixed(2)} sold</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
                
                {activeTab === 'inventory' && <InventoryManager />}
                {activeTab === 'customers' && <CustomerLookup />}

            </main>
        </div>
    );
};

export default ManagerDashboard;
