export const isPast = (date) =>
  new Date(date).getTime() < new Date().getTime()

export const convertToInput = (date = null) => new Date(date).toISOString().split("T")[0]

export const getDate = (date) => new Date(Date.parse(date)).toDateString()