import React from "react";
import { Bar, Pie, PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
} from "chart.js";
import { getChartConfig } from "../../utils/chart";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale
);

const ChartView = ({ responses, type }) => {
  const getScores = (responses) => {
    return responses.map((response) => response.score);
  };

  const scores = getScores(responses);

  const resultData = getChartConfig(scores);

  return (
    <div>
      {type === "bar" && <Bar data={resultData} />}
      {type === "pie" && <Pie data={resultData} />}
      {type === "polar" && <PolarArea data={resultData} />}
    </div>
  );
};

export default ChartView;
