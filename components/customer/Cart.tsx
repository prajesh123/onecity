
import React from 'react';
import { useApp } from '../../contexts/AppContext';

const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useApp();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={cartStyle}>
      <h3 style={{ marginTop: 0 }}>My Cart</h3>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cart.map(item => (
              <li key={item.id} style={cartItemStyle}>
                <span>{item.name} (x{item.quantity})</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
                <button onClick={() => removeFromCart(item.id)} style={removeButtonStyle}>✕</button>
              </li>
            ))}
          </ul>
          <hr />
          <div style={totalStyle}>
            <strong>Total:</strong>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <button onClick={() => { alert('Order placed!'); clearCart(); }} style={checkoutButtonStyle}>
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

const cartStyle: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '1.5rem',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
};

const cartItemStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.5rem 0',
  borderBottom: '1px solid #eee',
};

const removeButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    color: '#c62828',
    cursor: 'pointer',
    fontSize: '1rem',
    marginLeft: '1rem',
}

const totalStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '1.2rem',
  marginTop: '1rem',
};

const checkoutButtonStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#2e7d32',
  color: 'white',
  cursor: 'pointer',
  fontWeight: 'bold',
  marginTop: '1.5rem',
};

export default Cart;
