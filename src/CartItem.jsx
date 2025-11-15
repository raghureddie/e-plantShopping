import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Helper: parse cost like "$15" to number 15
  const parseCost = (costStr) => {
    if (costStr === undefined || costStr === null) return 0;
    const num = Number(String(costStr).replace(/[^0-9.-]+/g, ''));
    return isNaN(num) ? 0 : num;
  };

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    const total = cart.reduce((sum, item) => {
      const price = parseCost(item.cost);
      const qty = item.quantity || 0;
      return sum + price * qty;
    }, 0);
    return total.toFixed(2);
  };

  const handleContinueShopping = (e) => {
    if (e) e.preventDefault();
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

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const price = parseCost(item.cost);
    const qty = item.quantity || 0;
    return (price * qty).toFixed(2);
  };

  const totalItemsCount = cart.reduce((t, i) => t + (i.quantity || 0), 0);

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <h3 style={{ color: 'black' }}>Total Items: {totalItemsCount}</h3>

      <div>
        {cart.length === 0 && <p>Your cart is empty.</p>}
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">Unit Price: {item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Subtotal: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>

      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={() => alert('Checkout functionality to be added later')}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
