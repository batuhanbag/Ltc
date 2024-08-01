import moment from 'moment';

export const taskCompletedCheck = (
  completedDates: { type: string; outputList: Set<string> }[],
  type: string
): boolean => {
  const today = moment().format('YYYY-MM-DD');
  return completedDates?.some(
    (item) => item?.type === type && item?.outputList.has(today)
  );
};

export const completedDate = (
  completedDates: { type: string; outputList: Set<string> }[],
  date: string
) => {
  const today = moment(date).format('YYYY-MM-DD');
  return completedDates?.some((item) => item?.outputList?.has(today));
};
