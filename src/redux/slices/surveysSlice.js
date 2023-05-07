import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  surveys: [],
};

export const surveysSlice = createSlice({
  name: 'surveys',
  initialState,
  reducers: {
    setSurveys: (state, { payload }) => ({ ...state, surveys: payload }),
  },
});

export const { setSurveys } = surveysSlice.actions;
export default surveysSlice.reducer;
