import { createSlice } from "@reduxjs/toolkit";

export const pagesSlice = createSlice({
  name: "pages",
  initialState: {
    totalPages: 0,
    page: 0,
  },
  reducers: {
    setTotalPages: (state, { payload }) => {
      state.totalPages = payload;
    },
    setPage: (state, { payload }) => {
      state.page = payload;
    },
    clearPages: (state) => {
      (state.totalPages = 0), (state.page = 0);
    },
  },
});

export const { setTotalPages, setPage, clearPages } = pagesSlice.actions;
