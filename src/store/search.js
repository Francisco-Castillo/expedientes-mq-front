import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    search: "",
    userSearchResult: "",
    expedientSearchResult: "",
  },
  reducers: {
    setSearch: (state, { payload }) => {
      state.search = payload;
    },
    setUserSearchResult: (state, { payload }) => {
      state.userSearchResult = payload;
    },
    setExpedientSearchResult: (state, { payload }) => {
      state.expedientSearchResult = payload;
    },
    clearSearch: (state) => {
      state.search = "";
    },
    clearSearchResult: (state) => {
      state.userSearchResult = "";
    },
  },
});

export const {
  setSearch,
  setUserSearchResult,
  setExpedientSearchResult,
  clearSearch,
  clearSearchResult,
} = searchSlice.actions;
