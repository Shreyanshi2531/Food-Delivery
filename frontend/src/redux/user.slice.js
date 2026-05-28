import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    current_city: null,
    current_state: null,
    current_address: null,
    loading: true,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.loading = false;
    },
    setCurrentCity: (state, action) => {
      state.current_city = action.payload;
      state.loading = false;
    },
    setCurrentState: (state, action) => {
      state.current_state = action.payload;
      state.loading = false;
    },
    setCurrentAddress: (state, action) => {
      state.current_address = action.payload;
      state.loading = false;
    },
  },
});

export const { setUserData, setCurrentCity, setCurrentState, setCurrentAddress } = userSlice.actions;
export default userSlice.reducer;
