import { toast } from 'react-toastify';
import axios from "axios";
import {setComments, setQuestions, setSurvey, setSurveys} from "../redux/slices/surveysSlice";

axios.defaults.baseURL = 'http://localhost:4066'

export const fetchSurveys = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/surveys/')
    dispatch(setSurveys(data));
  } catch (err) {
    console.error(err);
  }
};

export const getSurveyById = (payload) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/surveys/${payload}`)
    dispatch(setSurvey(data))
  } catch (err) {
    console.error(err);
  }
}

export const getSurveyQuestions = (payload) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/surveys/${payload}/questions`)
    dispatch(setQuestions(data))
  } catch (err) {
    console.log(err)
  }
}

export const getSurveyComment = (payload) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/comments/survey/${payload}`)
    dispatch(setComments(data))
  } catch (err) {
    console.log(err)
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

