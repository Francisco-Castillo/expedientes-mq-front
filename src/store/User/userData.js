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
    setUserData: (state, { payload: user }) => {
      state.user = user;
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
