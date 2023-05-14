import React from 'react';
import {Card, CardContent, Divider, Grid, Typography} from "@mui/material";
import {getAverage, getMostPopular} from "../../utils/math";
import RadarChart from "../charts/RadarChart";
import {getScores, getTextResponse} from "../../utils/responses";
import { getDate } from "../../utils/date";


const OverviewTab = ({questions, survey}) => {

    const responses = questions.map(question => question.responses).flat();
    const scores = getScores(responses)

    return (
        <div>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div" style={{marginBottom: 5}}>
                        Кількість відповідей
                    </Typography>
                    <Divider />
                    <Typography variant="h4" component="div" style={{marginTop: 10}}>
                        {responses.length} Відовідей
                    </Typography>
                </CardContent>
            </Card>
            <Card style={{marginTop: 24}}>
                <CardContent>
                    <Typography variant="h5" component="div" style={{marginBottom: 5}}>
                      Про опитування
                    </Typography>
                    <Divider />
                    <Typography variant="h6" color="grey" component="div" style={{marginBottom: 5, marginTop: 10}}>
                        Створено: {getDate(survey.createdAt)}
                    </Typography>
                    <Typography variant="h6" color="grey" component="div" style={{marginBottom: 5}}>
                        Починається: {getDate(survey.startAt)}
                    </Typography>
                    <Typography variant="h6" color="grey" component="div" style={{marginBottom: 5}}>
                        Закінчується: {getDate(survey.endAt)}
                    </Typography>
                    {survey.updatedAt && (
                        <Typography variant="h6" color="grey" component="div" style={{marginBottom: 5}}>
                            Редаговано: {getDate(survey.updatedAt)}
                        </Typography>
                    )}
                </CardContent>
            </Card>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Card style={{marginTop: 24}}>
                        <CardContent>
                            <Typography variant="h5" component="div" style={{marginBottom: 5}}>
                                Найпопулярніша відповідь
                            </Typography>
                            <Divider />
                            <Typography variant="h4" component="div" style={{marginTop: 10}}>
                                {responses.length > 0 ? getTextResponse(getMostPopular(scores)) : 'Нема відповідей'}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card style={{marginTop: 24}}>
                        <CardContent>
                            <Typography variant="h5" component="div" style={{marginBottom: 5}}>
                                Середня відповідь
                            </Typography>
                            <Divider />
                            <Typography variant="h4" component="div" style={{marginTop: 10}}>
                                {responses.length > 0 ? getTextResponse(getAverage(scores)) : 'Нема відповідей'}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
            <Card style={{marginBottom: 24}}>
                <CardContent>
                    <RadarChart questions={questions} />
                </CardContent>
            </Card>
        </div>
    );
};

export default OverviewTab;