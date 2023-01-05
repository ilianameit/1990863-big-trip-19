import {render} from '../framework/render.js';
import FiltersView from '../view/filters-view.js';


export default class FiltersPresenter {
  #filterContainer = null;
  #filterComponent = new FiltersView();
  #points = [];

  constructor({filterContainer}) {
    this.#filterContainer = filterContainer;
  }

  init(points) {
    this.#points = [...points.points];
    render(this.#filterComponent, this.#filterContainer);
    if(!this.#points.length){
      this.#filterComponent.changeTextFilter();
    }
  }

}
