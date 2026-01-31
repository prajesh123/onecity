
import React, { useState } from 'react';
import { Product } from '../../types';
import { Plus, Minus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  const isWeightBased = product.unit === 'kg' || product.unit === 'grams';
  const step = isWeightBased ? (product.unit === 'kg' ? 0.1 : 50) : 1;
  const initialQuantity = isWeightBased ? step : 1;
  
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleQuantityChange = (change: number) => {
    setQuantity(prevQuantity => {
      let newQuantity = prevQuantity + change;
      if (newQuantity < step) {
        newQuantity = step;
      }
      if (isWeightBased) {
        return parseFloat(newQuantity.toFixed(2));
      }
      return newQuantity;
    });
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between transition-transform transform hover:scale-105 relative">
      {product.promotion && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">{product.promotion}</div>
      )}
      <img src={product.imageUrl} alt={product.name} className="w-full h-32 object-cover" />
      <div className="p-4 flex-grow">
        <h3 className="font-bold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="mt-2 font-semibold text-lg text-green-600">
          ₹{product.sellingPrice.toFixed(2)} <span className="text-sm font-normal text-gray-500">/ {product.unit}</span>
        </p>
      </div>
      <div className="p-4 pt-0">
        <div className="flex items-center justify-between mb-2 border rounded-lg p-1">
            <button 
              onClick={() => handleQuantityChange(-step)} 
              className="p-1 rounded-full text-gray-600 hover:bg-gray-200"
              aria-label="Decrease quantity"
            >
              <Minus size={16}/>
            </button>
            <span className="font-bold text-gray-800 text-center w-16">
              {quantity.toFixed(isWeightBased && product.unit === 'kg' ? 1 : 0)} {product.unit}
            </span>
            <button 
              onClick={() => handleQuantityChange(step)} 
              className="p-1 rounded-full text-gray-600 hover:bg-gray-200"
              aria-label="Increase quantity"
            >
              <Plus size={16}/>
            </button>
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
