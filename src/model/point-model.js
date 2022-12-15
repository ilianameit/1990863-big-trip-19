import {getRandomPoints} from '../mock/point.js';

const POINT_COUNT = 6;

export default class PointModel {
  points = Array.from({length: POINT_COUNT}, getRandomPoints);

  getPoints() {
    return this.points;
  }
}
