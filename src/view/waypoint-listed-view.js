import {createElement} from '../render.js';
//import PointModel from '../model/point-model.js';

function createWaypointListedTemplate() {
  return(
    '<ul class="trip-events__list"></ul>'
  );
}
export default class WaypointListedView {
  getTemplate() {
    return createWaypointListedTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
