// src/CartSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // items: { name, image, cost (string like "$15"), quantity }
  },
  reducers: {
    addItem: (state, action) => {
      const incoming = action.payload;
      const existing = state.items.find(i => i.name === incoming.name);
      if (existing) {
        existing.quantity = (existing.quantity || 0) + (incoming.quantity || 1);
      } else {
        state.items.push({ ...incoming, quantity: incoming.quantity || 1 });
      }
    },
    removeItem: (state, action) => {
      const name = typeof action.payload === 'string' ? action.payload : action.payload.name;
      state.items = state.items.filter(i => i.name !== name);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find(i => i.name === name);
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(i => i.name !== name);
        } else {
          item.quantity = quantity;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    }
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = CartSlice.actions;
export default CartSlice.reducer;
