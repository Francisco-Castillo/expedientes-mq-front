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
    setNombre: (state, action) => {
      state.user.nombre = action.payload;
    },
    setApellido: (state, action) => {
      state.user.apellido = action.payload;
    },
    setEmail: (state, action) => {
      state.user.email = action.payload;
    },
    setDocumento: (state, action) => {
      state.user.documento = action.payload;
    },
    setAreaId: (state, action) => {
      state.user.area.id = action.payload;
    },
  },
});

export const { setApellido, setAreaId, setDocumento, setEmail, setNombre } =
  newUserSlice.actions;
