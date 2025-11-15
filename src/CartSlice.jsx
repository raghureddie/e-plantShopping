import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Each item: { name, image, cost (string like "$15"), quantity }
  },
  reducers: {
    addItem: (state, action) => {
      // action.payload: { name, image, cost, quantity? }
      const incoming = action.payload;
      const existing = state.items.find(i => i.name === incoming.name);
      if (existing) {
        existing.quantity = (existing.quantity || 0) + (incoming.quantity || 1);
      } else {
        state.items.push({ ...incoming, quantity: incoming.quantity || 1 });
      }
    },
    removeItem: (state, action) => {
      // payload can be name (string) or object with .name
      const name = typeof action.payload === 'string' ? action.payload : action.payload.name;
      state.items = state.items.filter(i => i.name !== name);
    },
    updateQuantity: (state, action) => {
      // action.payload = { name, quantity }
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
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
