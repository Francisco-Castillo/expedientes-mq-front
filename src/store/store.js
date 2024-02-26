import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "./auth";
import { tabSlice } from "./tab";
import { pagesSlice } from "./pages";
import { loadSlice } from "./load";
import { filtersSlice } from "./filters";
import { expedientSlice } from "./expedient";
import { expedientsSlice } from "./expedients";
import { searchSlice } from "./search";
import { filesSlice } from "./files";
import { userSelectSlice } from "./User/userSelect";
import { userDataSlice } from "./User/userData";
import { newUserSlice } from "./User/newUser";
import { areasSlice } from "./areas";

import storage from "redux-persist/lib/storage";

import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

const persistConfig = {
  key: root,
  storage,
  whitelist: ["auth", "tab", "pages"],
};

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  tab: tabSlice.reducer,
  pages: pagesSlice.reducer,
  load: loadSlice.reducer,
  filters: filtersSlice.reducer,
  expedient: expedientSlice.reducer,
  expedients: expedientsSlice.reducer,
  search: searchSlice.reducer,
  files: filesSlice.reducer,
  userSelect: userSelectSlice.reducer,
  userData: userDataSlice.reducer,
  newUser: newUserSlice.reducer,
  areas: areasSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
