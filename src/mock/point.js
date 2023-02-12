import {nanoid} from 'nanoid';
import {getRandomArrayElement, getRandomPositiveInteger} from '../utils/common.js';
import {OFFERTYPE} from '../const.js';
import {destanition} from './destanition.js';


const type1 = getRandomArrayElement(OFFERTYPE);
const type2 = getRandomArrayElement(OFFERTYPE);
const type3 = getRandomArrayElement(OFFERTYPE);
const type4 = getRandomArrayElement(OFFERTYPE);

const points = [
  {
    basePrice: getRandomPositiveInteger(500, 850),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2025-07-11T11:22:13.375Z',
    destination: destanition[getRandomPositiveInteger(0, destanition.length - 1)].name,
    ids: '0',
    isFavorite:  Boolean(getRandomPositiveInteger(0, 1)),
    //offers: getRandomArrayElement(offersByType[getRandomPositiveInteger(0, offersByType.length - 1)].offers),
    type: type1,
    offers: [],
    img: destanition[getRandomPositiveInteger(0, destanition.length - 1)].pictures[0].src,

  },
  {
    basePrice: getRandomPositiveInteger(500, 850),
    dateFrom: '2019-05-12T12:30:56.845Z',
    dateTo: '2019-05-13T09:30:13.375Z',
    destination: destanition[getRandomPositiveInteger(0, destanition.length - 1)].name,
    ids: '1',
    isFavorite:  Boolean(0, 1),
    type: type2,
    offers:[1, 2],
    img: destanition[getRandomPositiveInteger(0, destanition.length - 1)].pictures[0].src
  },
  {
    basePrice: getRandomPositiveInteger(500, 850),
    dateFrom: '2019-06-19T12:30:56.845Z',
    dateTo: '2019-06-19T13:30:13.375Z',
    destination: destanition[getRandomPositiveInteger(0, destanition.length - 1)].name,
    ids: '1',
    isFavorite:  Boolean(0, 0),
    type: type3,
    offers: [1,3],
    img: destanition[getRandomPositiveInteger(0, destanition.length - 1)].pictures[0].src
  },
  {
    basePrice: getRandomPositiveInteger(500, 850),
    dateFrom: '2019-05-12T12:30:56.845Z',
    dateTo: '2019-05-12T13:30:13.375Z',
    destination: destanition[getRandomPositiveInteger(0, destanition.length - 1)].name,
    ids: '1',
    isFavorite:  Boolean(0, 1),
    type: type4,
    offers:[2,3],
    img: destanition[getRandomPositiveInteger(0, destanition.length - 1)].pictures[0].src
  },

];
function getRandomPoints() {
  return {
    id: nanoid(),
    ...getRandomArrayElement(points)
  };
}

export {getRandomPoints};
