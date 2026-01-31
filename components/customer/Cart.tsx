
import React, { useState } from 'react';
import { CartItem } from '../../types';
import { X, Trash2, Minus, Plus, CheckCircle } from 'lucide-react';
import PrintableBill from '../print/PrintableBill';
import { mockOrders } from '../../services/mockData';
import { useAuth } from '../../contexts/AppContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, cartItems, updateCartQuantity, clearCart }) => {
    const { user } = useAuth();
    const [useWallet, setUseWallet] = useState(true);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [placedOrder, setPlacedOrder] = useState<typeof mockOrders[0] | null>(null);

    const totalAmount = cartItems.reduce((sum, item) => sum + item.sellingPrice * item.quantity, 0);
    const walletAmountToUse = useWallet ? Math.min(totalAmount, user?.walletBalance || 0) : 0;
    const cashToPay = totalAmount - walletAmountToUse;

    const handlePlaceOrder = () => {
        // Mock order placement
        const newOrder = {
            id: `ORD${Math.floor(Math.random() * 900) + 100}`,
            customerId: user.id,
            customerName: user.name,
            customerAddress: user.address,
            items: cartItems.map(item => ({
                productId: item.id,
                name: item.name,
                quantity: item.quantity,
                unit: item.unit,
                priceAtConfirmation: item.sellingPrice,
                costAtConfirmation: item.costPrice,
            })),
            totalAmount: totalAmount,
            walletAmountUsed: walletAmountToUse,
            cashToPay: cashToPay,
            status: 'Pending' as any,
            createdAt: new Date().toISOString(),
            pin: String(Math.floor(1000 + Math.random() * 9000)),
            isFlaggedOrder: user.isFlagged // Set flag on order if user is flagged
        };
        setPlacedOrder(newOrder);
        setOrderPlaced(true);
        // Do not clear cart to allow printing receipt
    };
    
    const handleCloseAndReset = () => {
        if (orderPlaced) {
            clearCart();
        }
        setOrderPlaced(false);
        setPlacedOrder(null);
        onClose();
    }


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleCloseAndReset}>
            <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl z-50 flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-2xl font-bold text-gray-800">{orderPlaced ? 'Order Successful' : 'Your Cart'}</h2>
                    <button onClick={handleCloseAndReset} className="p-2 rounded-full hover:bg-gray-100"><X /></button>
                </div>
                
                {orderPlaced && placedOrder ? (
                    <div className="p-6 text-center flex flex-col items-center justify-center flex-grow">
                        <CheckCircle className="w-24 h-24 text-green-500 mb-4" />
                        <h3 className="text-2xl font-bold mb-2">Thank you for your order!</h3>
                        <p className="text-gray-600 mb-4">Your order ID is <span className="font-semibold text-indigo-600">{placedOrder.id}</span>.</p>
                        <PrintableBill order={placedOrder} />
                        <button onClick={() => window.print()} className="mt-4 w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600">
                           Print Bill
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="flex-grow overflow-y-auto p-4 space-y-4">
                            {cartItems.length === 0 ? (
                                <p className="text-center text-gray-500 mt-8">Your cart is empty.</p>
                            ) : (
                                cartItems.map(item => (
                                    <div key={item.id} className="flex items-center space-x-4">
                                        <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                                        <div className="flex-grow">
                                            <p className="font-semibold">{item.name}</p>
                                            <p className="text-sm text-gray-500">₹{item.sellingPrice.toFixed(2)}</p>
                                        </div>
                                        <div className="flex items-center border rounded-lg">
                                            <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="p-2"><Minus size={14}/></button>
                                            <span className="px-3 font-semibold">{item.quantity}</span>
                                            <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="p-2"><Plus size={14}/></button>
                                        </div>
                                        <button onClick={() => updateCartQuantity(item.id, 0)} className="p-2 text-red-500 hover:text-red-700"><Trash2 size={18}/></button>
                                    </div>
                                ))
                            )}
                        </div>
                        {cartItems.length > 0 && (
                            <div className="p-4 border-t bg-gray-50">
                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between"><span>Subtotal</span><span>₹{totalAmount.toFixed(2)}</span></div>
                                    <div className="flex justify-between items-center">
                                        <label htmlFor="useWallet" className="flex items-center cursor-pointer">
                                            <input type="checkbox" id="useWallet" checked={useWallet} onChange={e => setUseWallet(e.target.checked)} className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                                            <span className="ml-2">Use Wallet (₹{user?.walletBalance.toFixed(2)})</span>
                                        </label>
                                        <span className="text-green-600">- ₹{walletAmountToUse.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-xl pt-2 border-t"><span>To Pay</span><span>₹{cashToPay.toFixed(2)}</span></div>
                                </div>
                                <button onClick={handlePlaceOrder} className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-colors">
                                    Place Order
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
