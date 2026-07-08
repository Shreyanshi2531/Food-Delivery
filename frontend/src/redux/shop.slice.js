import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({
  name: "shop",

  initialState: {
    shops: [],
    selectedShop: null,
    loading: false,
  },

  reducers: {
    setShops: (state, action) => {
      state.shops = action.payload;
    },

    setSelectedShop: (state, action) => {
      state.selectedShop = action.payload;
    },

    setShopLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setShops,
  setSelectedShop,
  setShopLoading,
} = shopSlice.actions;

export default shopSlice.reducer;