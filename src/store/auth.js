import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "not-authenticated",
    token: "",
  },
  reducers: {
    onLogin: (state, { payload }) => {
      (state.status = "authenticated"), (state.token = payload.token);
    },
    onLogout: (state) => {
      (state.status = "not-authenticated"), (state.token = {});
    },
  },
});

export const { onLogin, onLogout, onChecking } = authSlice.actions;
