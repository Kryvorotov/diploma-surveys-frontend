export const isPast = (date) =>
  new Date(date).getTime() < new Date().getTime()