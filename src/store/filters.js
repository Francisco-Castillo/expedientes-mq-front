import { createSlice } from "@reduxjs/toolkit";

export const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    expedientStatus: "",
    expedientType: "",
    startDate: "",
    endDate: "",
  },
  reducers: {
    filterStatus: (state, { payload }) => {
      state.expedientStatus = payload;
    },
    filterExpedientType: (state, { payload }) => {
      state.expedientType = payload;
    },
    filterStartDate: (state, { payload }) => {
      state.startDate = payload;
    },
    filterEndDate: (state, { payload }) => {
      state.endDate = payload;
    },
  },
});

export const {
  filterStatus,
  filterEndDate,
  filterExpedientType,
  filterStartDate,
} = filtersSlice.actions;
