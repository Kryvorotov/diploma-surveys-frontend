import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const alertSlice = createSlice({
  name: "alerts",
  initialState: [],
  reducers: {
    setAlert: (state, action) => {
      const { message, alertType } = action.payload;
      const id = uuid();
      state.push({ message, alertType, id });
    },
    removeAlert: (state, action) => {
      const id = action.payload;
      return state.filter((alert) => alert.id !== id);
    },
  },
});

export const { setAlert, removeAlert } = alertSlice.actions;
export default alertSlice.reducer;
