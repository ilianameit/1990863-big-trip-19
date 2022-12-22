import {createElement} from '../render.js';
//import PointModel from '../model/point-model.js';

function createWaypointListedTemplate() {
  return(

    '<ul class="trip-events__list"></ul>'

  );
}
export default class WaypointListedView {
  #element = null;
  get template() {
    return createWaypointListedTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
