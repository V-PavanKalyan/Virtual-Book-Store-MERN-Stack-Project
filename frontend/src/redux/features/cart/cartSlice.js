import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (!existingItem) {
        state.cartItems.push({ ...action.payload, quantity: 1 });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added to cart",
          showConfirmButton: false,
          timer: 1500,
          toast: true,
          background: '#6366f1',
          color: '#fff'
        });
      } else {
        existingItem.quantity += 1;
        Swal.fire({
          position: "top-end",
          icon: "info",
          title: "Updated quantity",
          showConfirmButton: false,
          timer: 1000,
          toast: true
        });
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find(item => item._id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
    }
  }
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;