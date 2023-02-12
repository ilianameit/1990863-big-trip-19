import {render} from './framework/render.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import PointModel from './model/point-model.js';
import BoardPresenter from './presenter/board-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterModel from './model/filter-model.js';
import NewPointButtonView from './view/new-point-button-view.js';

const siteMainElement = document.querySelector('.page-main');
const siteMainTripEvents = siteMainElement.querySelector('.trip-events');
const siteHeaderElement = document.querySelector('.page-header');
const siteTrip = siteHeaderElement.querySelector('.trip-main');
const filterContainerElement = siteHeaderElement.querySelector('.trip-controls__filters');

//render(new FiltersView(), siteHeaderFilterElement);

const pointModel = new PointModel();
const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter({
  pointListContainer: siteMainTripEvents,
  pointModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose,
});
const tripPresenter = new TripPresenter({tripContainer: siteTrip}, pointModel);

const filtersPresenter = new FiltersPresenter({filterContainer: filterContainerElement, filterModel, pointModel});
const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  boardPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

tripPresenter.init();
render(newPointButtonComponent, siteTrip);
filtersPresenter.init();
boardPresenter.init();

