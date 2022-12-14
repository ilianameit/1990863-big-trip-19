import {getRandomArrayElement, getRandomPositiveInteger} from '../utils.js';
import {offersByType} from './offers-by-type.js';
import {OFFERTYPE} from '../const.js';
import {destanition} from './destanition.js';

const points = [
  {
    basePrice: getRandomPositiveInteger(500, 850),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: destanition[getRandomPositiveInteger(0, destanition.length - 1)].name,
    id: '0',
    isFavorite:  Boolean(getRandomPositiveInteger(0, 1)),
    offers: offersByType[getRandomPositiveInteger(0, offersByType.length - 1)].offers,
    type: getRandomArrayElement(OFFERTYPE),
    img: destanition[getRandomPositiveInteger(0, destanition.length - 1)].pictures[0].src
  },
  {
    basePrice: getRandomPositiveInteger(500, 850),
    dateFrom: '2019-05-12T12:30:56.845Z',
    dateTo: '2019-05-13T09:30:13.375Z',
    destination: destanition[getRandomPositiveInteger(0, destanition.length - 1)].name,
    id: '1',
    isFavorite:  Boolean(0, 1),
    offers: offersByType[getRandomPositiveInteger(0, offersByType.length - 1)].offers,
    type: getRandomArrayElement(OFFERTYPE),
    img: destanition[getRandomPositiveInteger(0, destanition.length - 1)].pictures[0].src
  },
  {
    basePrice: getRandomPositiveInteger(500, 850),
    dateFrom: '2019-06-19T12:30:56.845Z',
    dateTo: '2019-06-19T13:30:13.375Z',
    destination: destanition[getRandomPositiveInteger(0, destanition.length - 1)].name,
    id: '1',
    isFavorite:  Boolean(0, 0),
    offers: offersByType[getRandomPositiveInteger(0, offersByType.length - 1)].offers,
    type: getRandomArrayElement(OFFERTYPE),
    img: destanition[getRandomPositiveInteger(0, destanition.length - 1)].pictures[0].src
  },
  {
    basePrice: getRandomPositiveInteger(500, 850),
    dateFrom: '2019-05-12T12:30:56.845Z',
    dateTo: '2019-05-13T09:30:13.375Z',
    destination: destanition[getRandomPositiveInteger(0, destanition.length - 1)].name,
    id: '1',
    isFavorite:  Boolean(0, 1),
    offers: offersByType[getRandomPositiveInteger(0, offersByType.length - 1)].offers,
    type: getRandomArrayElement(OFFERTYPE),
    img: destanition[getRandomPositiveInteger(0, destanition.length - 1)].pictures[0].src
  },

];
function getRandomPoints() {
  return getRandomArrayElement(points);
}

export {getRandomPoints};
