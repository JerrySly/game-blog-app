import { configureStore } from "@reduxjs/toolkit";
import authSlice  from "./auth";
import article from "./articles";

const store =  configureStore({
  reducer: {
    auth: authSlice,
    article,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
export default store;