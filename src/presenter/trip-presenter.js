import {render, RenderPosition} from '../framework/render.js';
import TripView from '../view/trip-view.js';
import {sortDayUp} from '../utils/point.js';

export default class TripPresenter {
  #tripContainer = null;
  #tripComponent = null;
  #points = [];


  constructor({tripContainer}, points) {
    this.#tripContainer = tripContainer;
    this.#points = [...points.points].sort(sortDayUp);
    console.log(this.#points);
    this.#tripComponent = new TripView({point: this.#points});
  }

  init() {
    this.#renderTrip();
  }

  #renderTrip(){
    if(this.#points.length){
      render(this.#tripComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
    }
  }
}
