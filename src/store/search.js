import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    search: "",
  },
  reducers: {
    setSearch: (state, { payload }) => {
      state.search = payload;
    },
  },
});

export const { setSearch } = searchSlice.actions;
