import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  hasChanged: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      state.hasChanged = true;
      const newItem = action.payload;

      const existingItem = state.items.find((item) => {
        return item.id === newItem.id;
      });

      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      state.hasChanged = true;
      const id = action.payload;

      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    },
    replaceCart(state, action) {
      const { items, totalQuantity } = action.payload;
      state.items = items;
      state.totalQuantity = totalQuantity;
    },
  },
});

export const { addItemToCart, removeItemFromCart, replaceCart } =
  cartSlice.actions;

export default cartSlice.reducer;
