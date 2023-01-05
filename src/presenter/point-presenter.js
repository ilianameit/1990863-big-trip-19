
import WaypointListedView from '../view/waypoint-listed-view.js';
import PointView from '../view/point-view.js';
import {render} from '../framework/render.js';
import EditFormView from '../view/edit-form-view.js';
import SortingView from '../view/sorting-view';
import MessageForEmptyListView from '../view/empty-list.js';

export default class PointPresenter {

  #pointListContainer = null;
  #pointModel = null;
  #pointListComponent = new WaypointListedView();
  #points = [];
  #pointShortingComponent = new SortingView();
  #emptyListPoint = new MessageForEmptyListView();

  constructor({pointListContainer, pointModel}) {
    this.#pointListContainer = pointListContainer;
    this.#pointModel = pointModel;

  }


  init() {

    this.#points = [...this.#pointModel.points];

    this.#renderBoard();
  }

  #renderPoint(point) {

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToCard().call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    /*  pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
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
*/
    const pointComponent = new PointView({
      point,
      onEditClick: () => {
        replaceCardToForm.call(this);
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });
    const pointEditComponent = new EditFormView(point,{
      onFormSubmit: () => {
        replaceFormToCard.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }});

    function replaceCardToForm() {
      this.#pointListComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    }
    function replaceFormToCard() {
      this.#pointListComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    }
    render(this.#pointShortingComponent, this.#pointListContainer);
    render(this.#pointListComponent, this.#pointListContainer);
    render(pointComponent, this.#pointListComponent.element);

  }

  #renderBoard() {
    if(this.#points.length){
      for (let i = 0; i < this.#points.length; i++) {
        this.#renderPoint(this.#points[i]);
      }
    } else {
      render(this.#emptyListPoint, this.#pointListContainer);
    }
  }

}
