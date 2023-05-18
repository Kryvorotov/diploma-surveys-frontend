export const getChartConfig = (scores) => {
  return {
    labels: ["Дуже добре", "Добре", "Нормально", "Погано", "Дуже погано"],
    datasets: [
      {
        data: [
          scores.reduce((count, value) => (value === 5 ? count + 1 : count), 0),
          scores.reduce((count, value) => (value === 4 ? count + 1 : count), 0),
          scores.reduce((count, value) => (value === 3 ? count + 1 : count), 0),
          scores.reduce((count, value) => (value === 2 ? count + 1 : count), 0),
          scores.reduce((count, value) => (value === 1 ? count + 1 : count), 0),
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
        ],
        borderWidth: 1,
      },
    ],
  };
};

export const getRadarConfig = (labels, data) => {
  return {
    labels: labels,
    datasets: [
      {
        label: "Загальний огляд",
        data: data,
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
    ],
  };
};
