import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push({
          ...newItem,
          quantity: newItem.quantity || 1,
        });
      }

      state.totalAmount += newItem.price * newItem.quantity;
    },

    removeItem: (state, action) => {
      const { id } = action.payload;
      const itemToRemove = state.items.find((item) => item.id === id);
      if (itemToRemove) {
        state.totalAmount -= itemToRemove.price * itemToRemove.quantity;
        state.items = state.items.filter((item) => item.id !== id);
      }
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.id === id);
      if (itemToUpdate) {
        state.totalAmount +=
          itemToUpdate.price * (quantity - itemToUpdate.quantity);
        itemToUpdate.quantity = quantity;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
