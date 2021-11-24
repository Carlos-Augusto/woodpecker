/**
 * Function that helps to transform a date to its unix representation
 * @param date The milliseconds of the date in context.
 */
export const unixTime = (date: number) => {
  return Math.floor(date / 1000)
}

/**
 * Function that adds a number of days to the incoming date.
 * @param date the initial date
 * @param n number of days that should be added
 */
export const addDays = (date: Date, n: number) => {
  const result = new Date(date)
  result.setDate(result.getDate() + n)
  return result
}
