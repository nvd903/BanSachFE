import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCartRedux: (state, action) => {
      const itemInCart = state.items.find(
        (item) => item.itemId === action.payload.itemId
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantityRedux: (state, action) => {
      //payload : {itemId: }
      const item = state.items.find(
        (item) => item.itemId === action.payload.itemId
      );
      item.quantity++;
    },
    decrementQuantityRedux: (state, action) => {
      const item = state.items.find(
        (item) => item.itemId === action.payload.itemId
      );
      if (item.quantity === 1) {
        const removeItem = state.items.filter(
          (item) => item.itemId !== action.payload.itemId
        );
        state.items = removeItem;
      } else {
        item.quantity--;
      }
    },

    removeItemRedux: (state, action) => {
      console.log("action.payload.itemId", action.payload.itemId);
      const removeItem = state.items.filter(
        (item) => item.itemId !== action.payload.itemId
      );
      state.items = removeItem;
    },
  },
});

export const {
  addToCartRedux,
  incrementQuantityRedux,
  decrementQuantityRedux,
  removeItemRedux,
} = cartSlice.actions;

export default cartSlice.reducer;
