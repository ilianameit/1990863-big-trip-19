import {render} from '../render.js';
import FiltersView from '../view/filters-view.js';


export default class FiltersPresenter {
  #filterContainer = null;
  #filterComponent = new FiltersView();
  #points = [];

  constructor({filterContainer}) {
    this.#filterContainer = filterContainer;
  }

  init(points) {
    this.#points = [...points.points];
    render(this.#filterComponent, this.#filterContainer);
    const formFilters = document.querySelector('form.trip-filters');
    if(!this.#points.length){

      formFilters.addEventListener('change', (evt) => {
        const targetInput = evt.target;
        const messageText = document.querySelector('.trip-events__msg');
        if(targetInput.value === 'everything'){
          messageText.textContent = 'Click New Event to create your first point';
        }
        if(targetInput.value === 'future'){
          messageText.textContent = 'There are no future events now';
        }
        if(targetInput.value === 'present'){
          messageText.textContent = 'There are no present events now';
        }
        if(targetInput.value === 'past'){
          messageText.textContent = 'There are no past events now';
        }

      });
    }
  }
}
