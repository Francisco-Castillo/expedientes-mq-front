import { createSlice } from "@reduxjs/toolkit";

export const areasSlice = createSlice({
  name: "areas",
  initialState: {
    areas: [],
    area: {
      codigoPresupuestario: "",
      descripcion: "",
      id: null,
      nivel: null,
      referenciaId: null,
    },
  },
  reducers: {
    setAreas: (state, { payload: areas }) => {
      state.areas = areas;
    },
    setArea: (state, { payload: area }) => {
      state.area = area;
    },
  },
});

export const { setAreas, setArea } = areasSlice.actions;
