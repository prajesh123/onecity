
import React from 'react';
import { mockProducts } from '../../services/mockData';

const InventoryManager: React.FC = () => {
    const LOW_STOCK_THRESHOLD = 10;
    
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg mb-4">Inventory & Promotions</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2">Product</th>
                            <th className="p-2">Category</th>
                            <th className="p-2 text-right">Stock Level</th>
                            <th className="p-2">Promotion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockProducts.sort((a,b) => a.stockLevel - b.stockLevel).map(product => (
                            <tr key={product.id} className="border-b">
                                <td className="p-2 font-semibold">{product.name}</td>
                                <td className="p-2">{product.category}</td>
                                <td className={`p-2 text-right font-bold ${product.stockLevel < LOW_STOCK_THRESHOLD ? 'text-red-500' : 'text-gray-700'}`}>
                                    {product.stockLevel} {product.unit}
                                </td>
                                <td className="p-2">
                                    {product.promotion ? (
                                        <span className="bg-green-100 text-green-800 font-semibold px-2 py-1 rounded text-xs">{product.promotion}</span>
                                    ) : (
                                        <span className="text-gray-400">-</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InventoryManager;
