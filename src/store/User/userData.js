import { createSlice } from "@reduxjs/toolkit";

export const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    user: {
      areaId: null,
      areaName: "",
      email: "",
      lastName: "",
      name: "",
      userId: null,
    },
  },
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
    },
    clearUserData: (state) => {
      state.user = {
        areaId: null,
        areaName: "",
        email: "",
        lastName: "",
        name: "",
        userId: null,
      };
    },
  },
});

export const { setUserData, clearUserData } = userDataSlice.actions;
