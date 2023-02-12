import dayjs from 'dayjs';
const Format = {
  DATE : 'MMM D',
  MONTH : 'MMM',
  DAY : 'D',
  TIME : 'HH:mm',
  EDIT_DATE : 'DD/MM/YY'
};

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
function getSortUp(valueA, valueB) {
  return valueA - valueB;
}
function sortDayUp(pointA, pointB) {
  return getSortUp(dayjs(pointA.dateFrom), dayjs(pointB.dateFrom));
}

function sortTime(pointA, pointB) {
  const timeA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const timeB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  return getSortUp(timeA, timeB);
}
function sortPrice(pointA, pointB) {
  const weight = getSortUp(pointA.basePrice, pointB.basePrice);

  return weight;
}

function calculateTotalPrice(point) {
  const initialValue = 0;
  const price = point.reduce(
    (accumulatorPrice, currentPrice) =>
      accumulatorPrice + currentPrice.basePrice, initialValue
  );
  return price;
}
function isDatesEqual(dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
}
function upperFirstCase(word){
  return (word[0].toUpperCase() + word.slice(1));
}
export {differentDate, humanizeDate, Format, sortDayUp, sortTime, sortPrice, calculateTotalPrice, isDatesEqual,upperFirstCase};
