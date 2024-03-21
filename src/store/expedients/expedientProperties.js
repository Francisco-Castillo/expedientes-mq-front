import { createSlice } from "@reduxjs/toolkit";

export const expedientPropertiesSlice = createSlice({
  name: "expedientProperties",
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

export const { setStatus, setTypes } = expedientPropertiesSlice.actions;
