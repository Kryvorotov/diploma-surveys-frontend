import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  surveys: [],
  survey: {}
};

export const surveysSlice = createSlice({
  name: 'surveys',
  initialState,
  reducers: {
    setSurveys: (state, { payload }) => ({ ...state, surveys: payload }),
    setSurvey: (state, { payload }) => ({...state, survey: payload})
  },
});

export const { setSurveys, setSurvey } = surveysSlice.actions;
export default surveysSlice.reducer;
