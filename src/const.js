const CITYS = ['New York', 'Bishkek', 'Miami', 'Bologna', 'Vancouver'];
const OFFERTYPE = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const FilterType = {
  everything: 'everything',
  future: 'future',
  present: 'present',
  past: 'past',
};
const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};
export {CITYS, OFFERTYPE, FilterType, SortType};
