import CreationFormView from './view/creation-form-view.js';
//import EditFormView from './view/edit-form-view.js';
import FiltersView from './view/filters-view.js';
import SortingView from './view/sorting-view';
import {render} from './render.js';
import PointModel from './model/point-model.js';
import PointPresenter from './presenter/point-presenter.js';

const siteMainElement = document.querySelector('.page-main');
const siteMainTripEvents = siteMainElement.querySelector('.trip-events');
const siteHeaderElement = document.querySelector('.page-header');
const siteHeaderFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const pointModel = new PointModel();
console.log(pointModel);
const pointPresenter = new PointPresenter({
  pointListContainer: siteMainTripEvents,
  pointModel
});

render(new FiltersView(), siteHeaderFilterElement);
render(new SortingView(), siteMainTripEvents);
//render(new CreationFormView(), siteMainTripEvents);
//render(new EditFormView(), siteMainTripEvents);

pointPresenter.init();
