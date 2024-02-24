import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    search: "",
    resultSearch: "",
  },
  reducers: {
    setSearch: (state, { payload }) => {
      state.search = payload;
    },
    setResultSearch: (state, { payload }) => {
      state.resultSearch = payload;
    },
  },
});

export const { setSearch, setResultSearch } = searchSlice.actions;
