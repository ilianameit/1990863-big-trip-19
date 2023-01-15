import dayjs from 'dayjs';
import {FilterType} from '../const.js';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const filter = {
  [FilterType.everything]: (points) => points.filter((point) => point),
  [FilterType.future]: (points) => points.filter((point) => dayjs(point.dateFrom).isAfter(dayjs())),
  [FilterType.present]: (points) => points.filter((point) => dayjs(point.dateFrom).isSameOrBefore(dayjs()) && dayjs(point.dateTo).isSameOrAfter(dayjs())),
  [FilterType.past]: (points) => points.filter((point) => dayjs(point.dateTo).isBefore(dayjs())),

};
export {filter};
