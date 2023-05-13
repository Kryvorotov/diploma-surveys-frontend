import React, {useEffect, useState} from 'react';
import { Box, Button, Card, CardContent, Container, Divider, Paper, TextField, Typography } from '@mui/material';
import {createSurveyComment, createSurveyResponses, getSurveyById, getSurveyQuestions} from "../../services/survey-service";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import FormQuestion from '../../components/FormQuestion'; 
import { getDateInDigits } from '../../utils/date';

function SurveyFormPage() {
    const navigate = useNavigate()
    const {surveyId} = useParams()
    const dispatch = useDispatch();
    const { survey, questions } = useSelector((state) => state.surveysReducer);
    const [responses, setResponses] = useState([])
    const [comment, setComment] = useState('')

    const [isDisabled, setIsdisabled] = useState(false)
    const [isDone, setIsDone] = useState(false)

    useEffect(() => {
        dispatch(getSurveyById(surveyId));
        dispatch(getSurveyQuestions(surveyId))
    }, [])

    const addResponse = (questionId, score) => {
        let newResponses = responses.filter((response) => response.questionId !== questionId)
        newResponses = [...newResponses, {questionId, score}]
        setResponses(newResponses)
    }

    const handleSave = async () => {
        if (questions.length !== responses.length) {
            alert(`Заповніть пусті поля`)
            return;
        }

        setIsdisabled(true)
        await dispatch(createSurveyResponses(responses));
        if (comment.length > 0) {
            await dispatch(createSurveyComment({text: comment, surveyId}));
        }
        setIsDone(true)
    }

    if (isDone) {
        return (
            <Container>
                <Box sx={{ border: '1px solid #ddd', p: 2, maxWidth: 400, mx: 'auto', mt: 4, }} >
                    <Typography variant="p">Вашу відповідь записано</Typography>
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button onClick={() => navigate('/')} variant="outline">Назад</Button>
                    </div>
                </Box>
            </Container>
        )
    }

    return (
        <Paper style={{padding: '20px 0'}}>
            <Container>
                <Box>
                    <div style={{marginBottom: 10}}>
                        <Typography variant="h4" style={{textTransform: 'uppercase', marginBottom: 10}}>
                            {survey.title}
                        </Typography>
                        <Typography variant="p" color="gray">
                            {getDateInDigits(survey.startAt)} - {getDateInDigits(survey.endAt)}
                        </Typography>
                    </div>
                </Box>
                <Divider style={{margin: '20px 0 50px'}} />
        
                <Box>
                    {questions.map((question, index) => (
                    <FormQuestion key={question.id} number={index + 1} data={question} addResponse={addResponse} />
                    ))}
                </Box>
        
                <Box>
                    <TextField
                        id="comment"
                        label="Залиште коментар (необов'язково)"
                        multiline
                        rows={2}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        color="primary"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
            
                <Box style={{display: 'flex', justifyContent: 'flex-end', marginTop: 30}}>
                    <Button variant="contained" onClick={handleSave} disabled={isDisabled}>
                        Надіслати
                    </Button>
                </Box>

            </Container>
        </Paper>
        
    );

}

export default SurveyFormPage;
