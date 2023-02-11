//import {render} from './framework/render.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import PointModel from './model/point-model.js';
import BoardPresenter from './presenter/board-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterModel from './model/filter-model.js';

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
  pointModel
});
const tripPresenter = new TripPresenter({tripContainer: siteTrip}, pointModel);
tripPresenter.init();

const filtersPresenter = new FiltersPresenter({filterContainer: filterContainerElement}, filterModel, pointModel);
filtersPresenter.init();
boardPresenter.init();

