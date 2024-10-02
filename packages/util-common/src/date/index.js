import dayjs from 'dayjs';

// todo: rework this function by using dayjs
export const setDate = ({ days, hours }) => {
  const d = new Date();
  if (hours) d.setHours(d.getHours() + hours);
  if (days) d.setDate(d.getDate() + days);

  return d;
};

export const weekDaysFromLocal = (
  localeName = 'fr',
  weekday = 'long'
) => {
  const { format } = new Intl.DateTimeFormat(localeName, {
    weekday,
    timeZone: 'UTC',
  });
  const timestamp = day => Date.UTC(2021, 5, day);
  const date = new Date();
  const getUTCDate = day =>
    date.setTime(timestamp(day) + date.getTimezoneOffset() * 60000);

  return Array.from(Array(7), (_, x) => x).map(day =>
    format(getUTCDate(day))
  );
};

export const formatedDate = ({
  date = new Date(),
  format = 'YYYY-MM-DD',
} = {}) => dayjs(date).format(format);
