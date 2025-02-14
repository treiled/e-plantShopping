import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], 
    disabledButtons: {} 
  },
  reducers: {
    addItem: (state, action) => {
      const { id, name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1; 
      } else {
        state.items.push({ id, name, image, cost, quantity: 1 });
      }
      state.disabledButtons[id] = true; // 
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      delete state.disabledButtons[action.payload]; 
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.id === id);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;