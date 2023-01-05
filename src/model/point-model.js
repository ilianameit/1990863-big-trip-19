import {getRandomPoints} from '../mock/point.js';

const POINT_COUNT = 6;

export default class PointModel {

  #points = Array.from({length: POINT_COUNT}, getRandomPoints);

  get points() {
    return this.#points;
  }
}
