import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./user.slice.js";
import ownerSlice from "./owner.slice.js";
import shopSlice from "./shop.slice.js";
import cartSlice from "./cart.slice.js";

export const store = configureStore({
  reducer: {
    user: userSlice,
    owner: ownerSlice,
    shop: shopSlice,
    cart: cartSlice,
  },
});