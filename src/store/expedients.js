import { createSlice } from "@reduxjs/toolkit";

export const expedientsSlice = createSlice({
  name: "expedients",
  initialState: {
    types: [],
    status: [],
  },
  reducers: {
    setTypes: (state, { payload }) => {
      state.types = payload;
    },
    setStatus: (state, { payload }) => {
      state.status = payload;
    },
  },
});

export const { setStatus, setTypes } = expedientsSlice.actions;
