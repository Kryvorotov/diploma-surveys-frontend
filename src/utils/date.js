export const isPast = (date) =>
  new Date(date).getTime() < new Date().getTime()

export const convertToInput = (date) => date ? new Date(date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0]

export const getDate = (date) => new Date(Date.parse(date)).toDateString()

export const getDateInDigits = (date) => new Date(date).toLocaleDateString()