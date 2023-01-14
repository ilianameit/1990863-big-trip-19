import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate(filter, isChecked){
  const {name} = filter;

  return (
    ` <div class="trip-filters__filter">
      <input
        id="filter-${name}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${name}"
        ${isChecked ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>`
  );
}

function createFiltersTemplate(filterItems) {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join('');

  return(
    `<form class="trip-filters" action="#" method="get">

      ${filterItemsTemplate}

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
  );
}
export default class FiltersView extends AbstractView{
  #filters = null;

  constructor({filters}) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }


  changeTextFilter() {
    document.querySelector('form.trip-filters').addEventListener('change', this.#changeTextFilterHandler);
  }

  #changeTextFilterHandler = (evt) => {
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
  };
}
