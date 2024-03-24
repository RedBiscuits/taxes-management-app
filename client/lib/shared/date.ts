import dayjs from "dayjs";

export const formatDate = (date: Date) =>
  dayjs(date).format("YYYY-MM-DDTHH:mm:ss.SSSSSS") + "Z";
