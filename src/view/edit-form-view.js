import AbstractView from '../framework/view/abstract-view.js';
import {getRandomArrayElement, getRandomPositiveInteger, upperFirstCase} from '../utils/common.js';
import {OFFERTYPE, CITYS} from '../const.js';
import {destanition} from '../mock/destanition.js';
import {humanizeDate, TIME_FORMAT, EDIT_DATE_FORMAT} from '../utils/point.js';
import { returnOffers} from '../mock/offers-by-type.js';

const typeRandom = getRandomArrayElement(OFFERTYPE);
const cityRandom = getRandomArrayElement(CITYS);
const destinationRandom = getRandomArrayElement(destanition);
const BLANK_POINT = {
  basePrice: getRandomPositiveInteger(100, 110),
  dateFrom: '2019-03-18T12:25:56.000',
  dateTo: '2019-03-09T13:35:13.000',
  destination: destinationRandom,
  city: cityRandom,
  cities: CITYS,
  id: '0',
  offers: returnOffers(typeRandom),
  type: typeRandom,
  img: destanition[getRandomPositiveInteger(0, destanition.length - 1)].pictures[0].src
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
function createListCities(values) {
  return values.map(
    (cityValue) =>
      `<option value="${upperFirstCase(cityValue)}"></option>`
  ).join('');
}

function createOffers(type, offers) {
  const offersType = returnOffers(type);

  function isOfferChecked(currentOffers,offer) {
    return currentOffers.find( (currentOffer) => currentOffer.title.toLowerCase() === offer.title.toLowerCase()) ;
  }

  return offersType.map(
    (offer, index) =>
      `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${index}" type="checkbox" name="event-offer-luggage" ${isOfferChecked(offers, offer) ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-luggage-${index}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>
      `
  ).join('');
}


function createEditFormTemplate(data) {
  const{basePrice, dateFrom, dateTo, destination, offers, type} = data;
  //console.log(basePrice, dateFrom, dateTo, destination, city, offers, type, cities);
  const offerTypes = createOfferTypes();
  const cityList = createListCities(CITYS);
  const showOffers = createOffers(type, offers);

  return(
    `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${offerTypes}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${cityList}

        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeDate(dateFrom, EDIT_DATE_FORMAT)} ${humanizeDate(dateFrom, TIME_FORMAT)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeDate(dateTo, EDIT_DATE_FORMAT)} ${humanizeDate(dateTo, TIME_FORMAT)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${showOffers}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destination.description}</p>
      </section>
    </section>
    </form>`
  );
}
export default class EditFormView extends AbstractView {

  #point = null;
  #handleFormSubmit = null;
  #handleStopEditClick = null;
  constructor({point = BLANK_POINT, onFormSubmit}){
    super();
    this.#point = point;

    this.#handleFormSubmit = onFormSubmit;
    this.element
      .addEventListener('submit', this.#formSubmitHandler);

    this.#handleStopEditClick = onFormSubmit;
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#stopEditHandler);
  }

  get template() {
    return createEditFormTemplate(this.#point);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this.#point);
  };

  #stopEditHandler = () => {
    this.#handleStopEditClick();
  };
}
export {BLANK_POINT};
