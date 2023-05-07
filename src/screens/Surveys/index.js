import React, {useEffect} from 'react';
import styles from './styles.module.sass';
import {useDispatch, useSelector} from "react-redux";
import {fetchSurveys} from "../../services/survey-service";

function Surveys() {
  const dispatch = useDispatch();
  const { surveys } = useSelector((state) => state.surveysReducer);

  useEffect(() => {
    dispatch(fetchSurveys());
  }, [dispatch])

  return (
    <div className={styles.container}>
      <h1>SURVEYS</h1>
      <ul>
        {surveys.map(survey => <li>{survey.title}</li>)}
      </ul>
    </div>
  );
}

export default Surveys;
