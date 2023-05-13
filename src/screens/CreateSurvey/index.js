import React, {useState} from 'react';
import styles from './styles.module.sass';
import {useDispatch, useSelector} from "react-redux";
import {createSurveys, deleteSurvey, editSurvey} from "../../services/survey-service";
import {useNavigate, useParams} from "react-router-dom";
import {convertToInput} from "../../utils/date";
import {TextField, Button} from "@mui/material";

function CreateSurvey() {
  const dispatch = useDispatch();
  const {surveyId} = useParams();
  const { surveys } = useSelector((state) => state.surveysReducer);
  const survey = surveys.find(s => s.id === surveyId);
  const [questions, setQuestions]=useState(survey ? survey.questions : [])
  const [startAt, setStartAt] = useState(survey ? convertToInput(survey.startAt) : new Date);
  const [endAt, setEndAt] = useState(survey ? convertToInput(survey.endAt) : new Date);
  const [title, setTitle] = useState(survey ? survey.title : '');
  const navigate = useNavigate();

  const handleSave =  async () => {
    if (!questions.length) {
      alert(`Створіть хоча б одне питання`)
      return;
    }

    const emptyIndex = questions.indexOf('')
    if (emptyIndex !== -1) {
      alert(`Питання ${emptyIndex + 1} порожнє`)
      return;
    }

    if (survey) {
      const questionsToEdit = questions.map(q => ({text: q.text, surveyId}))
      const ok = await dispatch(editSurvey({survey: {title, startAt, endAt, id: survey.id}, questions: questionsToEdit}));
      if (ok) {
        navigate('/')
      }
    } else {
      const ok = await dispatch(createSurveys({survey: {title, startAt, endAt}, questions}));
      if (ok) {
        navigate('/')
      }
    }

  }

  const handleAddQuestion = () => {
    setQuestions([...questions, ''])
  };

  const deleteQuestion = (index) => {
    const copy = [...questions];
    copy.splice(index, 1)
    setQuestions(copy)
  }

  const onChange = (value, index) => {
    setQuestions(questions.map((q, i) => index === i ? {text: value.currentTarget.value} : q))
  };

  const handleDelete = async () => {
    const ok = await dispatch(deleteSurvey(surveyId));
    if (ok) {
      navigate('/')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <TextField label={'Назва'} onChange={(value) => setTitle(value.currentTarget.value)} value={title} required type="text" />
      </div>
      <div className={styles.dateWrapper}>
        <div className={styles.input} >
          <label htmlFor="">Початок опитування</label>
          <TextField min={convertToInput()} required type="date" value={startAt} onChange={(value) => setStartAt(value.currentTarget.value)} />
        </div>
        <div className={styles.input} >
          <label htmlFor="">Кінець опитування</label>
          <TextField min={convertToInput(startAt)} required type="date" value={endAt} onChange={(value) => setEndAt(value.currentTarget.value)} />
        </div>
      </div>
      <div>
        {questions.map((question, index) => (
          <div key={index}>
            <div className={styles.input} >
              <TextField label={`Питання ${index+1}`} required type="text" value={question.text} onChange={(value) => onChange(value, index)} />
               <Button variant="contained" onClick={() => deleteQuestion(index)}>Видалити</Button>
            </div>

          </div>
        ))}
      </div>

      <Button variant="contained" onClick={handleAddQuestion}>Додати питання</Button>

      <Button variant="contained" disabled={!questions.length || !title} onClick={handleSave}>Зберігти</Button>

      {survey && <Button color="error" variant="contained" className={styles.deleteBtn} onClick={handleDelete}>Видалити</Button>}
    </div>
  );
}

export default CreateSurvey;
