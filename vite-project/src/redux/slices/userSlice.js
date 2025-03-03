import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    email: null,
    name: null,
    role: null, // Добавляем роль в состояние
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.role = action.payload.role; // Добавляем роль в состояние
    },
    logout: (state) => {
      state.token = null;
      state.email = null;
      state.name = null;
      state.role = null; // Удаляем роль из состояния
    },
    userData: (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.role = action.payload.role; // Добавляем роль в состояние
    },
  },
});

export const { login, logout, userData } = userSlice.actions;
export default userSlice.reducer;
