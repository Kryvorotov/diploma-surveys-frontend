import React, {useEffect} from 'react';
import styles from './styles.module.sass';
import {useDispatch, useSelector} from "react-redux";
import {fetchSurveys} from "../../services/survey-service";
import {isPast} from "../../utils/date";
import {Link} from "react-router-dom";

function SurveysList() {
  const dispatch = useDispatch();
  const { surveys } = useSelector((state) => state.surveysReducer);

  const finished = surveys.filter(survey => isPast(survey.endAt))
  const planned = surveys.filter(survey => !isPast(survey.startAt) && !isPast(survey.endAt))
  const current = surveys.filter(survey => !isPast(survey.endAt) && isPast(survey.startAt))

  useEffect(() => {
    dispatch(fetchSurveys());
  }, [])

  return (
    <div className={styles.container}>
      <h1>Опитування</h1>
      <br/>
      <Link to="/create-survey">Створити нове</Link>
      <h1>Заплановані</h1>
      <ul>
        {planned.map(survey => <li key={survey.id}><Link to={`/edit/${survey.id}`}>{survey.title}</Link></li>)}
      </ul>
      <h1>В процессі</h1>
      <ul>
        {current.map(survey => <li key={survey.id}><Link to={`/survey/${survey.id}`}>{survey.title}</Link></li>)}
      </ul>
      <h1>Завершені</h1>
      <ul>
        {finished.map(survey => <li key={survey.id}><Link to={`/survey/${survey.id}`}>{survey.title}</Link></li>)}
      </ul>
    </div>
  );
}

export default SurveysList;
