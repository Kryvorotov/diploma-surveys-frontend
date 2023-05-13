import React, {useState} from 'react';
import {Button, ButtonGroup, Card, CardContent, Divider, Typography} from "@mui/material";
import ChartView from "./data-views/ChartView";
import {countElement, getPercent} from "../utils/math";
import TableView from "./data-views/TableView";

const Question = ({question}) => {
    const [resultView, setResultView] = useState('default')

    return (
        <Card style={{marginTop: 24}}>
            <CardContent>
                <Typography variant="h5" component="div" style={{marginBottom: 10}}>
                    {question.text}
                </Typography>
                <Divider />
                {(question.responses && question.responses.length > 0) && (
                <div>
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
                        <ChartView responses={question.responses} type='bar' />
                    )}
                    {resultView === 'pie' && (
                        <ChartView responses={question.responses} type={resultView} />
                    )}
                    {resultView === 'polar' && (
                        <ChartView responses={question.responses} type={resultView} />
                    )}
                    {resultView === 'table' && (
                        <TableView responses={question.responses} func={countElement} columnName="Кількість"/>
                    )}
                    {resultView === 'percent' && (
                        <TableView responses={question.responses} func={getPercent} columnName="Відсоток" />
                    )}
                    </div>
                )}
                {!(question.responses && question.responses.length > 0) && (
                    <Typography component="p" color="grey" style={{paddingInline: 20, paddingBlock: 30 }}>
                        Немає відповідей
                    </Typography>
                )}

            </CardContent>

        </Card>
    );
};

export default Question;