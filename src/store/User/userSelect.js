import { createSlice } from "@reduxjs/toolkit";

export const userSelectSlice = createSlice({
  name: "userSelect",
  initialState: {
    user: {
      apellido: "",
      area: {
        id: null,
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
      state.area = action.payload.area;
    },
    updateLastName: (state, { payload: lastName }) => {
      state.apellido = lastName;
    },
    updateName: (state, { payload: name }) => {
      state.nombre = name;
    },
    updateDni: (state, { payload: codumento }) => {
      state.documento = codumento;
    },
    updateAreaId: (state, { payload: areaId }) => {
      state.area.id = areaId;
    },
    clearUserData: (state) => {
      state.user = {
        apellido: "",
        area: {
          id: null,
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
