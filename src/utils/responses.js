export const getScores = (responses) => {
    return responses.map(response => response.score)
}