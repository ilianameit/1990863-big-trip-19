import {createElement} from '../render.js';
import {getRandomArrayElement, getRandomPositiveInteger, upperFirstCase} from '../utils.js';
import {OFFERTYPE, CITYS} from '../const.js';
import {destanition} from '../mock/destanition.js';
import {humanizeDate, TIME_FORMAT, EDIT_DATE_FORMAT} from '../utils.js';
import {offersByType, returnOffers} from '../mock/offers-by-type.js';

//console.log(offersByType);

const typeRandom = getRandomArrayElement(OFFERTYPE);
const cityRandom = getRandomArrayElement(CITYS);
const destinationRandom = getRandomArrayElement(destanition);
const BLANK_POINT = {
  basePrice: getRandomPositiveInteger(100, 110),
  dateFrom: '2019-03-18T12:25:56.000Z',
  dateTo: '2019-03-09T13:35:13.000Z',
  destination: destinationRandom,
  city: cityRandom,
  cities: CITYS,
  id: '0',
  offers: [returnOffers(typeRandom)],
  type: typeRandom,
  img: destanition[getRandomPositiveInteger(0, destanition.length - 1)].pictures[0].src
};

function createEditFormTemplate(data) {
  const{basePrice, dateFrom, dateTo, destination, city, offers, type, cities} = data;
  //console.log(data);
  const returnOfferTypes = (arrayOfferType) => {
    let fieldsets = '';
    arrayOfferType.forEach( (offerType) => {
      fieldsets += `
      <div class="event__type-item">
        <input id="event-type-${offerType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offerType}">
        <label class="event__type-label  event__type-label--${offerType}" for="event-type-${offerType}-1">${upperFirstCase(offerType)}</label>
      </div>`;
    });
    return fieldsets;
  };
  const returnCityValues = (values) => {
    let citiesArray = '';
    values.forEach( (cityValue) => {
      citiesArray += `<option value="${upperFirstCase(cityValue)}"></option>`;
    });
    return citiesArray;
  };

  const isOfferChecked = (offer) => (
    offers.some((item) => item.title.toLowerCase() === offer.title.toLowerCase()) ? 'checked' : ''
  );
  const showOffers = () => {
    let offerArray = '';

    offersByType.forEach( (types) => {
      if(types.type === type){
        types.offers.forEach((offer) => {
          offerArray +=
        `
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${isOfferChecked(offer)}>
          <label class="event__offer-label" for="event-offer-luggage-1">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
        </div>
        `;
        });
      }
    });
    return offerArray;
  };

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

            ${returnOfferTypes(OFFERTYPE)}


          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${returnCityValues(cities)}

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
          ${showOffers()}
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
export default class EditFormView {

  #point = null;
  #element = null;
  constructor({point = BLANK_POINT}){
    this.#point = point;
  }

  get template() {
    return createEditFormTemplate(this.#point);

  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
