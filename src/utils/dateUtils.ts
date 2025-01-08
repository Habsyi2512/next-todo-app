import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
function getWIBTime(): string {
  return dayjs().tz("Asia/Jakarta").format();
}

// Contoh penggunaan:
console.log(getWIBTime()); // Output: "2025-01-08T14:30:00+07:00"

// Jika ingin format yang lebih spesifik
function getTimezoneID(format: string = "YYYY-MM-DDTHH:mm:ssZ"): string {
  return dayjs().tz("Asia/Jakarta").format(format);
}


const getFormattedDate = (date: string): string => {
  const parsedDate = dayjs(date);
  const now = dayjs();

  const monthsDifference = now.diff(parsedDate, "month");

  return monthsDifference < 10
    ? parsedDate.fromNow()
    : parsedDate.format("DD-MM-YYYY HH:mm:ss");
};

export { getFormattedDate, getTimezoneID };
