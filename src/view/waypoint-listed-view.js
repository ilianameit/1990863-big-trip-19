import AbstractView from '../framework/view/abstract-view.js';

function createWaypointListedTemplate() {
  return(
    '<ul class="trip-events__list"></ul>'
  );
}
export default class WaypointListedView extends AbstractView{

  get template() {
    return createWaypointListedTemplate();
  }
}
