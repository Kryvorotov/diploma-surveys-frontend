export const getScores = (responses) => {
    return responses.map(response => response.score)
}

export const responsesList = [
    { score: 5, label: 'Дуже добре' },
    { score: 4, label: 'Добре' },
    { score: 3, label: 'Нормально' },
    { score: 2, label: 'Погано' },
    { score: 1, label: 'Дуже погано' },
]