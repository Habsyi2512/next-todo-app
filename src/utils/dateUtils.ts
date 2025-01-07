import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const getFormattedDate = (date: string): string => {
  const parsedDate = dayjs(date);
  const now = dayjs();

  const monthsDifference = now.diff(parsedDate, "month");

  return monthsDifference < 10
    ? parsedDate.fromNow()
    : parsedDate.format("DD-MM-YYYY HH:mm:ss");
};

export default getFormattedDate;
