import dayjs from 'dayjs';

export const localizeDate = (date: Date): string => {
  const string = dayjs(date).format('YYYY년 MM월 DD일');
  return string;
};
