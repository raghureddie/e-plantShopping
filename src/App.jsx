// src/App.jsx
import React, { useState } from "react";
import LandingPage from "./LandingPage";
import ProductList from "./ProductList";
import CartItem from "./CartItem";
import Header from "./Header";

function App() {
  const [page, setPage] = useState("landing");

  const goToLanding = () => setPage("landing");
  const goToProducts = () => setPage("products");
  const goToCart = () => setPage("cart");

  return (
    <>
      {page === "landing" && <LandingPage onGetStarted={goToProducts} />}

      {page !== "landing" && (
        <Header onHomeClick={goToLanding} onPlantsClick={goToProducts} onCartClick={goToCart} />
      )}

      {page === "products" && (
        <ProductList onHomeClick={goToLanding} onGoToCart={goToCart} />
      )}

      {page === "cart" && (
        <CartItem onContinueShopping={goToProducts} />
      )}
    </>
  );
}

export default App;
