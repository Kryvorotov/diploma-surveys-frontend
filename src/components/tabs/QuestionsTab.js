import React from 'react';
import Question from "../Question";
import {Card, CardContent, Divider, Typography} from "@mui/material";

const QuestionsTab = ({questions, comments}) => {

    console.log(comments)
    return (
        <div>
            {questions.map(question => (
                <Question question={question} />
            ))}
            {comments.map(comment => (
                <Card style={{marginTop: 24,marginBottom: 50}}>
                    <CardContent>
                        <Typography variant="h5" component="div" style={{marginBottom: 10}}>
                            Коментар
                        </Typography>
                        <Divider />
                        <Typography variant="p" component="p" style={{padding: 10}}>
                            {comment.text}
                        </Typography>
                    </CardContent>
                </Card>
            ))}

        </div>
    );
};

export default QuestionsTab;