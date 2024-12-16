import { createSlice } from "@reduxjs/toolkit";

export const expedientSlice = createSlice({
  name: "expedient",
  initialState: {
    type: "",
    state: "INICIADO",
    number: null,
    reference: "",
    description: "",
    budgetCode: null,
    monto: null,
    responsable: "",
    date: null,
  },
  reducers: {
    setType: (state, { payload }) => {
      state.type = payload;
    },
    setState: (state, { payload }) => {
      state.state = payload;
    },
    setDate: (state, { payload }) => {
      state.date = payload;
    },
    setMonto: (state, { payload }) => {
      state.monto = payload;
    },
    setResponsable: (state, { payload }) => {
      state.responsable = payload;
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
  setDate,
  setMonto,
  setResponsable,
  setType,
  setBudgetCode,
  setDescription,
  setNumber,
  setReference,
  setLastNumber,
  setClearAttributes,
  updateState,
} = expedientSlice.actions;
