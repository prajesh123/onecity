
import React, { useState, useMemo } from 'react';
import { mockProducts } from '../../services/mockData';
import ProductCard from './ProductCard';
import { CartItem, Product } from '../../types';
import Header from '../common/Header';
import Cart from './Cart';
import ProfitShareHistory from './ProfitShareHistory';
import { useAuth } from '../../contexts/AppContext';
import OrderHistory from './OrderHistory';
import RewardsDashboard from './RewardsDashboard';
import { Search, Tag } from 'lucide-react';

const CustomerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(mockProducts.map(p => p.category)))];

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const addToCart = (product: Product, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity: quantity }];
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart(prevCart => {
        if (quantity <= 0) {
            return prevCart.filter(item => item.id !== productId);
        }
        return prevCart.map(item => item.id === productId ? {...item, quantity} : item);
    });
  };

  const clearCart = () => {
    setCart([]);
  }

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
      <Header title="Groceries" cartItemCount={cartItemCount} onCartClick={() => setIsCartOpen(true)} />
      <main className="container mx-auto p-4">
        
        {/* Customer Hub Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <OrderHistory userId={user.id} />
            <div className="space-y-6">
                <RewardsDashboard user={user} />
                <ProfitShareHistory userId={user.id} />
            </div>
        </div>
        
        {/* Product Listing Section */}
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">All Products</h2>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                    <input 
                        type="text"
                        placeholder="Search for products..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                 <div className="relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                    <select
                        value={selectedCategory}
                        onChange={e => setSelectedCategory(e.target.value)}
                        className="w-full md:w-48 p-2 pl-10 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} />
              ))}
            </div>
            {filteredProducts.length === 0 && (
                <p className="text-center text-gray-500 py-8">No products found.</p>
            )}
        </div>
      </main>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cart} updateCartQuantity={updateCartQuantity} clearCart={clearCart} />
    </div>
  );
};

export default CustomerDashboard;
