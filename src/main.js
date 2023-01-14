//import {render} from './framework/render.js';
import FiltersPresenter from './presenter/filters-point-presenter.js';
import PointModel from './model/point-model.js';
import PointPresenter from './presenter/point-presenter.js';

const siteMainElement = document.querySelector('.page-main');
const siteMainTripEvents = siteMainElement.querySelector('.trip-events');
const siteHeaderElement = document.querySelector('.page-header');
const siteHeaderFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');

//render(new FiltersView(), siteHeaderFilterElement);

const pointModel = new PointModel();

const pointPresenter = new PointPresenter({
  pointListContainer: siteMainTripEvents,
  pointModel
});
pointPresenter.init();
const filtersPresenter = new FiltersPresenter({filterContainer: siteHeaderFilterElement}, pointModel);
filtersPresenter.init();

