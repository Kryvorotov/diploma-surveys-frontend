import { configureStore } from "@reduxjs/toolkit";
import surveysReducer from "./slices/surveysSlice";
import alertsReducer from "./slices/alertsSlice";

export const store = configureStore({
  reducer: {
    surveysReducer,
    alertsReducer,
  },
});
