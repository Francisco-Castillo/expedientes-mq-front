import { createSlice } from "@reduxjs/toolkit";

export const newUserSlice = createSlice({
  name: "newUser",
  initialState: {
    user: {
      nombre: "",
      apellido: "",
      email: "",
      documento: "",
      area: {
        id: null,
      },
      password: "test",
    },
  },
  reducers: {
    setNombre: (state, { payload: nombre }) => {
      state.nombre = nombre;
    },
    setApellido: (state, { payload: apellido }) => {
      state.apellido = apellido;
    },
    setEmail: (state, { payload: email }) => {
      state.email = email;
    },
    setDocumento: (state, { payload: documento }) => {
      state.documento = documento;
    },
    setAreaId: (state, { payload: areaId }) => {
      state.area.id = areaId;
    },
  },
});

export const { setApellido, setAreaId, setDocumento, setEmail, setNombre } =
  newUserSlice.actions;
