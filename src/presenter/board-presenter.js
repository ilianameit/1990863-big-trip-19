
import WaypointListedView from '../view/waypoint-listed-view.js';
import {render, RenderPosition} from '../framework/render.js';
import SortingView from '../view/sorting-view';
import MessageForEmptyListView from '../view/empty-list.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../utils/common.js';
import {SortType} from '../const.js';
import {sortTime, sortPrice} from '../utils/point.js';

export default class BoardPresenter {

  #pointListContainer = null;
  #pointModel = null;
  #pointListComponent = new WaypointListedView();
  #points = [];
  #pointShortingComponent = null;
  #emptyListPoint = new MessageForEmptyListView();
  #pointsPresenter = new Map();
  #currentSortType = SortType.DAY;
  #sourcedBoardPoints = [];

  constructor({pointListContainer, pointModel}) {
    this.#pointListContainer = pointListContainer;
    this.#pointModel = pointModel;

  }


  init() {

    this.#points = [...this.#pointModel.points];
    this.#sourcedBoardPoints = [...this.#pointModel.points];
    this.#renderBoard();
  }

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
    this.#pointsPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoints(sortType){
    switch (sortType) {
      case SortType.TIME:
        this.#points.sort(sortTime);
        break;
      case SortType.PRICE:
        this.#points.sort(sortPrice);
        break;
      default:
        this.#points = [...this.#sourcedBoardPoints];
        break;
    }
    this.#currentSortType = sortType;

  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointList();
  };

  #renderShort() {
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

  #renderPointList() {
    render(this.#pointListComponent, this.#pointListContainer);
  }

  #handleModeChange = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderBoard() {
    if(this.#points.length){
      for (let i = 0; i < this.#points.length; i++) {
        this.#renderPoint(this.#points[i]);
      }
    } else {
      this.#renderNoPoints();
      return;
    }
    this.#renderShort();
    this.#renderPointList();
  }

}
