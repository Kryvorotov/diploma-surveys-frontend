import { toast } from 'react-toastify';
import axios from "axios";
import {setSurveys} from "../redux/slices/surveysSlice";

axios.defaults.baseURL = 'http://localhost:4066'

export const fetchSurveys = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/surveys/')
    console.log('data');
    console.log(data);
    dispatch(setSurveys(data));
  } catch (err) {
    toast.error(err.response?.data.message);
    console.error(err);
  }
};

