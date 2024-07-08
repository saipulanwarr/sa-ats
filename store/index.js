import { configureStore } from "@reduxjs/toolkit";
import atsReducer from "./atsSlice";

export const store = configureStore({
  reducer: {
    ats: atsReducer,
  },
});
