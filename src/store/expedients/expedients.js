import { createSlice } from "@reduxjs/toolkit";

export const expedientsSlice = createSlice({
  name: "expedients",
  initialState: {
    myExpedients: [],
    InboxExpedients: [],
    refresh: false,
  },
  reducers: {
    setMyExpedients: (state, { payload }) => {
      state.myExpedients = payload;
    },
    setInboxExpedients: (state, { payload }) => {
      state.InboxExpedients = payload;
    },
    refreshExpedientsList: (state, { payload }) => {
      state.refresh = payload;
    },
  },
});

export const { setMyExpedients, refreshExpedientsList, setInboxExpedients } =
  expedientsSlice.actions;
