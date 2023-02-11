import {render} from './framework/render.js';
import FiltersPresenter from './presenter/filters-point-presenter.js';
import PointModel from './model/point-model.js';
import BoardPresenter from './presenter/board-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterModel from './model/filter-model.js';
import FiltersView from './view/filters-view.js';

const filters = [
  {
    type: 'everything',
    name: 'EVERYTHING',
    count: 0,
  },
];

const siteMainElement = document.querySelector('.page-main');
const siteMainTripEvents = siteMainElement.querySelector('.trip-events');
const siteHeaderElement = document.querySelector('.page-header');
const siteTrip = siteHeaderElement.querySelector('.trip-main');
const siteHeaderFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');

//render(new FiltersView(), siteHeaderFilterElement);

const pointModel = new PointModel();
const filterModel = new FilterModel();

const pointPresenter = new BoardPresenter({
  pointListContainer: siteMainTripEvents,
  pointModel
});
pointPresenter.init();
const tripPresenter = new TripPresenter({tripContainer: siteTrip}, pointModel);
tripPresenter.init();
render(new FiltersView({
  filters,
  currentFilterType: 'everything',
  onFilterTypeChange: () => {}
}), siteHeaderFilterElement);
//const filtersPresenter = new FiltersPresenter({filterContainer: siteHeaderFilterElement}, pointModel);
//filtersPresenter.init();

