import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "not-authenticated",
    token: "",
    errorMessage: undefined,
  },
  reducers: {
    onLogin: (state, { payload }) => {
      (state.status = "authenticated"),
        (state.token = payload),
        (state.errorMessage = undefined),
        (state.errorMessage = undefined);
    },
    onLogout: (state, { payload }) => {
      (state.status = "not-authenticated"),
        (state.token = {}),
        (state.errorMessage = payload),
        (state.errorMessage = undefined);
    },
    clearErrorMessage: (state, { payload }) => {
      state.errorMessage = payload;
    },
  },
});

export const { onLogin, onLogout, onChecking, clearErrorMessage } =
  authSlice.actions;
