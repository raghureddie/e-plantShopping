// src/ProductList.jsx
import React, { useState, useEffect } from 'react';
import './ProductList.css';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList({ onHomeClick, onGoToCart }) {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items);

  const [showCart, setShowCart] = useState(false);
  const [showPlants, setShowPlants] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night, improving air quality.", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene from the air.", cost: "$12" },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg", description: "Removes mold spores and purifies the air.", cost: "$18" },
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3", description: "Calming scent, used in aromatherapy.", cost: "$20" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3", description: "Sweet fragrance, promotes relaxation.", cost: "$18" },
        { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Invigorating scent, often used in cooking.", cost: "$15" },
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.0.3", description: "Thrives in low light and requires minimal watering.", cost: "$25" },
        { name: "Pothos", image: "https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816945_1280.jpg", description: "Tolerates neglect and can grow in various conditions.", cost: "$10" },
        { name: "Succulents", image: "https://cdn.pixabay.com/photo/2016/11/21/16/05/cacti-1846147_1280.jpg", description: "Drought-tolerant plants with unique shapes and colors.", cost: "$18" },
      ]
    }
  ];

  useEffect(() => {
    const map = {};
    cart.forEach(ci => map[ci.name] = true);
    setAddedToCart(map);
  }, [cart]);

  const handleAddToCart = (plant) => {
    const item = { name: plant.name, image: plant.image, cost: plant.cost, quantity: 1 };
    dispatch(addItem(item));
    setAddedToCart(prev => ({ ...prev, [plant.name]: true }));
    setShowCart(true); // optionally open cart after add
  };

  const handleContinueShopping = () => {
    setShowCart(false);
    setShowPlants(true);
  };

  const totalItemsCount = cart.reduce((t, i) => t + (i.quantity || 0), 0);

  return (
    <div>
      {/* Content only — header is provided by Header.jsx in App.jsx */}
      {!showCart ? (
        <div className="product-grid">
          {showPlants ? (
            plantsArray.map(cat => (
              <div className="category" key={cat.category}>
                <h2 className="category-title">{cat.category}</h2>
                <div className="product-list">
                  {cat.plants.map(plant => (
                    <div className="product-card" key={plant.name}>
                      <img className="product-image" src={plant.image} alt={plant.name} />
                      <div className="product-title">{plant.name}</div>
                      <div className="product-description">{plant.description}</div>
                      <div className="product-cost">{plant.cost}</div>
                      <button
                        className={`product-button ${addedToCart[plant.name] ? 'added-to-cart' : ''}`}
                        onClick={() => handleAddToCart(plant)}
                        disabled={!!addedToCart[plant.name]}
                      >
                        {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="landing-teaser">
              <h2>Welcome to Paradise Nursery</h2>
              <p>Click "Plants" in the header to view our collections.</p>
              <button className="get-started-button" onClick={() => setShowPlants(true)}>Get Started</button>
              <div style={{ marginTop: 12, color: '#333' }}>Cart items: {totalItemsCount}</div>
            </div>
          )}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
