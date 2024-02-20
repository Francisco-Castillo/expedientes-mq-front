import { createSlice } from "@reduxjs/toolkit";

export const expedientSlice = createSlice({
  name: "expedient",
  initialState: {
    type: [],
    status: [],
  },
  reducers: {
    setType: (state, { payload }) => {
      state.type = payload;
    },
    setStatus: (state, { payload }) => {
      state.status = payload;
    },
  },
});

export const { setStatus, setType } = expedientSlice.actions;
