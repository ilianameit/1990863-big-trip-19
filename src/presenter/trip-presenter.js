import {render, RenderPosition} from '../framework/render.js';
import TripView from '../view/trip-view.js';
//import {sortDayUp} from '../utils/point.js';

export default class TripPresenter {
  #tripContainer = null;
  #tripComponent = null;
  #pointModel = null;


  constructor({tripContainer, pointModel}) {
    this.#tripContainer = tripContainer;
    this.#pointModel = pointModel;


    this.#pointModel.addObserver(this.#handleModelEvent);
  }

  init() {
    const points = this.#pointModel.points;
    console.log(points)
    this.#tripComponent = new TripView({point: points});
    this.#renderTrip();
  }

  #renderTrip(){
    const points = this.#pointModel.points;
    if(points.length){
      render(this.#tripComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
    }
  }

  #handleModelEvent = () => {
    this.init();
  };
}
