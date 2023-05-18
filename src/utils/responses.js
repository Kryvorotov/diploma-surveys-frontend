export const getScores = (responses) => {
  return responses.map((response) => response.score);
};

export const getTextResponse = (response_number) => {
  switch (response_number) {
    case 1:
      return "Дуже погано";
    case 2:
      return "Погано";
    case 3:
      return "Нормально";
    case 4:
      return "Добре";
    case 5:
      return "Дуже добре";
    default:
      return "";
  }
};

export const responsesList = [
  { score: 5, label: "Дуже добре" },
  { score: 4, label: "Добре" },
  { score: 3, label: "Нормально" },
  { score: 2, label: "Погано" },
  { score: 1, label: "Дуже погано" },
];
