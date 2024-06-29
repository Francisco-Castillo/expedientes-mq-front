import { createSlice } from "@reduxjs/toolkit";

export const filesSlice = createSlice({
  name: "files",
  initialState: {
    files: [],
  },
  reducers: {
    setFiles: (state, { payload }) => {
      state.files = payload;
    },
  },
});

export const { setFiles } = filesSlice.actions;
