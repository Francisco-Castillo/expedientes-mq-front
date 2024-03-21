import { createSlice } from "@reduxjs/toolkit";

export const expedientSlice = createSlice({
  name: "expedient",
  initialState: {
    type: "",
    state: "INICIADO",
    number: null,
    reference: "",
    description: "",
    budgetCode: 0,
  },
  reducers: {
    setType: (state, { payload }) => {
      state.type = payload;
    },
    setState: (state, { payload }) => {
      state.state = payload;
    },
    updateState: (state, { payload: newState }) => {
      state.state = newState;
    },
    setNumber: (state, { payload }) => {
      state.number = payload;
    },
    setReference: (state, { payload }) => {
      state.reference = payload;
    },
    setDescription: (state, { payload }) => {
      state.description = payload;
    },
    setBudgetCode: (state, { payload }) => {
      state.budgetCode = payload;
    },
    setClearAttributes: (state) => {
      state.type = "";
      state.number = null;
      state.reference = "";
      state.description = "";
      state.budgetCode = 0;
    },
  },
});

export const {
  setState,
  setType,
  setBudgetCode,
  setDescription,
  setNumber,
  setReference,
  setLastNumber,
  setClearAttributes,
  updateState,
} = expedientSlice.actions;
