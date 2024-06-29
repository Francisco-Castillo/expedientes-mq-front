import { createSlice } from "@reduxjs/toolkit";

export const loadSlice = createSlice({
  name: "load",
  initialState: {
    loadStatus: false,
  },
  reducers: {
    onLoad: (state, { payload }) => {
      state.loadStatus = payload;
    },
  },
});

export const { onLoad } = loadSlice.actions;
