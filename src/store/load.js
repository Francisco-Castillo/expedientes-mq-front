import { createSlice } from "@reduxjs/toolkit";

export const loadSlice = createSlice({
  name: "load",
  initialState: {
    status: false,
  },
  reducers: {
    onLoad: (state, { payload }) => {
      state.status = payload;
    },
  },
});

export const { onLoad } = loadSlice.actions;
