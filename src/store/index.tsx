import { configureStore } from "@reduxjs/toolkit";
import authSlice  from "./auth";
import article from "./articles";
import appSlice from "./app";

const store =  configureStore({
  reducer: {
    auth: authSlice,
    article,
    app: appSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
export default store;