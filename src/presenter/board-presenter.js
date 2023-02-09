
import WaypointListedView from '../view/waypoint-listed-view.js';
import {render, RenderPosition} from '../framework/render.js';
import SortingView from '../view/sorting-view';
import MessageForEmptyListView from '../view/empty-list.js';
import PointPresenter from './point-presenter.js';

import {SortType} from '../const.js';
import {sortDayUp, sortTime, sortPrice} from '../utils/point.js';

export default class BoardPresenter {

  #pointListContainer = null;
  #pointModel = null;
  #pointListComponent = new WaypointListedView();

  #pointShortingComponent = null;
  #emptyListPoint = new MessageForEmptyListView();
  #pointsPresenter = new Map();
  #currentSortType = SortType.DAY;


  constructor({pointListContainer, pointModel}) {
    this.#pointListContainer = pointListContainer;
    this.#pointModel = pointModel;

  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.TIME:
        return [...this.#pointModel.points].sort(sortTime);
      case SortType.PRICE:
        return [...this.#pointModel.points].sort(sortPrice);
      case SortType.DAY:
        return [...this.#pointModel.points].sort(sortDayUp);
    }

    return this.#pointModel.points;
  }

  init() {


    this.#renderBoard();
  }

  #handlePointChange = (updatedPoint) => {
    this.#pointsPresenter.get(updatedPoint.id).init(updatedPoint);
  };



  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearPointList();
    this.#renderPointList();
  };

  #renderSort() {
    this.#pointShortingComponent = new SortingView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#pointShortingComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point);
    this.#pointsPresenter.set(point.id, pointPresenter);
  }

  #renderNoPoints(){
    render(this.#emptyListPoint, this.#pointListContainer, RenderPosition.AFTERBEGIN);
  }

  #clearPointList() {
    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();
  }

  #renderPoints(points) {
    points.forEach((point) => this.#renderPoint(point));
  }

  #renderPointList(points) {
    render(this.#pointListComponent, this.#pointListContainer);
    this.#renderPoints(points);
  }

  #handleModeChange = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderBoard() {
    const points = this.points;
    const pointsLength = this.points.length;
    if(!pointsLength){
      this.#renderNoPoints();
      return;
    }
    this.#renderSort();
    this.#renderPointList(points);
  }

}
