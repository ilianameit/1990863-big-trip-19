import dayjs from 'dayjs';
const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'HH:mm';
const EDIT_DATE_FORMAT = 'DD/MM/YY';

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

function humanizePointDueDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';
}
function humanizePointDueTime(dueDate) {
  return dueDate ? dayjs(dueDate).format(TIME_FORMAT) : '';
}
function humanizeEditPointDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(EDIT_DATE_FORMAT) : '';
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
      `${dayResult}D ${Math.round(hourResult / 24)}H ${Math.round(minuteResult / (24 * 60))}M`
    );
  } else if(hourResult){
    return(
      `${hourResult}H ${Math.round(minuteResult / 24)}M`
    );
  } else{
    return(
      `${minuteResult}M`
    );
  }


}
export {getRandomArrayElement, getRandomPositiveInteger, humanizePointDueDate, humanizePointDueTime, differentDate, humanizeEditPointDate, upperFirstCase};
