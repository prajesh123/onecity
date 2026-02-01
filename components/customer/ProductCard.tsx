
import React from 'react';
import { Product } from '../../types';
import { useApp } from '../../contexts/AppContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useApp();

  return (
    <div style={cardStyle}>
      <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px 4px 0 0' }} />
      <div style={{ padding: '1rem' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>{product.name}</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#555' }}>${product.price.toFixed(2)} / {product.unit}</p>
        <button onClick={() => addToCart(product)} style={buttonStyle}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const cardStyle: React.CSSProperties = {
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  textAlign: 'center',
  transition: 'transform 0.2s',
};

const buttonStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#3f51b5',
  color: 'white',
  cursor: 'pointer',
  fontWeight: 'bold',
};

export default ProductCard;
