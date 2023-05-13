import React from 'react';
import {Card, CardContent, Grid, Typography} from "@mui/material";
import {getAverage, getMostPopular} from "../../utils/math";
import RadarChart from "../charts/RadarChart";
import {getScores} from "../../utils/responses";


const OverviewTab = ({questions}) => {

    const responses = questions.map(question => question.responses).flat();
    const scores = getScores(responses)

    return (
        <div>
            <Card>
                <CardContent>
                    <Typography variant="h4" component="div" style={{marginBottom: 24}}>
                        {responses.length} Відовідей
                    </Typography>
                </CardContent>
            </Card>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Card style={{marginTop: 24}}>
                        <CardContent>
                            <Typography variant="h5" component="div" style={{marginBottom: 10}}>
                                Найпопулярніша відповідь: {getMostPopular(scores)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card style={{marginTop: 24}}>
                        <CardContent>
                            <Typography variant="h5" component="div" style={{marginBottom: 10}}>
                                Середня відповідь: {getAverage(scores)}
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