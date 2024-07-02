import { createSlice } from "@reduxjs/toolkit";

export const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    expedientStatus: null,
    expedientType: null,
    startDate: null,
    endDate: null,
    filterActive: false,
  },
  reducers: {
    filterStatus: (state, { payload }) => {
      state.expedientStatus = payload;
      {
        !payload ? (state.filterActive = false) : (state.filterActive = true);
      }
    },
    filterExpedientType: (state, { payload }) => {
      state.expedientType = payload;
      {
        !payload ? (state.filterActive = false) : (state.filterActive = true);
      }
    },
    filterStartDate: (state, { payload }) => {
      state.startDate = payload;
      {
        !payload ? (state.filterActive = false) : (state.filterActive = true);
      }
    },
    filterEndDate: (state, { payload }) => {
      state.endDate = payload;
      {
        !payload ? (state.filterActive = false) : (state.filterActive = true);
      }
    },
    filterActive: (state, { payload }) => {
      state.endDate = payload;
    },
    clearFilters: (state) => {
      state.startDate = null;
      state.endDate = null;
      state.expedientType = null;
      state.expedientStatus = null;
    },
  },
});

export const {
  filterStatus,
  filterEndDate,
  filterExpedientType,
  filterStartDate,
  filterActive,
  clearFilters,
} = filtersSlice.actions;
