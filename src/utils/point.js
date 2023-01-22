import dayjs from 'dayjs';
const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'HH:mm';
const EDIT_DATE_FORMAT = 'DD/MM/YY';
const HOURS_PER_DAY = 24;
const MIN_IN_AN_HOUR = 60;

function humanizeDate(dueDate, dateFormat) {
  return dueDate ? dayjs(dueDate).format(dateFormat) : '';
}
function differentDate(from, to){
  const date1 = dayjs(from);
  const date2 = dayjs(to);

  const dayResult = date2.diff(date1, 'day');
  const hourResult = date2.diff(date1, 'hour');
  const minuteResult = date2.diff(date1, 'minute');
  if(dayResult){
    return (
      `${dayResult}D ${Math.round(hourResult / HOURS_PER_DAY)}H ${Math.round(minuteResult / (HOURS_PER_DAY * MIN_IN_AN_HOUR))}M`
    );

  }
  if(hourResult){
    return(
      `${hourResult}H ${Math.round(minuteResult / HOURS_PER_DAY)}M`
    );
  }
  return(
    `${minuteResult}M`
  );

}
function getWeightSort(valueA, valueB) {
  if (valueA === null && valueB === null) {
    return 0;
  }

  if (valueA === null) {
    return 1;
  }

  if (valueB === null) {
    return -1;
  }

  return null;
}
function sortDayUp(pointA, pointB) {
  const weight = getWeightSort(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function sortTime(pointA, pointB) {
  const timeA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const timeB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  const weight = getWeightSort(timeA, timeB);

  return weight ;
}
function sortPrice(pointA, pointB) {
  const weight = getWeightSort(pointA.basePrice, pointB.basePrice);

  return weight;
}

export {differentDate, humanizeDate, DATE_FORMAT, TIME_FORMAT, EDIT_DATE_FORMAT, sortDayUp, sortTime, sortPrice};
