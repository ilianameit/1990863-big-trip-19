
import WaypointListedView from '../view/waypoint-listed-view.js';
import PointView from '../view/point-view.js';
import {render} from '../render.js';
import EditFormView from '../view/edit-form-view.js';

export default class PointPresenter {
  #pointListContainer = null;
  #pointModel = null;
  #pointListComponent = new WaypointListedView();
  #points = [];

  constructor({pointListContainer, pointModel}) {
    this.#pointListContainer = pointListContainer;
    this.#pointModel = pointModel;
  }


  init() {
    this.#points = [...this.#pointModel.points];

    render(this.#pointListComponent, this.#pointListContainer);
    //render(new EditFormView({}), this.#pointListComponent.element);

    for (let i = 0; i < this.#points.length; i++) {
      //render(new PointView({point: this.#points[i]}), this.#pointListComponent.element);
      this.#renderPoint(this.#points[i]);
    }

  }

  #renderPoint(point) {
    const pointComponent = new PointView({point});
    const pointEditComponent = new EditFormView({});

    const replaceCardToForm = () => {
      this.#pointListComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };
    const replaceFormToCard = () => {
      this.#pointListComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceCardToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    });
    pointEditComponent.element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', escKeyDownHandler);
    });
    pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToCard();
      document.removeEventListener('keydown', escKeyDownHandler);
    });
    render(pointComponent, this.#pointListComponent.element);

  }
}
