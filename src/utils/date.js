export const convertDateRange = (startDate, endDate) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
  const startDateString = new Date(startDate).toLocaleDateString(undefined, options);
  const endDateString = new Date(endDate).toLocaleDateString(undefined, options);
  return `From ${startDateString.split(",")[1]} - ${
    endDateString.split(",")[1]
  }`;
};