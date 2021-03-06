import {sendAd} from './api.js';
import {map, mainPinMarker, TOKYO_CENTER_LAT, TOKYO_CENTER_LNG} from './map.js';

const TITLE_ERROR_MESSAGE = 'От 30 до 100 символов';
const MAX_PRICE = 100000;
const MESSAGE_SHOW_TIME = 5000;
const FILTER_DEFAULT = 'any';
const sliderPriceStep = 100;

const adForm = document.querySelector('.ad-form');
const formFieldsets = adForm.querySelectorAll('fieldset');

const typeHousing = adForm.querySelector('#type');
const price = adForm.querySelector('#price');

const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');

const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

const featuresContainer = adForm.querySelectorAll('.features__checkbox');
const formDescription = adForm.querySelector('#description');
const formAddress = adForm.querySelector('#address');
const formTitle = adForm.querySelector('#title');

const sliderElement = adForm.querySelector('.ad-form__slider');
const submitButton = adForm.querySelector('.ad-form__submit');
const resetButton = adForm.querySelector('.ad-form__reset');

// Поля фильтрации

const mapFilter = document.querySelector('.map__filters');
const mapFiltersHousingType = mapFilter.querySelector('#housing-type');
const mapFiltersHousingPrice = mapFilter.querySelector('#housing-price');
const mapFiltersHousingRooms = mapFilter.querySelector('#housing-rooms');
const mapFiltersHousingGuests = mapFilter.querySelector('#housing-guests');
const mapFiltersFeaturesContainer = mapFilter.querySelectorAll('.map__checkbox');
//

const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');

const TitleLength = {
  MIN: 30,
  MAX: 100
};

const MapTypeToPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

const roomsCapacity = {
  min: '1',
  max: '100'
};

const mapRoomsToGuestsCount = {
  1: ['1'],
  2: ['2', '1'],
  3: ['3', '2', '1'],
  100: ['0']
};

const SubmitButtonState = {
  active: 'Публикация...',
  inactive: 'Опубликовать'
};

noUiSlider.create(sliderElement, {
  range: {
    min: MapTypeToPrice[typeHousing.value],
    max: MAX_PRICE
  },
  start: MapTypeToPrice[typeHousing.value],
  step: sliderPriceStep,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  price.value = sliderElement.noUiSlider.get();
});

const mapFiltersContainer = document.querySelector('.map__filters');
const mapFiltersSelects = mapFiltersContainer.querySelectorAll('select');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form--invalid',
  successClass: 'ad-form--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error-text',
});

const pristineImage = new Pristine(adForm, {
  classTo: 'ad-form-header',
  errorClass: 'ad-form--invalid',
  successClass: 'ad-form--valid',
  errorTextParent: 'ad-form-header',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error-text',
});

const validateTitle = (value) => value.length >= TitleLength.MIN && value.length <= TitleLength.MAX;

const validatePrice = () => price.value >= MapTypeToPrice[typeHousing.value] && price.value <= MAX_PRICE;

const getPriceErrorMessage = () => `Минимальное значение: ${MapTypeToPrice[typeHousing.value]}, Максимальное значение: ${MAX_PRICE}`;

const validateRooms = () => mapRoomsToGuestsCount[roomNumber.value].includes(capacity.value);

const getRoomsAmount = () => roomNumber.value === '100' ? `${roomNumber.value} комнат` : `${roomNumber.value} комнаты`;

const getRoomsErrorMessage = () => `
  ${roomNumber.value === roomsCapacity.min ? `${roomNumber.value} комната` : getRoomsAmount()}
  ${roomNumber.value === roomsCapacity.max ? 'не для гостей' : `не для ${capacity.value} гостей`}
  `;

pristine.addValidator(
  adForm.querySelector('#title'),
  validateTitle,
  TITLE_ERROR_MESSAGE
);

pristine.addValidator(
  adForm.querySelector('#price'),
  validatePrice,
  getPriceErrorMessage
);

pristine.addValidator(
  adForm.querySelector('#room_number'),
  validateRooms,
  getRoomsErrorMessage
);

pristine.addValidator(
  adForm.querySelector('#capacity'),
  validateRooms,
  getRoomsErrorMessage
);

