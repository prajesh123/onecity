
import React from 'react';
import { Product, CartItem } from '../../types';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
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
        <button
          onClick={() => addToCart(product)}
          className="w-full flex items-center justify-center bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
        >
          <Plus size={16} className="mr-1" /> Add
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
