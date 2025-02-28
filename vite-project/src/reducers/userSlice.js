import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  email: null,
  name: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.email = null;
      state.name = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
