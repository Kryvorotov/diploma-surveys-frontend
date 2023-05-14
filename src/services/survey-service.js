import { toast } from 'react-toastify';
import axios from "axios";
import {setComments, setQuestions, setSurvey, setSurveys} from "../redux/slices/surveysSlice";
import {setAlert} from "../redux/slices/alertsSlice";

axios.defaults.baseURL = 'http://localhost:4066'

export const fetchSurveys = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/surveys/')
    dispatch(setSurveys(data));
  } catch (err) {
    dispatch(setAlert({ message: 'Server error! Cannot get list of surveys.', alertType: 'error'}))
  }
};

export const getSurveyById = (payload) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/surveys/${payload}`)
    dispatch(setSurvey(data))
  } catch (err) {
    dispatch(setAlert({ message: 'Server error! Cannot get survey info.', alertType: 'error'}))
  }
}

export const getSurveyQuestions = (payload) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/surveys/${payload}/questions`)
    dispatch(setQuestions(data))
  } catch (err) {
    dispatch(setAlert({ message: 'Server error! Cannot get list of survey questions.', alertType: 'error'}))
  }
}

export const createSurveyComment = (payload) => async (dispatch) =>  {
  try {
    await axios.post('/comments', payload)
    return true;
  } catch (err) {
    alert(err.response?.data.message)
    console.error(err);
  }
};

export const getSurveyComment = (payload) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/comments/survey/${payload}`)
    dispatch(setComments(data))
  } catch (err) {
    dispatch(setAlert({ message: 'Server error! Cannot get survey comments.', alertType: 'error'}))
  }
}

export const createSurveys = (payload) => async (dispatch) => {
  try {
    await axios.post('/surveys/', payload)
    return true;
  } catch (err) {
    alert(err.response?.data.message)
    console.error(err);
  }
};

export const editSurvey = (payload) => async (dispatch) => {
  try {
    await axios.put('/surveys/', payload)
    return true;
  } catch (err) {
    alert(err.response?.data.message)
    console.error(err);
  }
};

export const deleteSurvey = (payload) => async (dispatch) => {
  try {
    await axios.delete(`/surveys/${payload}`)
    return true;
  } catch (err) {
    alert(err.response?.data.message)
    console.error(err);
  }
};

export const createSurveyResponses = (payload) => async (dispatch) =>  {
  try {
    await axios.post('/responses', payload)
    return true;
  } catch (err) {
    alert(err.response?.data.message)
    console.error(err);
  }
};
