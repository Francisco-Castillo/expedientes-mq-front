import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "./auth";
import { tabSlice } from "./tab";
import { pagesSlice } from "./pages";
import { loadSlice } from "./load";

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
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
