export const unixTime = (date: number) => {
    return Math.floor(date / 1000);
};

export const addDays = (date: Date, n: number) => {
    const oneDayInMs = 86400 * 1000;
    return new Date(Date.parse(date.toDateString()) + (n * oneDayInMs));
};