import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate(filter, currentFilterType){
  const {type, name, count} = filter;

  return (
    ` <div class="trip-filters__filter">
      <input
        id="filter-${type}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${type}"
        ${type === currentFilterType ? 'checked' : ''}
        ${count === 0 ? 'disabled' : ''}>
      <label class="trip-filters__filter-label" for="filter-${type}">${name}</label>
    </div>`
  );
}

function createFiltersTemplate(filterItems, currentFilterType) {
  const filterItemsTemplate = filterItems
    .map((filter, currentFilterType, onFilterTypeChange) => createFilterItemTemplate(filter, currentFilterType))
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
