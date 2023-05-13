import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  surveys: [],
  survey: {},
  questions: [],
  comments: {}
};

export const surveysSlice = createSlice({
  name: 'surveys',
  initialState,
  reducers: {
    setSurveys: (state, { payload }) => ({ ...state, surveys: payload }),
    setSurvey: (state, { payload }) => ({...state, survey: payload}),
    setQuestions: (state, { payload }) => ({...state, questions: payload}),
    setComments: (state, { payload }) => ({...state, comments: payload})
  },
});

export const { setSurveys, setSurvey, setQuestions, setComments } = surveysSlice.actions;
export default surveysSlice.reducer;
