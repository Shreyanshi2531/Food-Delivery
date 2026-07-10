import { createSlice } from "@reduxjs/toolkit";

const ownerSlice = createSlice({
  name: "owner",

  initialState: {
    myShopData: null,
    pendingOrders: 0,
    loading: true,
},

  reducers: {
    setMyShopData: (state, action) => {
      state.myShopData = action.payload;
      state.loading = false;
    },

    setPendingOrders: (state, action) => {
    state.pendingOrders = action.payload;
},

    setShopOrders: (state, action) => {
      state.shopOrders = action.payload;
    },
  },
});

export const {
    setMyShopData,
    setPendingOrders,
    setShopOrders,
} = ownerSlice.actions;

export default ownerSlice.reducer;