const adForm = document.querySelector('.ad-form');
const formFieldsets = adForm.querySelectorAll('fieldset');

const typeHousing = adForm.querySelector('#type');
const price = adForm.querySelector('#price');

const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');

const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

const TITLE_ERROR_MESSAGE = 'От 30 до 100 символов';
const PRICE_MAX = 100000;

const mapContentLength = {
  titleMin: 30,
  titleMax: 100
};

const mapPriceToType = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

const mapRoomsToGuests = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0']
};

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

function validateTitle (value) {
  return value.length >= mapContentLength.titleMin && value.length <= mapContentLength.titleMax;
}

function getPriceByType () {
  return mapPriceToType[typeHousing.value];
}

function validatePrice (element) {
  return element.value >= getPriceByType() && element.value <= PRICE_MAX;
}

function getPriceErrorMessage () {
  return `Минимальное значение: ${getPriceByType()}, Максимальное значение: ${PRICE_MAX}`;
}

function validateRooms () {
  return mapRoomsToGuests[roomNumber.value].includes(capacity.value);
}

const getRoomsAmount = () => roomNumber.value === '100' ? `${roomNumber.value} комнат` : `${roomNumber.value} комнаты`;

function getRoomsErrorMessage () {
  return `
  ${roomNumber.value === '1' ? `${roomNumber.value} комната` : getRoomsAmount()}
  ${roomNumber.value === '100' ? 'не для гостей' : `не для ${capacity.value} гостей`}
  `;
}

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

  const priceEvent = typeHousing.addEventListener('change', () => {
    price.placeholder = mapPriceToType[typeHousing.value];
    pristine.validate(price);
  });

  const roomsEvent = roomNumber.addEventListener('change', () => {
    pristine.validate(roomNumber);
    pristine.validate(capacity);
  });

  const capacityEvent = capacity.addEventListener('change', () => {
    pristine.validate(capacity);
    pristine.validate(roomNumber);
  });

  const timeInEvent = timeIn.addEventListener('change', () => {
    timeOut.value = timeIn.value;
  });

  const timeOutEvent = timeOut.addEventListener('change', () => {
    timeIn.value = timeOut.value;
  });

  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      typeHousing.removeEventListener(priceEvent);
      roomNumber.removeEventListener(roomsEvent);
      capacity.removeEventListener(capacityEvent);
      timeIn.removeEventListener(timeInEvent);
      timeOut.removeEventListener(timeOutEvent);
    }

    pristine.validate();
  });
};

export {deactivateForm, activateForm};
