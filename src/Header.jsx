// src/Header.jsx
import React from 'react';
import './Header.css';
import { useSelector } from 'react-redux';

const Header = ({ onHomeClick, onPlantsClick, onCartClick }) => {
  const cart = useSelector(state => state.cart.items || []);
  const totalQty = cart.reduce((t, i) => t + (i.quantity || 0), 0);

  return (
    <header className="app-header">
      <div className="header-left" onClick={onHomeClick} role="button" tabIndex={0}>
        <img className="logo" src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="logo" />
        <div className="brand">
          <h3>Paradise Nursery</h3>
          <span className="tagline">Where Green Meets Serenity</span>
        </div>
      </div>

      <nav className="header-right">
        <button className="nav-btn" onClick={onPlantsClick}>Plants</button>

        <button className="cart-btn" onClick={onCartClick} aria-label="Open cart">
          <svg height="28" width="28" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
            <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6"></path>
            <circle cx="80" cy="216" r="12" fill="#fff"></circle>
            <circle cx="184" cy="216" r="12" fill="#fff"></circle>
          </svg>
          {totalQty > 0 && <span className="cart-badge" aria-live="polite">{totalQty}</span>}
        </button>
      </nav>
    </header>
  );
};

export default Header;
