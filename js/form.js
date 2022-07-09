const TITLE_ERROR_MESSAGE = 'От 30 до 100 символов';
const MAX_PRICE = 100000;

const adForm = document.querySelector('.ad-form');
const formFieldsets = adForm.querySelectorAll('fieldset');

const typeHousing = adForm.querySelector('#type');
const price = adForm.querySelector('#price');

const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');

const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

const sliderElement = adForm.querySelector('.ad-form__slider');

const titleLength = {
  Min: 30,
  Max: 100
};

const mapPriceToType = {
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
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0']
};

noUiSlider.create(sliderElement, {
  range: {
    min: mapPriceToType[typeHousing.value],
    max: MAX_PRICE
  },
  start: mapPriceToType[typeHousing.value],
  step: 100,
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

function validateTitle (value) {
  return value.length >= titleLength.Min && value.length <= titleLength.Max;
}

function validatePrice () {
  return price.value >= mapPriceToType[typeHousing.value] && price.value <= MAX_PRICE;
}

function getPriceErrorMessage () {
  return `Минимальное значение: ${mapPriceToType[typeHousing.value]}, Максимальное значение: ${MAX_PRICE}`;
}

function validateRooms () {
  return mapRoomsToGuestsCount[roomNumber.value].includes(capacity.value);
}

const getRoomsAmount = () => roomNumber.value === '100' ? `${roomNumber.value} комнат` : `${roomNumber.value} комнаты`;

function getRoomsErrorMessage () {
  return `
  ${roomNumber.value === roomsCapacity.min ? `${roomNumber.value} комната` : getRoomsAmount()}
  ${roomNumber.value === roomsCapacity.max ? 'не для гостей' : `не для ${capacity.value} гостей`}
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

  const typeHousingEvent = () => {
    price.placeholder = mapPriceToType[typeHousing.value];

    sliderElement.noUiSlider.updateOptions({
      range: {
        min: mapPriceToType[typeHousing.value],
        max: MAX_PRICE
      },
      start: mapPriceToType[typeHousing.value]
    });

    pristine.validate(price);
  };

  typeHousing.addEventListener('change', typeHousingEvent);

  const roomsEvent = () => {
    pristine.validate(roomNumber);
    pristine.validate(capacity);
  };

  roomNumber.addEventListener('change', roomsEvent);

  const capacityEvent = () => {
    pristine.validate(capacity);
    pristine.validate(roomNumber);
  };

  capacity.addEventListener('change', capacityEvent);

  const timeInEvent = () => {
    timeOut.value = timeIn.value;
  };

  timeIn.addEventListener('change', timeInEvent);

  const timeOutEvent = () => {
    timeIn.value = timeOut.value;
  };

  timeOut.addEventListener('change', timeOutEvent);

  adForm.addEventListener('submit', (evt) => {

    const isValid = pristine.validate();

    if (isValid) {
      typeHousing.removeEventListener('change', typeHousingEvent);
      roomNumber.removeEventListener('change', roomsEvent);
      capacity.removeEventListener('change', capacityEvent);
      timeIn.removeEventListener('change', timeInEvent);
      timeOut.removeEventListener('change', timeOutEvent);
    } else {
      evt.preventDefault();
    }

    pristine.validate();
    pristineImage.validate();
  });
};

export {deactivateForm, activateForm};
