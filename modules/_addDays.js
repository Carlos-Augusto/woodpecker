export const unixTime = (date) => {
    return Math.floor(date / 1000);
};

export const addDays = (date, n) => {
    const oneDayInMs = 86400 * 1000;
    return new Date(Date.parse(date) + (n * oneDayInMs));
};