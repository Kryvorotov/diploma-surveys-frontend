export const countElement = (array, element) => {
  return array.reduce(
    (count, value) => (value === element ? count + 1 : count),
    0
  );
};

export const getPercent = (array, element) => {
  return Math.round((countElement(array, element) / array.length) * 100) + " %";
};

export const getAverage = (array) => {
  return Math.round(
    array.reduce((partialSum, a) => partialSum + a, 0) / array.length
  );
};

export const getMostPopular = (array) => {
  return array
    .sort(
      (a, b) =>
        array.filter((v) => v === a).length -
        array.filter((v) => v === b).length
    )
    .pop();
};
