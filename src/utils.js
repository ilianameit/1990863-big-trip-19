import dayjs from 'dayjs';
const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'HH:mm';
const EDIT_DATE_FORMAT = 'DD/MM/YY';
const HOURS_PER_DAY = 24;
const MIN_IN_AN_HOUR = 60;

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomPositiveInteger(a, b) {
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.round(Math.random() * (upper - lower) + lower);
  return Math.floor(result);
}

function humanizeDate(dueDate, dateFormat) {
  return dueDate ? dayjs(dueDate).format(dateFormat) : '';
}

function upperFirstCase(word){
  return (word[0].toUpperCase() + word.slice(1));
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
export {getRandomArrayElement, getRandomPositiveInteger, differentDate, humanizeDate, DATE_FORMAT, TIME_FORMAT, EDIT_DATE_FORMAT, upperFirstCase};
