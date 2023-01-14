import {getRandomArrayElement, getRandomPositiveInteger} from '../utils/common.js';
import {CITYS} from '../const.js';

const destanition = [
  {
    id: 1,
    description: `${getRandomArrayElement(CITYS)}, is a beautiful city.`,
    name: getRandomArrayElement(CITYS),
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(0, 10)}`,
        description: `${getRandomArrayElement(CITYS)} parliament building`
      }
    ]
  },
  {
    id: 2,
    description: `${getRandomArrayElement(CITYS)}, is a beautiful city.`,
    name: getRandomArrayElement(CITYS),
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(0, 10)}`,
        description: `${getRandomArrayElement(CITYS)} parliament building`
      }
    ]
  },
  {
    id: 3,
    description: `${getRandomArrayElement(CITYS)}, is a beautiful city.`,
    name: getRandomArrayElement(CITYS),
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(0, 10)}`,
        description: `${getRandomArrayElement(CITYS)} parliament building`
      }
    ]
  },
];
export {destanition};