const deactivateForm = () => {
  adForm.classList.add('ad-form--disabled');
  mapFiltersContainer.classList.add('map__filters--disabled');

  mapFiltersSelects.forEach((mapFilterSelect) => {
    mapFilterSelect.disabled = true;
  });

  formFieldsets.forEach((formFieldset) => {
    formFieldset.disabled = true;
  });
};

const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFiltersContainer.classList.remove('map__filters--disabled');

  mapFiltersSelects.forEach((mapFilterSelect) => {
    mapFilterSelect.disabled = false;
  });

  formFieldsets.forEach((formFieldset) => {
    formFieldset.disabled = false;
  });
};

const onTypeHousingChange = () => {
  price.placeholder = MapTypeToPrice[typeHousing.value];

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: MapTypeToPrice[typeHousing.value],
      max: MAX_PRICE
    },
    start: MapTypeToPrice[typeHousing.value]
  });

  pristine.validate(price);
};

typeHousing.addEventListener('change', onTypeHousingChange);

const addRoomsEvent = () => {
  pristine.validate(roomNumber);
  pristine.validate(capacity);
};

roomNumber.addEventListener('change', addRoomsEvent);

const addCapacityEvent = () => {
  pristine.validate(capacity);
  pristine.validate(roomNumber);
};

capacity.addEventListener('change', addCapacityEvent);

const addTimeInEvent = () => {
  timeOut.value = timeIn.value;
};

timeIn.addEventListener('change', addTimeInEvent);

const addTimeOutEvent = () => {
  timeIn.value = timeOut.value;
};

timeOut.addEventListener('change', addTimeOutEvent);

const disableSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonState.active;

  setTimeout(() => {
    submitButton.disabled = false;
    submitButton.textContent = SubmitButtonState.inactive;
  }, MESSAGE_SHOW_TIME);
};

const setInitialState  = () => {
  featuresContainer.forEach((feature) => {
    feature.checked = false;
  });

  formDescription.value = '';
  formAddress.value = '';
  formTitle.value = '';

  typeHousing.value = 'flat';
  price.value = 1000;

  timeIn.value = '12:00';
  timeOut.value = '12:00';

  roomNumber.value = '1';
  capacity.value = '1';

  mapFiltersHousingType.value = FILTER_DEFAULT;
  mapFiltersHousingPrice.value = FILTER_DEFAULT;
  mapFiltersHousingRooms.value = FILTER_DEFAULT;
  mapFiltersHousingGuests.value = FILTER_DEFAULT;

  mapFiltersFeaturesContainer.forEach((feature) => {
    feature.checked = false;
  });

  map.closePopup();

  const newLatLng = new L.LatLng(TOKYO_CENTER_LAT, TOKYO_CENTER_LNG);
  mainPinMarker.setLatLng(newLatLng);
};

resetButton.addEventListener('click', () => {
  setInitialState();
});

const showSuccessMessage = () => {
  const success = successMessage.cloneNode(true);
  document.body.appendChild(success);

  setTimeout(() => {
    success.remove();
  }, MESSAGE_SHOW_TIME);
};

const showErrorMessage = () => {
  const error = errorMessage.cloneNode(true);
  const errorCloseButton = error.querySelector('.error__button');

  document.body.appendChild(error);

  errorCloseButton.addEventListener('click', () => {
    error.remove();
  });

  setTimeout(() => {
    error.remove();
  }, MESSAGE_SHOW_TIME);
};

const addFormSubmitListener = () => {

  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    const isValidImage = pristineImage.validate();

    if (isValid && isValidImage) {
      sendAd(
        () => {
          showSuccessMessage();
          setInitialState();
          disableSubmitButton();
        },
        () => {
          showErrorMessage();
        },
        new FormData(evt.target),
      );

      typeHousing.removeEventListener('change', onTypeHousingChange);
      roomNumber.removeEventListener('change', addRoomsEvent);
      capacity.removeEventListener('change', addCapacityEvent);
      timeIn.removeEventListener('change', addTimeInEvent);
      timeOut.removeEventListener('change', addTimeOutEvent);
    }

    pristine.validate();
    pristineImage.validate();
  });
};

export {addFormSubmitListener, deactivateForm, activateForm};
