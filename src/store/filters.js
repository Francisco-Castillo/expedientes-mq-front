import { createSlice } from "@reduxjs/toolkit";

export const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    filter: {
      expedientStatus: null,
      expedientType: null,
      startDate: null,
      endDate: null,
    },
  },
  reducers: {
    filterStatus: (state, { payload }) => {
      state.filter.expedientStatus = payload;
    },
    filterExpedientType: (state, { payload }) => {
      state.filter.expedientType = payload;
    },
    filterStartDate: (state, { payload }) => {
      state.filter.startDate = payload;
    },
    filterEndDate: (state, { payload }) => {
      state.filter.endDate = payload;
    },
    clearFilters: (state) => {
      state.filter.startDate = null;
      state.filter.endDate = null;
      state.filter.expedientType = null;
      state.filter.expedientStatus = null;
    },
    clearFilters: (state) => {
      state.startDate = "";
      state.endDate = "";
      state.expedientType = "";
      state.expedientStatus = "";
    },
  },
});

export const {
  filterStatus,
  filterEndDate,
  filterExpedientType,
  filterStartDate,
  clearFilters,
} = filtersSlice.actions;
