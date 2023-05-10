import React, {useState} from 'react';
import styles from './styles.module.sass';
import {useDispatch, useSelector} from "react-redux";
import {createSurveys} from "../../services/survey-service";
import {useNavigate} from "react-router-dom";

function CreateSurvey() {
  const dispatch = useDispatch();
  const [questions, setQuestions]=useState([''])
  const [startAt, setStartAt] = useState(new Date);
  const [endAt, setEndAt] = useState(new Date);
  const [title, setTitle] = useState('');
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
    const ok = await dispatch(createSurveys({survey: {title, startAt, endAt}, questions: questions.map(question => ({text: question}))}));
    if (ok) {
      navigate('/')
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
    setQuestions(questions.map((q, i) => index === i ? value.currentTarget.value : q))
  };

  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <label htmlFor="">Заголовок</label>
        <input onChange={(value) => setTitle(value.currentTarget.value)} value={title} required type="text" />
      </div>
      <div>
        <div className={styles.input} >
          <label htmlFor="">Початок опитування</label>
          <input min={new Date().toISOString().split("T")[0]} required type="date" value={startAt} onChange={(value) => setStartAt(value.currentTarget.value)} />
        </div>
        <div className={styles.input} >
          <label htmlFor="">Кінець опитування</label>
          <input min={new Date(startAt).toISOString().split("T")[0]} required type="date" value={endAt} onChange={(value) => setEndAt(value.currentTarget.value)} />
        </div>
      </div>
      <div>
        {questions.map((question, index) => (
          <div key={index}>
            <div className={styles.input} >
              <label htmlFor="">Питання {index+1}</label>
              <input required type="text" value={question} onChange={(value) => onChange(value, index)} />
               <button onClick={() => deleteQuestion(index)}>Видалити</button>
            </div>

          </div>
        ))}
      </div>

      <button onClick={handleAddQuestion}>Додати питання</button>

      <button onClick={handleSave}>Створити</button>
    </div>
  );
}

export default CreateSurvey;
