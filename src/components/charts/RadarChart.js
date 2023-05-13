import React from 'react';
import {Radar} from "react-chartjs-2";
import {getRadarConfig} from "../../utils/chart";
import {getAverage} from "../../utils/math";
import {getScores} from "../../utils/responses";

const RadarChart = ({questions}) => {

    const questionTitles = questions.map(question => question.text)
    const questionResponses = questions.map(question => getAverage(getScores(question.responses)))

    return (
            <Radar
                data={ getRadarConfig(questionTitles, questionResponses) }>
            </Radar>
    );
};

export default RadarChart;