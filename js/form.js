import {sendAd} from './api.js';
import {setNewFilters} from './filter.js';
import {map, markerGroup, mainPinMarker, InitialCoord} from './map.js';

const TITLE_ERROR_MESSAGE = 'От 30 до 100 символов';
const MAX_PRICE = 100000;
const MESSAGE_SHOW_TIME = 5000;
const ADS_FILTER_DEFAULT = 'any';
const SLIDER_PRICE_STEP = 100;

const adForm = document.querySelector('.ad-form');
const formFieldsets = adForm.querySelectorAll('fieldset');

const typeHousing = adForm.querySelector('#type');
const price = adForm.querySelector('#price');

const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');

const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

const formFeatures = adForm.querySelectorAll('.features__checkbox');
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
const mapFiltersHousingRoomsCount = mapFilter.querySelector('#housing-rooms');
const mapFiltersHousingGuestsCount = mapFilter.querySelector('#housing-guests');
const mapFiltersFeatures = mapFilter.querySelectorAll('.map__checkbox');

const mapFiltersContainer = document.querySelector('.map__filters');
const mapFiltersSelects = mapFiltersContainer.querySelectorAll('select');

const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');

const TitleLength = {
  MIN: 30,
  MAX: 100
};

const mapTypeToPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

const RoomsCapacity = {
  MIN: '1',
  MAX: '100'
};

const mapRoomsToGuestsCount = {
  1: ['1'],
  2: ['2', '1'],
  3: ['3', '2', '1'],
  100: ['0']
};

const SubmitButtonState = {
  ACTIVE: 'Публикация...',
  INACTIVE: 'Опубликовать'
};

const formDefaultState = {
  typeHousing: 'flat',
  time: '12:00',
  guests: '1',
  capacity: '1',
  price: 1000
};

noUiSlider.create(sliderElement, {
  range: {
    min: mapTypeToPrice[typeHousing.value],
    max: MAX_PRICE
  },
  start: mapTypeToPrice[typeHousing.value],
  step: SLIDER_PRICE_STEP,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value),
  },
});

sliderElement.noUiSlider.on('update', () => {
  price.value = sliderElement.noUiSlider.get();
});

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

const validatePrice = () => price.value >= mapTypeToPrice[typeHousing.value] && price.value <= MAX_PRICE;

const getPriceErrorMessage = () => `Минимальное значение: ${mapTypeToPrice[typeHousing.value]}, Максимальное значение: ${MAX_PRICE}`;

const validateRoomsCount = () => mapRoomsToGuestsCount[roomNumber.value].includes(capacity.value);

const getRoomsAmount = () => roomNumber.value === '100' ? `${roomNumber.value} комнат` : `${roomNumber.value} комнаты`;

const getRoomsErrorMessage = () => `
  ${roomNumber.value === RoomsCapacity.MIN ? `${roomNumber.value} комната` : getRoomsAmount()}
  ${roomNumber.value === RoomsCapacity.MAX ? 'не для гостей' : `не для ${capacity.value} гостей`}
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
  validateRoomsCount,
  getRoomsErrorMessage
);

pristine.addValidator(
  adForm.querySelector('#capacity'),
  validateRoomsCount,
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

  formAddress.value = `${InitialCoord.LAT}, ${InitialCoord.LNG}`;

  mapFiltersSelects.forEach((mapFilterSelect) => {
    mapFilterSelect.disabled = false;
  });

  formFieldsets.forEach((formFieldset) => {
    formFieldset.disabled = false;
  });
};

const onTypeHousingChange = () => {
  price.placeholder = mapTypeToPrice[typeHousing.value];

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: mapTypeToPrice[typeHousing.value],
      max: MAX_PRICE
    },
    start: mapTypeToPrice[typeHousing.value]
  });

  pristine.validate(price);
};

typeHousing.addEventListener('change', onTypeHousingChange);

const onRoomsCountChange = () => {
  pristine.validate(roomNumber);
  pristine.validate(capacity);
};

roomNumber.addEventListener('change', onRoomsCountChange);

const onCapacityCountChange = () => {
  pristine.validate(capacity);
  pristine.validate(roomNumber);
};

capacity.addEventListener('change', onCapacityCountChange);

const onTimeInChange = () => {
  timeOut.value = timeIn.value;
};

timeIn.addEventListener('change', onTimeInChange);

const onTimeOutChange = () => {
  timeIn.value = timeOut.value;
};

timeOut.addEventListener('change', onTimeOutChange);

const disableSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonState.ACTIVE;

  setTimeout(() => {
    submitButton.disabled = false;
    submitButton.textContent = SubmitButtonState.INACTIVE;
  }, MESSAGE_SHOW_TIME);
};

const setInitialState  = () => {
  formFeatures.forEach((feature) => {
    feature.checked = false;
  });

  formDescription.value = '';
  formAddress.value = '';
  formTitle.value = '';

  formAddress.value = `${InitialCoord.LAT}, ${InitialCoord.LNG}`;

  typeHousing.value = formDefaultState.typeHousing;
  price.value = formDefaultState.price;

  timeIn.value = formDefaultState.time;
  timeOut.value = formDefaultState.time;

  roomNumber.value = formDefaultState.guests;
  capacity.value = formDefaultState.capacity;

  mapFiltersHousingType.value = ADS_FILTER_DEFAULT;
  mapFiltersHousingPrice.value = ADS_FILTER_DEFAULT;
  mapFiltersHousingRoomsCount.value = ADS_FILTER_DEFAULT;
  mapFiltersHousingGuestsCount.value = ADS_FILTER_DEFAULT;

  mapFiltersFeatures.forEach((feature) => {
    feature.checked = false;
  });

  map.closePopup();

  const newLatLng = new L.LatLng(InitialCoord.LAT, InitialCoord.LNG);
  mainPinMarker.setLatLng(newLatLng);
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  setInitialState();
});

const setFilterChange = (cb) => {
  mapFilter.addEventListener('change', () => {
    setNewFilters();
    map.closePopup();
    markerGroup.clearLayers();
    cb();
  });
};

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
      roomNumber.removeEventListener('change', onRoomsCountChange);
      capacity.removeEventListener('change', onCapacityCountChange);
      timeIn.removeEventListener('change', onTimeInChange);
      timeOut.removeEventListener('change', onTimeOutChange);
    }

    pristine.validate();
    pristineImage.validate();
  });
};

export {addFormSubmitListener, deactivateForm, activateForm, setFilterChange};
