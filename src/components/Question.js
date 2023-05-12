import React, {useState} from 'react';
import {Button, ButtonGroup, Card, CardContent, Divider, Typography} from "@mui/material";

const Question = ({question}) => {
    const [resultView, setResultView] = useState('default')

    return (
        <Card style={{marginTop: 24}}>
            <CardContent>
                <Typography variant="h5" component="div" style={{marginBottom: 10}}>
                    {question.text}
                </Typography>
                <Divider />
                <ButtonGroup
                    size="small"
                    variant="outlined"
                    aria-label="outlined primary button group"
                    style={{marginTop: 20}}
                >
                    <Button
                        onClick={() => setResultView('bar')}
                        variant={(resultView === 'default' || resultView === 'bar') ? 'contained' : 'outlined'}
                    >Bar</Button>
                    <Button
                        onClick={() => setResultView('pie')}
                        variant={resultView === 'pie' ? 'contained' : 'outlined'}
                    >Pie</Button>
                    <Button
                        onClick={() => setResultView('polar')}
                        variant={resultView === 'polar' ? 'contained' : 'outlined'}
                    >Polar</Button>
                    <Button
                        onClick={() => setResultView('table')}
                        variant={resultView === 'table' ? 'contained' : 'outlined'}
                    >Table</Button>
                    <Button
                        onClick={() => setResultView('percent')}
                        variant={resultView === 'percent' ? 'contained' : 'outlined'}
                    >%</Button>
                </ButtonGroup>
                {(resultView === 'bar' || resultView === 'default') && (
                    <div>Bar</div>
                )}
                {resultView === 'pie' && (
                    <div>Pie</div>
                )}
                {resultView === 'polar' && (
                    <div>Polar</div>
                )}
                {resultView === 'table' && (
                    <div>Table</div>
                )}
                {resultView === 'percent' && (
                    <div>Percent</div>
                )}
            </CardContent>

        </Card>
    );
};

export default Question;