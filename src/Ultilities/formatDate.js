import moment from "moment";

export const formatDate = (date, formatType = "hh:mm:ss a DD/MM/YYYY") => {
  const newDate = moment(date);
  const formattedDate = newDate.format(formatType);
  return formattedDate;
};
