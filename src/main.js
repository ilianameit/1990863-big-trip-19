import CreationFormView from './view/creation-form-view.js';
import EditFormView from './view/edit-form-view.js';
import FiltersView from './view/filters-view.js';
import SortingView from './view/sorting-view';
import WaypointListedView from './view/waypoint-listed-view.js';
import {render} from './render.js';

const siteMainElement = document.querySelector('.page-main');
const siteMainTripEvents = siteMainElement.querySelector('.trip-events');
const siteHeaderElement = document.querySelector('.page-header');
const siteHeaderFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');

render(new FiltersView(), siteHeaderFilterElement);
render(new SortingView(), siteMainTripEvents);
render(new CreationFormView(), siteMainTripEvents);
render(new EditFormView(), siteMainTripEvents);
render(new WaypointListedView(), siteMainTripEvents);
