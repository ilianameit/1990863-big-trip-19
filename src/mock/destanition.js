import {getRandomArrayElement, getRandomPositiveInteger} from '../utils/common.js';
import {CITYS} from '../const.js';

const destanition = [
  {
    id: 1,
    description: `${(CITYS[0])}, is a beautiful city.`,
    name: CITYS[0],
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(0, 10)}`,
        description: `${getRandomArrayElement(CITYS)} ????`
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(0, 10)}`,
        description: `${getRandomArrayElement(CITYS)} ????`
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(0, 10)}`,
        description: `${getRandomArrayElement(CITYS)} ????`
      },
    ]
  },
  {
    id: 2,
    description: `${(CITYS[1])}, is a beautiful city. 2`,
    name: CITYS[1],
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(0, 10)}`,
        description: `${CITYS[1]} photos 2`
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(0, 10)}`,
        description: `${CITYS[1]} photos 2`
      },
    ]
  },
  {
    id: 3,
    description: `${(CITYS[2])}, is a beautiful city. 3`,
    name: CITYS[2],
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(0, 10)}`,
        description: `${CITYS[2]} 3`
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(0, 10)}`,
        description: `${CITYS[2]} 3`
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(0, 10)}`,
        description: `${CITYS[2]} 3`
      },
    ]
  },
  {
    id: 4,
    description: `${(CITYS[3])}, is a beautiful city. 4`,
    name: CITYS[3],
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(0, 10)}`,
        description: `${CITYS[3]} 4`
      },
    ]
  },
  {
    id: 5,
    description: `${(CITYS[4])}, is a beautiful city. 5`,
    name: CITYS[4],
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(0, 10)}`,
        description: `${CITYS[4]} 5`
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(0, 10)}`,
        description: `${CITYS[4]} 5`
      },
    ]
  },
];
function returnDestanition(city){
  const destanitionCity = destanition.filter((item) => item.name === city);
  return destanitionCity[0];
}
function returnAllDestanitions() {
  const allDestanitions = destanition.map(({name}) => name);
  return allDestanitions;
}

export {destanition, returnDestanition, returnAllDestanitions};
