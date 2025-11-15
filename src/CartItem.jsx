// src/CartItem.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const parseCost = (costStr) => {
    if (costStr === undefined || costStr === null) return 0;
    const num = Number(String(costStr).replace(/[^0-9.-]+/g, ''));
    return isNaN(num) ? 0 : num;
  };

  const calculateTotalAmount = () => {
    const total = cart.reduce((sum, item) => {
      const price = parseCost(item.cost);
      const qty = item.quantity || 0;
      return sum + price * qty;
    }, 0);
    return total.toFixed(2);
  };

  const totalItemsCount = cart.reduce((t, i) => t + (i.quantity || 0), 0);

  const handleContinueShopping = (e) => {
    e && e.preventDefault();
    if (onContinueShopping) onContinueShopping();
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: (item.quantity || 0) + 1 }));
  };

  const handleDecrement = (item) => {
    const newQty = (item.quantity || 0) - 1;
    if (newQty <= 0) {
      dispatch(removeItem(item.name));
    } else {
      dispatch(updateQuantity({ name: item.name, quantity: newQty }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const calculateTotalCost = (item) => {
    const price = parseCost(item.cost);
    const qty = item.quantity || 0;
    return (price * qty).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <h3>Total Items: {totalItemsCount}</h3>

      <div className="cart-list">
        {cart.length === 0 && <p>Your cart is empty.</p>}
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">Unit Price: {item.cost}</div>

              <div className="cart-item-quantity">
                <button className="cart-item-button" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button" onClick={() => handleIncrement(item)}>+</button>
              </div>

              <div className="cart-item-total">Subtotal: ${calculateTotalCost(item)}</div>

              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="total_cart_amount">Grand Total: ${calculateTotalAmount()}</div>

      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
        <button className="get-started-button1" onClick={() => alert('Checkout functionality will be added later')}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
