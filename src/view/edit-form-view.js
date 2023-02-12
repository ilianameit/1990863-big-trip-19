import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { upperFirstCase} from '../utils/point.js';
import {OFFERTYPE, CITYS} from '../const.js';
import { returnDestanition, returnAllDestanitions} from '../mock/destanition.js';
import {humanizeDate, Format} from '../utils/point.js';
import { returnOffers} from '../mock/offers-by-type.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const BLANK_POINT = {
  basePrice: 0,
  destination: CITYS[0],
  city: '',
  cities: CITYS[0],
  offers: [],
  type: OFFERTYPE[0],
};

function createOfferTypes() {
  return OFFERTYPE.map( (offerType, index) =>
    `
      <div class="event__type-item">
        <input id="event-type-${offerType}-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offerType}">
        <label class="event__type-label  event__type-label--${offerType}" for="event-type-${offerType}-${index}">${upperFirstCase(offerType)}</label>
      </div>
    `
  ).join('');
}
function createListCities() {
  const allCIties = returnAllDestanitions();
  return allCIties.map(
    (cityValue) =>
      `<option value="${upperFirstCase(cityValue)}"></option>`
  ).join('');
}

function createOffers(type, offers) {
  const offersType = returnOffers(type);

  function isOfferChecked(currentOffers, offer) {
    if(currentOffers) {
      return currentOffers.find( (currentOffer) => currentOffer === offer.id) ;
    } return '';
  }

  return offersType.map(
    (offer, index) =>
      `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${index}" type="checkbox" name="event-offer-luggage" ${isOfferChecked(offers, offer) ? 'checked' : ''}  data-type="${type}" data-offer-id="${offer.id}">
        <label class="event__offer-label" for="event-offer-luggage-${index}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>
      `
  ).join('');
}

function createDestinationTemplate(destination) {
  const currentDestinition = returnDestanition(destination);
  const photosTape = currentDestinition === undefined ? '' : `
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${currentDestinition.pictures.map(({ src, description }) => `<img class="event__photo" src="${src}" alt="${description}">`)}
      </div>
    </div>
  `;
  return (currentDestinition ? `
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${currentDestinition.description}</p>
      ${photosTape}
    </section>
  ` : '');
}


function createEditFormTemplate(point) {
  const isNewPoint = !('id' in point);
  const{basePrice, dateFrom, dateTo, destination, offers, type} = point;
  //console.log(basePrice, dateFrom, dateTo, destination, city, offers, type, cities);
  const offerTypes = createOfferTypes();
  const cityList = createListCities();
  const showOffers = createOffers(type, offers);
  const destinationInfo = createDestinationTemplate(destination);
  const city = returnDestanition(destination) ? returnDestanition(destination).name : '';
  return(
    `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-${point.id}">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${point.id}" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${offerTypes}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${destination}">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${destination}" type="text" name="event-destination" value="${city}" list="destination-list-${point.id}">
        <datalist id="destination-list-${point.id}">
          ${cityList}

        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time">From</label>
        <input class="event__input  event__input--time" id="event-start-time" type="text" name="event-start-time" value="${humanizeDate(dateFrom, Format.EDIT_DATE)} ${humanizeDate(dateFrom, Format.TIME)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time">To</label>
        <input class="event__input  event__input--time" id="event-end-time" type="text" name="event-end-time" value="${humanizeDate(dateTo, Format.EDIT_DATE)} ${humanizeDate(dateTo, Format.TIME)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${point.id}">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${point.id}" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      ${isNewPoint ? `
      <button class="event__reset-btn" type="reset">Cancel</button>
      ` :
      `
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
      `}
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${showOffers}
        </div>
      </section>

      ${destinationInfo}

    </section>
    </form>`
  );
}
export default class EditFormView extends AbstractStatefulView {

  #handleFormSubmit = null;
  #handleDeleteClick = null;
  #handleCloseClick = null;
  #datepicker = { from: null, to: null };
  constructor({point = {
    ...BLANK_POINT,
    dateFrom: new Date(),
    dateTo: new Date(),
  }, onFormSubmit, onDeleteClick, onCloseClick}){
    super();
    //this.#point = point;
    this._setState(EditFormView.parsePointToState(point));
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;
    this.#handleCloseClick = onCloseClick;

    this._restoreHandlers();
  }

  get template() {
    return createEditFormTemplate(this._state);
  }

  removeElement() {
    super.removeElement();

    for (const key in this.#datepicker) {
      if (this.#datepicker[key]) {
        this.#datepicker[key].destroy();
        this.#datepicker[key] = null;
      }
    }
  }

  reset(point){
    this.updateElement(
      EditFormView.parsePointToState(point),
    );
  }

  _restoreHandlers() {
    this.element
      .addEventListener('submit', this.#formSubmitHandler);
    const rollupButtonElement = this.element.querySelector('.event__rollup-btn');
    if (rollupButtonElement) {
      rollupButtonElement.addEventListener('click', this.#closeClickHandler);
    }
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#deleteClickHandler);
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#pointTypeChangeHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#priceInputHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__available-offers')
      .addEventListener('change', this.#offerChangeHandler);
    this.#setDatepicker();

  }

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #setDatepicker() {
    this.#datepicker.from = flatpickr(
      this.element.querySelector('#event-start-time'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        // eslint-disable-next-line camelcase
        time_24hr: true,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
      },
    );
    this.#datepicker.to = flatpickr(
      this.element.querySelector('#event-end-time'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        // eslint-disable-next-line camelcase
        time_24hr: true,
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onChange: this.#dateToChangeHandler,
      },
    );
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditFormView.parseStateToPoint(this._state));
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditFormView.parseStateToPoint(this._state));
  };

  #closeClickHandler = () => {
    this.#handleCloseClick();
  };

  #pointTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    const parsedPrice = parseInt(evt.target.value, 10);
    evt.target.value = isNaN(parsedPrice) ? this._state.basePrice : parsedPrice;
    this._setState({ basePrice: parseInt(evt.target.value, 10) });
  };

  #destinationChangeHandler = (evt) => {
    const destination = returnDestanition(evt.target.value);
    if(destination !== undefined) {
      const destId = destination.id;
      this.updateElement({ destination: destId });
    }
  };

  #offerChangeHandler = (evt) => {
    let selectedOffers = this._state.offers;
    const offerId = parseInt(evt.target.dataset.offerId, 10);
    if (evt.target.checked) {
      selectedOffers.push(offerId);
      selectedOffers.sort();
    } else {
      selectedOffers = this._state.offers.filter((e) => e !== offerId);
    }
    this._setState({ offers: selectedOffers });
  };

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    return {...state};
  }
}

