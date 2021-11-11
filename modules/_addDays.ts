export const unixTime = (date: number) => {
  return Math.floor(date / 1000)
}

export const addDays = (date: Date, n: number) => {
  const result = new Date(date)
  result.setDate(result.getDate() + n)
  return result
}
