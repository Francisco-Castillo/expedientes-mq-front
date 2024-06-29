import { createSlice } from "@reduxjs/toolkit";

export const userSelectSlice = createSlice({
  name: "userSelect",
  initialState: {
    user: {
      apellido: "",
      area: {
        areaId: null,
        descripcion: "",
        referenciaId: null,
        nivel: null,
        codigoPresupuestario: "",
      },
      documento: "",
      email: "",
      estado: null,
      id: null,
      nombre: "",
      primerLogin: null,
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updateLastName: (state, { payload: apellido }) => {
      state.user.apellido = apellido;
    },
    updateName: (state, { payload: nombre }) => {
      state.user.nombre = nombre;
    },
    updateDni: (state, { payload: documento }) => {
      state.user.documento = documento;
    },
    updateAreaId: (state, { payload }) => {
      state.user.area.areaId = payload;
    },
    clearUserData: (state) => {
      state.user = {
        apellido: "",
        area: {
          areaId: null,
          descripcion: "",
          referenciaId: null,
          nivel: null,
          codigoPresupuestario: "",
        },
        documento: "",
        email: "",
        estado: null,
        id: null,
        nombre: "",
        primerLogin: null,
      };
    },
  },
});

export const {
  setUser,
  clearUserData,
  updateAreaId,
  updateLastName,
  updateName,
  updateDni,
} = userSelectSlice.actions;
