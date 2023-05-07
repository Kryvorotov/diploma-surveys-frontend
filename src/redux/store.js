import { configureStore } from '@reduxjs/toolkit';
import surveysReducer from './slices/surveysSlice'

export const store = configureStore({
  reducer: {
    surveysReducer,
  },
});
