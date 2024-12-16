import { createSlice } from "@reduxjs/toolkit";

export const expedientsSlice = createSlice({
  name: "expedients",
  initialState: {
    myExpedients: [],
    InboxExpedients: [],
    refreshMyExpedientsList: false,
    refreshExpedientsInbox: false,
  },
  reducers: {
    setMyExpedients: (state, { payload }) => {
      state.myExpedients = payload;
    },
    setInboxExpedients: (state, { payload }) => {
      state.InboxExpedients = payload;
    },
    SetRefreshMyExpedientsList: (state, { payload }) => {
      state.refreshMyExpedientsList = payload;
    },
    SetRefreshExpedientsInbox: (state, { payload }) => {
      state.refreshExpedientsInbox = payload;
    },
  },
});

export const {
  setMyExpedients,
  SetRefreshMyExpedientsList,
  setInboxExpedients,
  SetRefreshExpedientsInbox,
} = expedientsSlice.actions;
