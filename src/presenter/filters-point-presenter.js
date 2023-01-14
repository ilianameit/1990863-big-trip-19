import {render} from '../framework/render.js';
import FiltersView from '../view/filters-view.js';
import {generateFilter} from '../mock/filter.js';


export default class FiltersPresenter {
  #filterContainer = null;
  #filterComponent = null;
  #points = [];
  #filters = null;

  constructor({filterContainer}, points) {
    this.#filterContainer = filterContainer;
    this.#points = [...points.points];
    this.#filters = generateFilter(this.#points);
    this.#filterComponent = new FiltersView({filters: this.#filters});
  }

  init() {
    render(this.#filterComponent, this.#filterContainer);
    if(!this.#points.length){
      this.#filterComponent.changeTextFilter();
    }
  }

}
