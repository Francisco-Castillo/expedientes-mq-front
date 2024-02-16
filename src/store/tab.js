import { createSlice } from "@reduxjs/toolkit";

export const tabSlice = createSlice({
  name: "tab",
  initialState: {
    tab: "",
    subTab: "",
  },
  reducers: {
    setTab: (state, { payload }) => {
      state.tab = payload;
    },
    setSubTab: (state, { payload }) => {
      state.subTab = payload;
    },

    clearTabs: (state) => {
      (state.tab = ""), (state.subTab = "");
    },
  },
});

export const { setTab, setSubTab, clearTabs } = tabSlice.actions;
